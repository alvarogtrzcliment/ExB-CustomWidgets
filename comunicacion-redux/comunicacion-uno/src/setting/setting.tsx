import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { React } from 'jimu-core'
import { MapWidgetSelector, SettingSection } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<any>) => {
  
  function selectHandler (evento) {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: evento
    })
  }

  return (

    <SettingSection title={'Selecciona un Mapa'}>
        <MapWidgetSelector useMapWidgetIds={props.useMapWidgetIds} onSelect={selectHandler}></MapWidgetSelector>
    </SettingSection>
  )
}

export default Setting
