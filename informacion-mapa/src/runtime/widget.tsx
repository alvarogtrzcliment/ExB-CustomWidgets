import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import './widget.css'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useState } from 'react'

interface mapInfo {
  titulo: string
  description: string
  id: string
  tags: string[]
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [mapInfo, setMapInfo] = useState<mapInfo>()

  function viewChangeHandler (jmv: JimuMapView) {
    if (jmv) {
      const portalItem = jmv.view.map.portalItem
      console.log(portalItem)

      setMapInfo(
        {
          titulo: portalItem.title,
          description: portalItem.description,
          id: portalItem.id,
          tags: portalItem.tags
        }
      )
    }
  }

  return (
    <div>
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds[0]}
            onActiveViewChange={viewChangeHandler}></JimuMapViewComponent>
        )
      }
      <div className='informacionMapa'>
        {
          mapInfo
            ? (<div>
              <h3>{mapInfo.titulo}</h3>
              <p><strong>Descripción: </strong>{mapInfo.description}</p>
              <p><strong>Id: </strong>{mapInfo.id}</p>
              <p className='tagParagraph'><strong>Tags: </strong></p>
              <div className='tagDiv'>
                {mapInfo.tags.map(tag => {
                  return <div className='infoTag'>{tag}</div>
                })}

              </div>
            </div>)
            : <h3>Selecciona el mapa</h3>
        }

      </div>
    </div>
  )
}

export default Widget
