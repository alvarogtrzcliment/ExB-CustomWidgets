import { FormattedMessage, React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import defaultMessages from './translations/default'

// Importamos el CSS
import './plantilla.css'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  return (
    <div className='plantilla'>
        <p>
          <FormattedMessage
          id="title1"
          defaultMessage={defaultMessages.title1}/>
        </p>
    </div>
  )
}

export default Widget
