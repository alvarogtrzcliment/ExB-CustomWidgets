import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useState } from 'react'
import { Scrollable } from 'jimu-ui'
import LayerModifiedCard from './components/layer-modified-card'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [layer, setLayer] = useState<JSX.Element[]>()

  function activeViewChangeHandler (jmv: JimuMapView) {
    if (jmv) {
      const capas: JSX.Element[] = []
      jmv.view.map.layers.items.forEach((capa: { portalItem: { modified: string }, title: string }) => {
        if (capa.portalItem) {
          capas.push(<LayerModifiedCard title={capa.title} modified={capa.portalItem.modified.toString()}></LayerModifiedCard>)
        }
      })

      setLayer(capas)
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={activeViewChangeHandler}
        />
      )}
      <Scrollable >{layer}</Scrollable>
    </div>
  )
}

export default Widget
