import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const SampleProvider: React.FC<IProps> = ({ children }) => {
  const [sample, dispatch] = React.useReducer(sampleReducer, { sample: false })

  // sample: e.g. fetch
  React.useEffect(() => {
    dispatch({ type: 'changeTrue', payload: { sample: true } })
  }, [])

  return (
    <sampleContext.Provider
      value={{
        data: sample,
        dispatch,
      }}
    >
      {children}
    </sampleContext.Provider>
  )
}

export default SampleProvider

const sampleContext = React.createContext({})

export const useSample = () => {
  return React.useContext(sampleContext) as IContext<
    ISample,
    IReducerAction<TSampleAction, ISample>
  >
}

function sampleReducer(
  sample: ISample,
  action: IReducerAction<TSampleAction, ISample>
) {
  switch (action.type) {
    case 'changeTrue':
      return { ...sample, sample: true }
    default:
      return { ...sample, sample: false }
  }
}
