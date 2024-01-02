import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { Button, NumericInput } from 'jimu-ui'
import { useState } from 'react'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import Graphic from 'esri/Graphic'
import './widget.css'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>()

  function activeViewChangeHandler (jmv: JimuMapView) {
    if (jmv) {
      setJimuMapView(jmv)
    }
  }

  function anadirPunto (coordenadaX, coordenadaY) {
    const punto = {
      type: 'point',
      longitude: coordenadaX,
      latitude: coordenadaY
    }

    const simbologiaPunto = {
      type: 'simple-marker',
      color: [255, 0, 255],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    }

    const puntoGrafico = new Graphic({
      geometry: punto,
      symbol: simbologiaPunto
    })

    const capaGrafica = new GraphicsLayer()
    capaGrafica.add(puntoGrafico)

    jimuMapView.view.map.add(capaGrafica)
  }

  function clickHandler () {
    const inputX = document.getElementById('coordenadaX') as HTMLCalciteInputElement
    const inputY = document.getElementById('coordenadaY') as HTMLCalciteInputElement

    const coordenadaX = inputX.value
    const coordenadaY = inputY.value

    anadirPunto(coordenadaX, coordenadaY)
  }

  return (
    <div className='widget'>
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds?.[0]}
          onActiveViewChange={activeViewChangeHandler}
        />
      )}

      <h1>Añade un punto al mapa</h1>
      <label htmlFor="coordenadaX">Introduce la longitud</label>
      <NumericInput id='coordenadaX' className='NumericInput'/>
      <label htmlFor="coordenadaY">Introduce la latitud</label>
      <NumericInput id='coordenadaY' className='NumericInput'/>
      <Button id='bottonAnadirCoordenadas' onClick={clickHandler}>Añadir la coordenada al mapa</Button>
    </div>
  )
}

export default Widget
