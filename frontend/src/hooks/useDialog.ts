import React from 'react'

const useDialog = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const toggleDialog = () => setOpen(prev => !prev)
  return { open, toggleDialog }
}

export default useDialog
