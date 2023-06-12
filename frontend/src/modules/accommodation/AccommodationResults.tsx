import { Grid, Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import {
  appendAccommodations,
  getGlobalRefresh,
} from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { apiGet } from '../../services/api'
import { getToken } from '../../services/localStorage'
import { extractQueryString } from '../../utils/queryString'
import { getMe } from '../auth/AuthProvider'

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
  endpoint: string
  callback?: (data: IAccommodation[]) => void
}

const AccommodationResults: React.FC<IProps> = ({
  endpoint,
  callback,
  isPublicView,
}) => {
  const location = useLocation()
  const theme = useTheme()
  const token = getToken()
  const onAppendAccommodations = appendAccommodations()
  const globalRefresh = getGlobalRefresh()
  const user = getMe()

  const [accommodations, setAccommodations] = React.useState<IAccommodation[]>(
    []
  )

  const fetchAccommodations = async () => {
    // normalized endpoint here
    const qs = extractQueryString(location.search)

    console.log({ qs })

    const res = await apiGet<IAccommodation[]>(
      qs.search ? `accommodation?search=${qs.search}` : endpoint,
      isPublicView ? undefined : (token as string)
    )
    if (res.success && res.data && onAppendAccommodations) {
      const arr = res.data.filter(p => {
        if (
          (p.type === qs.type || !qs.type) &&
          (p.min_price === Number(qs.min_price) || !qs.min_price) &&
          (p.max_price === Number(qs.max_price) || !qs.max_price) &&
          (p.size_sqm === Number(qs.size_sqm) || !qs.size_sqm) &&
          (p.meters_from_uplb === Number(qs.meters_from_uplb) ||
            !qs.meters_from_uplb) &&
          (p.min_pax === Number(qs.min_pax) || !qs.min_pax) &&
          (p.max_pax === Number(qs.max_pax) || !qs.max_pax) &&
          (p.num_rooms === Number(qs.num_rooms) || !qs.num_rooms) &&
          (p.num_beds === Number(qs.num_beds) || !qs.num_beds) &&
          (p.furnishing === qs.furnishing || !qs.furnishing)
        )
          return true
        return false
      })
      setAccommodations(arr)

      onAppendAccommodations(arr)

      if (callback) callback(arr)

      return
    }
  }

  React.useEffect(() => {
    fetchAccommodations()
  }, [endpoint, globalRefresh])

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
              isPublicView={user! && user.role === 'tenant'}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
