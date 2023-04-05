import React from 'react'
import { apiGet, apiPost } from '../../api'

interface IProps {
  children?: React.ReactNode
}

const SamplePage: React.FC<IProps> = () => {
  const [ping, setPing] = React.useState<IResponse<string> | null>(null)

  const doPing = async () => {
    const res = await apiGet<string>('ping')
    return res
  }

  const handleClick = async () => {
    const res = await apiPost<{ data: string }, string>('ping', {
      payload: { data: 'hello frm frontend' },
    })
    setPing(res)
  }

  React.useEffect(() => {
    doPing().then(data => {
      setPing(data)
    })
  }, [])

  return (
    <div data-testid="SamplePage">
      {JSON.stringify(ping && ping.data)}
      <button onClick={() => handleClick()}>click me</button>
    </div>
  )
}

export default SamplePage
