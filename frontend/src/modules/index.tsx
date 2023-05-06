import React from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const ModulesViewer: React.FC<IProps> = () => {
  return (
    <div>
      safsf
      <Outlet />
    </div>
  )
}

export default ModulesViewer
