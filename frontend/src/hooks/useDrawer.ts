import useDialog from './useDialog'

const useDrawer = () => {
  const { open, toggleDialog } = useDialog()
  return {
    open,
    toggleDrawer: toggleDialog,
  }
}

export default useDrawer
