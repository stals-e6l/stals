import { useTheme, Grid, Button, Typography } from '@mui/material'
import React from 'react'
import FilterAccommodations from '../modules/accommodation/FilterAccommodations'
import SearchAccommodations from '../modules/accommodation/SearchAccommodations'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import PrintIcon from '@mui/icons-material/Print'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { COLOR } from '../theme/index'
import Title from '../modules/accommodation/TitleComponent'
import DownloadAccommodations from '../modules/accommodation/DownloadAccommodations'
import { useLocation } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const ResultPage: React.FC<IProps> = () => {
  const theme = useTheme()

  const location = useLocation()

  const search = location.search

  return (
    <React.Fragment>
      {/*Print PDF Floating Action Button*/}
      <DownloadAccommodations />

      <Grid container>
        {/* Filters */}
        <Grid
          item
          xs={3}
          sx={{
            padding: theme.spacing(2),
            backgroundColor: COLOR.gray2,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <FilterAccommodations />
          <DownloadAccommodations />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid
            container
            direction="row"
            rowGap={2}
            sx={{
              padding: theme.spacing(3),
              [theme.breakpoints.down('md')]: {
                padding: '2% 4%',
              },
              [theme.breakpoints.down('sm')]: {
                padding: '2% 2%',
              },
            }}
          >
            {/* Search Bar */}
            <Grid item xs={12}>
              <SearchAccommodations />
            </Grid>

            <Grid item xs={12}>
              {/* Buttons when the screen is not a desktop */}
              <Grid direction="row" container>
                {/* Filter Button */}
                <Grid item>
                  <Button
                    variant="text"
                    sx={{
                      visibility: 'hidden',
                      [theme.breakpoints.down('md')]: {
                        visibility: 'visible',
                      },
                    }}
                  >
                    <FilterAltIcon
                      sx={{
                        color: COLOR.green,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: COLOR.textBlack,
                      }}
                    >
                      Filter
                    </Typography>
                  </Button>
                </Grid>

                {/* Print PDF Button */}
                <Grid item>
                  <Button
                    variant="text"
                    sx={{
                      visibility: 'hidden',
                      [theme.breakpoints.down('md')]: {
                        visibility: 'visible',
                      },
                    }}
                  >
                    <PrintIcon
                      sx={{
                        color: COLOR.green,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: COLOR.textBlack,
                      }}
                    >
                      Print PDF
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* | Search Results */}
            <Grid item xs={12}>
              <Title text="Search Results" />
            </Grid>

            {/* Accommodation Cards */}
            <Grid item xs={12}>
              <AccommodationResults
                isPublicView={false}
                endpoint={`accommodation${search}`}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="text">
                <Typography
                  variant="body1"
                  sx={{
                    color: COLOR.textBlack,
                    textDecoration: 'underline',
                  }}
                >
                  View All Results
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ResultPage
