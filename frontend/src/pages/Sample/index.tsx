import React from 'react'
import { useSample } from '../../store/sample'
import { apiGet } from '../../api'

interface IProps {
  children?: React.ReactNode
}

const SamplePage: React.FC<IProps> = () => {
  const { data, dispatch: sampleDispatch } = useSample()

  const [ping, setPing] = React.useState<IResponse<string> | null>(null)

  const doPing = async () => {
    const res = await apiGet<string>('http://localhost:5000/api/ping')
    return res
  }

  React.useEffect(() => {
    doPing().then(data => {
      setPing(data)
    })
  }, [])

  return (
    <div data-testid="SamplePage">
      {JSON.stringify(ping && ping.data)}
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
