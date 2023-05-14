import React from 'react'

const useMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  return {
    anchorEl,
    onOpen: (e: { currentTarget: HTMLElement }) => setAnchorEl(e.currentTarget),
    onClose: () => setAnchorEl(null),
  }
}

export default useMenu
