import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import { filterAccommodations } from '../modules/accommodation/AccommodationsProvider'
import { useLocation } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const ResultPage: React.FC<IProps> = () => {
  // hook
  const onFilterAccommodations = filterAccommodations()
  const location = useLocation()

  // state
  const [loaded, setLoaded] = React.useState<boolean>(false)

  // upon landing
  React.useEffect(() => {
    if (onFilterAccommodations && !loaded) {
      onFilterAccommodations(location.search).finally(() => setLoaded(true))
    }
  }, [onFilterAccommodations])

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Navbar />
    </Box>
  )
}

export default ResultPage
