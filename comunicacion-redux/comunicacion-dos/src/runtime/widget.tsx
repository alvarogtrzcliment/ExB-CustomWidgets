import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'

// Importamos el CSS
import './widget.css'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  function mapaActivoHandler (jmv: JimuMapView) {
    if (jmv) {
      console.log('Mapa Cargado')
    }
  }

  function buttonHandler () {
    props.dispatch(
      {
        type: 'MY_ACTION_1',
        val: true
      }
    )
  }

  return (
    <div className='comunicacion-dos'>
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (

          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds[0]}
            onActiveViewChange={mapaActivoHandler}
          >
          </JimuMapViewComponent>
        )
      }
      <button onClick={buttonHandler}>Ejemplo de Comunicación</button>
    </div>
  )
}

export default Widget
