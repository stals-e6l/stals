import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import location from '../../assets/Ellens1.jpg'
import check from '../../assets/Check Green.png'
import pin from '../../assets/Map pin - Green.png'
import { Box, Typography } from '@mui/material'
import './detail.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)

  if (!accommodation) {
    return (
      <Box>
        <Typography>No accommodation found!</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <img id="location" src={location} />
      <div id="info">
        <div id="NamePrice">
          <p>{accommodation.name}</p>
          <p>Php {accommodation.price}</p>
        </div>
        {accommodation.type}

        <div id="boxes">
          <div className="box">
            <div id="rating">
              <span id="numerator">4.7</span>
              <span id="denominator">/5</span>
              <div id="reviewNumbers">
                <div>Placeholder</div>
                <div>
                  <a id="link" href="url">
                    1000+ reviews
                  </a>
                </div>
              </div>
            </div>
            <div id="review">
              <AccountCircleIcon id="userIcon" />
              <div id="userReview">
                <div id="username">Rodge Pogi De Luna</div>
                <div id="comment">It is a nice place. We enjoyed our stay.</div>
              </div>
            </div>
            <div className="boxLabel">Reviews</div>
          </div>

          <div className="box">
            {accommodation.amenities.map((value, index) => {
              return (
                <li key={index}>
                  <img id="check" src={check} />
                  {value}
                </li>
              )
            })}
            <div className="boxLabel">Facilities and Services</div>
          </div>

          <div className="box">
            <div id="address">
              <img id="pin" src={pin} />
              {accommodation.address}
            </div>
            <div id="distance">
              about &nbsp;
              <span id="highlight">
                {accommodation.meters_from_uplb} meters
              </span>
              &nbsp;from UPLB
            </div>
            <div className="boxLabel">Address</div>
          </div>
        </div>

        <div className="title">
          <div className="greenline"></div>Description
        </div>
        <div id="descriptiontext">{accommodation.description}</div>

        <div className="title">
          <div className="greenline"></div>Apartment and Room Details
        </div>
        <table className="shadedTable">
          <tr>
            <td className="firstCol">Room Size</td>
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

        <div className="title">
          <div className="greenline"></div>Facilities and Services
        </div>
        <table className="unshadedTable">
          <tr>
            <td className="firstCol">Amenities</td>
            <td>
              <ul>
                {accommodation.amenities.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Appliances</td>
            <td>
              <ul>
                {accommodation.appliances.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Safety and Security</td>
            <td>
              <ul>
                {accommodation.safety_and_security.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
        </table>

        <div className="title">
          <div className="greenline"></div>Landmark
        </div>
        <table className="shadedTable">
          <tr>
            <td className="firstCol">UPLB Gate</td>
            <td>{accommodation.meters_from_uplb} meters</td>
          </tr>
          <tr>
            <td>
              <ul>
                {accommodation.landmarks.map((value, index) => {
                  return <li key={index}>{value}</li>
                })}
              </ul>
            </td>
          </tr>
        </table>

        <div className="title">
          <div className="greenline"></div>Policies
        </div>
        <table className="unshadedTable">
          <tr>
            <td className="firstCol">Cooking Rules</td>
            <td>
              <ul>
                {accommodation.cooking_rules.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Pet Rules</td>
            <td>
              <ul>
                {accommodation.pet_rules.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Other Rules</td>
            <td>
              <ul>
                {accommodation.other_rules.map((value, index) => {
                  return (
                    <li key={index}>
                      <img id="check" src={check} />
                      {value}
                    </li>
                  )
                })}
              </ul>
            </td>
          </tr>
        </table>

        <div className="title" id="reviewTitle">
          <div className="greenline" id="largerGreenLine"></div>Reviews
        </div>
        <div id="reviewTable">
          <div id="ratingLarge">
            <span id="numeratorLarge">4.7</span>
            <span id="denominatorLarge">/5</span>
            <div id="reviewNumbersLarge">
              <div>Placeholder</div>
              <div>
                <a id="link" href="url">
                  1000+ reviews
                </a>
              </div>
            </div>
          </div>
          <button id="button">Add Review</button>
        </div>
        <div className="unshadedTable">
          <div className="fullReview">
            <div className="reviewUsername">Von Arellano</div>
            <div>Placeholder</div>
            <div>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </div>
          </div>

          <div className="fullReview">
            <div className="reviewUsername">Von Arellano</div>
            <div>Placeholder</div>
            <div>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </div>
          </div>

          <div className="fullReview">
            <div className="reviewUsername">Von Arellano</div>
            <div>Placeholder</div>
            <div>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default AccommodationDetailPage
