import { type IMState, React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'

// Importamos el CSS
import './widget.css'
import { useSelector } from 'react-redux'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const botonState = useSelector((state: IMState) => state.myState.a)
  console.log(botonState)
  function mapaActivoHandler (jmv: JimuMapView) {
    if (jmv) {
      console.log('Mapa Cargado')
    }
  }

  return (
    <div className='comunicacion'>
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (

          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds[0]}
            onActiveViewChange={mapaActivoHandler}
          >
          </JimuMapViewComponent>
        )
      }
      <p>Estado del Botón: {botonState}</p>
    </div>
  )
}

export default Widget
