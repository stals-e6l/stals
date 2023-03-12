import React from 'react'
import { useSample } from '../../store/sample'

interface IProps {
  children?: React.ReactNode
}

const SamplePage: React.FC<IProps> = () => {
  const { data, dispatch: sampleDispatch } = useSample()

  return (
    <div>
      {JSON.stringify(data)}
      <button
        onClick={() =>
          sampleDispatch({
            type: data.sample ? 'changeFalse' : 'changeTrue',
            payload: { ...data, sample: !data.sample },
          })
        }
      >
        click me
      </button>
    </div>
  )
}

export default SamplePage
