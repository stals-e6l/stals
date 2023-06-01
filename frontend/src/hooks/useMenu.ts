import React from 'react'

const useMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  return {
    anchorEl,
    onOpen: (e: { stopPropagation: any, currentTarget: HTMLElement }) => {setAnchorEl(e.currentTarget); e.stopPropagation()},
    onClose: () => setAnchorEl(null),
  }
}

export default useMenu
