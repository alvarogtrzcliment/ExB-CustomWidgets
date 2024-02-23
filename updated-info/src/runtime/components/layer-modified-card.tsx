import { React } from 'jimu-core'
import './layer-modified-card.css'

interface modifiedLayerProps {
  title: string
  modified: string
}

const LayerModifiedCard = (props: modifiedLayerProps) => {
  return (
    <div className='card'>
      <h3>{props.title}</h3>
      <p>{props.modified}</p>
    </div>
  )
}

export default LayerModifiedCard
