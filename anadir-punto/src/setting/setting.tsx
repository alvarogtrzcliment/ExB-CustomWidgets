import { React } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<unknown>) => {
  console.log('props1', props)

  function saveMap (useMapWidgetIds: string[]) {
    console.log('useMapWidgetId', useMapWidgetIds)

    props.onSettingChange({
      id: props.id, // Ponemos esto porque sino peta
      useMapWidgetIds: useMapWidgetIds
    })

    console.log('props2', props)
  }

  return (
    <div>
      <h1>Selecciona el Mapa</h1>
      <MapWidgetSelector useMapWidgetIds={props.useMapWidgetIds} onSelect={saveMap}/>

    </div>
  )
}

export default Setting
