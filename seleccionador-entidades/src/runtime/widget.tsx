import { React, type IMDataSourceInfo, type DataSource, DataSourceStatus, type AllWidgetProps, DataSourceComponent, type FeatureLayerQueryParams } from 'jimu-core'
import { Button, ScrollList } from 'jimu-ui'
import './widget.css'

export default function Widget (props: AllWidgetProps<unknown>) {
  // La función is DsConfigured mira en primer lugar si tenemos algún tipo de data source.

  const configuracionDataSource = () => {
    // Si dentro de las props existe la propiedad useDataSources y su longitud es 1 entonces me devuelves un booleano positivo sino negativo
    if (props.useDataSources && props.useDataSources.length === 1) {
      return true
    }
    return false
  }

  // Esto es lo que nos devuelve la lista de registros es una función que recibe el Data Source

  const dataRender = (dataSource: DataSource, info: IMDataSourceInfo) => {
    if (dataSource && dataSource.getStatus() === DataSourceStatus.Loaded) {
      const botones = dataSource.getRecords().map((dataRecord, index) => { return <Button key={index} type='tertiary' className='ListaBoton' onClick={() => { dataSource.selectRecordById(dataRecord.getId()) }}> {dataRecord.getFieldValue('RECTUR')} </Button> })
      return <div className='Lista'>
        <ScrollList autoArrow duration={300} items={botones} useWhell vertical></ScrollList>
      </div>
    }
  }

  if (!configuracionDataSource()) {
    return <div className="widget">
      <h3>
        Por favor selecciona la fuente en el panel de configuración
      </h3>
    </div>
  }
  return <div className='widget'>
    <h3>
      Selecciona algún elemento de la lista
    </h3>

    {/* Dentro de este componente DataSourceComponent tenemos 2 atributos, el widget ID que lo saca de las props, y luego el primer lugar del array de useDataSources */}

    <DataSourceComponent useDataSource={props.useDataSources[0]} query={{ where: '1=1' } as FeatureLayerQueryParams} widgetId={props.id}>
      {dataRender}
    </DataSourceComponent>
  </div>
}
