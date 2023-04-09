import React from 'react'
import { accommodationContext } from '.'
import { apiPost } from '../../api'

const useAccommodation = () =>
  React.useContext<IAccommodationState>(accommodationContext)

/**
 * Use the createAccommodation function to create new accommodation.
 *
 * Sample usage:
 * In CreateAccommodationForm component, you can use this function to create new accommodation.
 *
 * const CreateAccommodationForm = (props) => {
 *
 *  const [fieldValues, setFieldValues] = React.useState<IAccommodation>({})
 *
 *  const handleCreate = () => {
 *    createAccommodation(fieldValues)
 *  }
 *
 *    return (
 *      <form>
 *        // some fields here
 *        <button onClick={handleCreate}>Submit</button>
 *      </form>
 *    );
 * }
 *
 * @param data The new accommodation data
 * @returns
 */
export const createAccommodation = async (data: IAccommodation) => {
  const res = await apiPost<IAccommodation, IAccommodation>('accommodation', {
    payload: data,
  })

  if (!res.success && res.messages) {
    throw new Error(res.messages[0])
  }

  if (res.data) {
    useAccommodation().dispatch({
      type: 'AC_CREATE',
      payload: res.data,
    })
  }
}

/**
 * Use the retrieveAccommodations function to retrieve all the accommodations.
 *
 * Sample usage:
 *
 * const AccommodationsList = (props) => {
 *
 *    const accommodations = retrieveAccommodations()
 *
 *    return (
 *        <div>
 *          {accommodations.map((accommodation, key: number) => (
 *            <Accommodation key={key} accommodation={accommodation} />
 *          ))}
 *        </div>
 *    )
 * }
 * @returns All the accommodations
 */
export const retrieveAccommodations = () => useAccommodation().accommodations

/**
 * Use the retrieveAccommodationById function to retrieve the details of an accommodation by its id.
 *
 * Sample usage:
 * const AccommodationDetailPage = (props) => {
 *
 *  const params = useParams()
 *  const accommodation = retrieveAccommodationById(params.id)
 *
 *  if(!accommodation) {
 *    return (
 *      // some error i guess
 *    )
 *  }
 *
 *  return (
 *    // some code here
 *  )
 *
 * }
 * @param id The id of an existing accommodation
 * @returns
 */
export const retrieveAccommodationById = (id: string) =>
  useAccommodation().accommodations.filter(el => el._id === id)[0]

/**
 * Same logic with createAccommodation.
 * @param data The updated values of accommodation
 * @returns
 */
export const updateAccommodation = (data: IAccommodation) =>
  useAccommodation().dispatch({
    type: 'AC_UPDATE',
    payload: data,
  })

/**
 * Same logic with retrieveAccommodationById
 * @param id The id of the accommodation to be deleted
 * @returns
 */
export const deleteAccommodation = (id: string) =>
  useAccommodation().dispatch({ type: 'AC_DELETE', payload: id })
