import { Grid, Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import { retrieveAccommodations } from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { apiGet } from '../../services/api'
import { getToken } from '../../services/localStorage'

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
  endpoint: string
}

const AccommodationResults: React.FC<IProps> = ({ endpoint }) => {
  const location = useLocation()
  // const accommodations = retrieveAccommodations()
  const theme = useTheme()
  const token = getToken()

  const [accommodations, setAccommodations] = React.useState<IAccommodation[]>(
    []
  )

  const fetchAccommodations = async () => {
    if (!token) return
    const res = await apiGet<IAccommodation[]>(endpoint, token)
    if (res.success && res.data) {
      setAccommodations(res.data)
      return
    }
  }

  React.useEffect(() => {
    fetchAccommodations()
  }, [])

  if (!accommodations || accommodations.length === 0) {
    return (
      <Box
        sx={{
          mt: theme.spacing(30),
          textAlign: 'center',
          opacity: '75%',
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            mt: theme.spacing(15),
          },
        }}
      >
        <SearchOffIcon
          sx={{
            color: theme.palette.secondary.main,
            fontSize: theme.spacing(15),
          }}
        />
        <Typography variant="h6">No Results found</Typography>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Grid
        container
        rowGap={3}
        columnGap={3}
        sx={{
          transition: '0.3s all',
        }}
        alignItems="center"
        justifyContent="space-around"
      >
        {accommodations.map((accommodation, key: number) => (
          <Grid item key={key}>
            <AccommodationCard
              accommodation={accommodation}
              isPublicView={location.pathname === ROUTES.public}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
