import { React } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<unknown>) => {
  function saveMap (useMapWidgetIds: string[]) {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  return (
    <SettingSection>
      <SettingRow flow='wrap' label={'Selecciona el Mapa'}>
        <MapWidgetSelector
        useMapWidgetIds={props.useMapWidgetIds}
        onSelect={saveMap}
        />
      </SettingRow>
    </SettingSection>
  )
}

export default Setting
