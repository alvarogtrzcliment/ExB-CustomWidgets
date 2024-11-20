/** @jsx jsx */

import { type AllWidgetProps, css, jsx } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { type IMConfig } from '../config'
import { Select, Alert, Option } from 'jimu-ui'

import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer'
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'
import RasterStretchRenderer from '@arcgis/core/renderers/RasterStretchRenderer'
import TimeSlider from '@arcgis/core/widgets/TimeSlider'

// https://tiledimageservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/hrrr_soil_20151023/ImageServer

const widgetStyle = css`
  background-color: rgb(243, 243, 243);
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
  width: fit-content;
`

const imageRenderer = new RasterStretchRenderer({
  colorRamp: {
    type: 'algorithmic',
    fromColor: [120, 0, 0, 0.8],
    toColor: [102, 155, 188, 0.8]
  },
  stretchType: 'min-max'
})

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [activeView, setActiveView] = useState<JimuMapView>()
  const [multiDimensionalInformation, setMultidimensionalInformation] =
    useState<[]>()
  const [isServiceCached, setIsServiceCached] = useState<boolean>()

  const activeViewHandler = (JimuMapView: JimuMapView) => {
    setActiveView(() => JimuMapView)
  }

  // ArcGIS REST API Call for the Multidimensional Information of the service

  const fetchMultidimensionalInfo = useCallback(() => {
    fetch(
      `${props.config.serviceUrl}/multiDimensionalInfo?returnDimensionValues=always&f=pjson`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setMultidimensionalInformation(
          () => data.multidimensionalInfo.variables
        )
      })
  }, [props.config.serviceUrl])

  // ArcGIS REST API Call for the information of the item and search if the service is Cached or not.

  const fetchISServiceCached = useCallback(() => {
    fetch(`${props.config.serviceUrl}?f=pjson`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.singleFusedMapCache) {
          setIsServiceCached(() => data.singleFusedMapCache)
        }
      })
  }, [props.config.serviceUrl])

  // Function that adds the ImageryLayer / ImageryTileLayer to the Map

  const addServiceToMap = useCallback(() => {
    if (activeView) {
      if (isServiceCached) {
        const netCDF = new ImageryTileLayer({
          url: props.config.serviceUrl,
          renderer: imageRenderer
        })

        activeView.view.map.add(netCDF)

        return netCDF
      } else {
        const netCDF = new ImageryLayer({
          url: props.config.serviceUrl,
          renderer: imageRenderer
        })

        activeView.view.map.add(netCDF)

        return netCDF
      }
    }
  }, [activeView, isServiceCached, props.config.serviceUrl])

  // Function that Adds the Time Widget to the View of the Map with the information of the multidimensional variable.

  const addTimeWidgetToView = useCallback(() => {
    if (activeView) {
      const epochDates = multiDimensionalInformation[0].dimensions[0].values
      const dates = epochDates.map((item) => new Date(item))

      const timeSlider = new TimeSlider({
        view: activeView.view,
        fullTimeExtent: {
          start: new Date(dates[0]),
          end: new Date(dates[dates.length - 1])
        }
      })
      activeView.view.ui.add(timeSlider, 'top-right')
      return timeSlider
    }
  }, [activeView, multiDimensionalInformation])

  useEffect(() => {
    if (props.config.serviceUrl && !multiDimensionalInformation) {
      fetchMultidimensionalInfo()
      fetchISServiceCached()
    }
    if (props.config.serviceUrl && multiDimensionalInformation && activeView) {
      const netCDF = addServiceToMap()
      const timeSlider = addTimeWidgetToView()
      return () => {
        activeView.view.ui.remove(timeSlider)
        activeView.view.map.remove(netCDF)
      }
    }
  }, [
    activeView,
    addServiceToMap,
    addTimeWidgetToView,
    fetchISServiceCached,
    fetchMultidimensionalInfo,
    multiDimensionalInformation,
    props.config.serviceUrl
  ])

  const handleVariableChange = (changeEvent) => {
    const variableSelected = changeEvent.target.value
    const map = activeView.view.map
    const variableStatistics = multiDimensionalInformation.find(
      (variable) => variable.name === variableSelected
    )
    const renderer = map.layers.items[0].renderer.clone()
    renderer.statistics = variableStatistics.statistics
    map.layers.items[0].renderer = renderer
    console.log(map)
  }

  return (
    <div css={widgetStyle}>
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds[0]}
          onActiveViewChange={activeViewHandler}
        ></JimuMapViewComponent>
      )}
      {props.config.serviceUrl && multiDimensionalInformation ? (
        <Select
          placeholder="Select the variable to show"
          onChange={handleVariableChange}
        >
          {multiDimensionalInformation &&
            multiDimensionalInformation.map(
              (variable: { name: string; description: string }) => {
                return (
                  <Option value={variable.name}>{variable.description}</Option>
                )
              }
            )}
        </Select>
      ) : (
        <Alert>Please configure the widget</Alert>
      )}
    </div>
  )
}

export default Widget
