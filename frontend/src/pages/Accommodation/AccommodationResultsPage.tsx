import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import { Button, Grid, Input, Typography, Slider, InputAdornment } from '@mui/material'
import Header from '../../components/header'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import FilterAccommodations from '../../components/FilterAccommodations'
import AccommodationTile from '../../components/accommTile'
import PreviewAccommodations from './PreviewAccommodations'

interface IProps {
  children?: React.ReactNode
}

const AccomodationResultsPage: React.FC<IProps> = () => {
  const accommodationResults = retrieveAccommodationResults()
  const [showPreview, setShowPreview] = React.useState<boolean>(false)


  return (
    <Grid container sx={{ flexDirection: 'column' }}>
		<Grid item>
			<Header />
		</Grid>
		
		<Grid item>
    			<Grid container sx={{ 
        			p: 1,
        			m: 'auto',
        			maxWidth: '1350px',
        			justifyContent: 'center',
        			alignContent: 'center',
        			alignItems: 'center',
    			}}>

          		{/* filters */}
          		<Grid
            			item
            			xs={3}
            			sx={{
              				background: '#F0F0F0',
              				p: '15px',
              				borderRadius: '10px',
              				border: '1px grey solid',
              				height: '100%',
              				m: 'auto'
            				}}
          			>

            			<Typography>Filters</Typography>
				<FilterAccommodations />
            			<Button onClick={() => setShowPreview(true)}>Download</Button>
          		</Grid>

          		{/* results */}
          		<Grid item xs={9} sx={{
                		p: 2,
                		m: 'auto',
            			}}>
            

			{accommodationResults.map(accommodation => (
              			<AccommodationTile
                		key={accommodation._id}
                		accommodation={accommodation}
              			/>
            		))}
          		</Grid>

          		{showPreview && (
            			<PreviewAccommodations
              			show={showPreview}
              			onClose={() => setShowPreview(false)}
              			accommodations={accommodationResults}
            		/>)}
        	</Grid>
    	</Grid>
</Grid>
  )
}

export default AccomodationResultsPage
