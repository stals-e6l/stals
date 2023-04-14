import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import location from "../../assets/Ellens1.jpg";
import check from "../../assets/Check Green.png"
import pin from "../../assets/Map pin - Green.png"
import { Button, Box, Container} from "@mui/material"
import './detail.css'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)

  return( <React.Fragment>


    <body>
      <div>
        <p>{JSON.stringify(accommodation)}</p>
        <img id="location" src={location} />
      </div>

      <div id="info">
        <div id="NamePrice">
          <p>{accommodation.name}</p>
          <p>Php {accommodation.price}</p>
        </div>
        {accommodation.type}

        <div id="boxes">
          <div className="box">
          </div>
          <div className="box">
          <img id="check" src={check} />
          </div>
          <div className="box">
            <div id="address"><img id="pin" src={pin}/>
            {accommodation.address}</div>
            <div></div>
          </div>
        </div>

        <div className="title"><div className='greenline'></div>Description</div>
        <div id="descriptiontext">{accommodation.description}</div>
        
        <div className="title"><div className='greenline'></div>Apartment and Room Details</div>
        <table id="detailsbox">
          <tr>
            <td>Room Size</td>
            <td>{accommodation.size_sqm} square meters</td>
          </tr>
          <tr>
            <td>Minimum Capacity</td>
            <td>{accommodation.min_pax}</td>
          </tr>
          <tr>
            <td>Maximum Capacity</td>
            <td>{accommodation.max_pax}</td>
          </tr>
          <tr>
            <td>Number of Rooms</td>
            <td>{accommodation.num_rooms} rooms</td>
          </tr>
          <tr>
            <td>Number of Beds</td>
            <td>{accommodation.num_beds} beds</td>
          </tr>         
          <tr>
            <td>Furnishing</td>
            <td>{accommodation.furnishing}</td>
          </tr>
        </table> 

      </div>
      
    </body>
  </React.Fragment>

  );
}

export default AccommodationDetailPage
    