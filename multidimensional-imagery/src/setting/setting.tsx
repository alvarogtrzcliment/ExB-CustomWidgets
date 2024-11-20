import { type AllWidgetSettingProps } from 'jimu-for-builder'
import {
  MapWidgetSelector,
  SettingSection,
  SettingRow
} from 'jimu-ui/advanced/setting-components'
import { React } from 'jimu-core'
import { Button, UrlInput } from 'jimu-ui'
import { useState } from 'react'

const Setting = (props: AllWidgetSettingProps<any>) => {
  const [urlInputValue, setInputValue] = useState<string>()

  function selectMapHandler(resultadoEvento: string[]) {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: resultadoEvento
    })
  }

  function handleUrlInputValue(urlInputEvent: {
    valid: boolean
    value: string
  }) {
    if (urlInputEvent.valid) {
      setInputValue(() => urlInputEvent.value)
    }
  }

  function handleClickUrl(event) {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('serviceUrl', urlInputValue)
    })

    // event.target.disabled = true
  }

  return (
    <>
      <SettingSection title={'Selecciona un Mapa'}>
        <MapWidgetSelector
          useMapWidgetIds={props.useMapWidgetIds}
          onSelect={selectMapHandler}
        ></MapWidgetSelector>
      </SettingSection>
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <SettingSection title={'Servicio Multidimensional'}>
          <SettingRow>
            <UrlInput
              schemes={['https']}
              onAcceptValue={handleUrlInputValue}
              defaultValue={
                'https://tiledimageservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/hrrr_soil_20151023/ImageServer'
              }
            ></UrlInput>
          </SettingRow>
          <SettingRow>
            <Button
              block
              onClick={handleClickUrl}
            >
              Añadir Url
            </Button>
          </SettingRow>
        </SettingSection>
      )}
    </>
  )
}

export default Setting
