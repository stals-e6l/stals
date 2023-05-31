import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import AccommodationCard from './AccommodationCard'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import { apiGet } from '../../services/api'
import { getToken } from '../../services/localStorage'
import Title from './TitleComponent'

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
  endpoint?: string
  title?: string
}

const AccommodationResults: React.FC<IProps> = ({
  endpoint = 'public_accommodation?limit=6',
  title = 'Most viewed',
}) => {
  const location = useLocation()
  const theme = useTheme()
  const [accommodations, setAccommodations] = React.useState<IAccommodation[]>(
    []
  )

  const fetchAccommodations = async () => {
    const res = await apiGet<IAccommodation[]>(endpoint, getToken() as string)
    if (res.success && res.data) {
      setAccommodations(res.data)
    }
  }

  React.useEffect(() => {
    fetchAccommodations()
  }, [])

  if (!accommodations) {
    return (
      <div>
        <br />
        <br />
        <Typography variant="body1">No accommodations to show.</Typography>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Grid
        container
        rowGap={2}
        sx={{
          paddingLeft: '10%',
          paddingRight: '10%',
          [theme.breakpoints.down('md')]: {
            padding: '0% 4%',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0% 2%',
            paddingTop: '5%',
          },
        }}
      >
        <Grid item>
          <Title text={title} />
        </Grid>

        <Grid item>
          <Grid
            container
            rowGap={3}
            columnGap={3}
            sx={{
              justifyContent: 'center',
              transition: '0.3s all',
            }}
          >
            {accommodations.map((accommodation, key: number) => (
              <Grid item key={key} lg={3}>
                <AccommodationCard
                  accommodation={accommodation}
                  isPublicView={location.pathname === ROUTES.public}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
