import React from 'react'
import { accommodationContext } from '.'
import { apiDelete, apiPost, apiPut } from '../../api'
import { createForum, useForum } from '../forum/actions'

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
 *  const createAccommodationHandler = createAccommodation()
 *
 *  const handleCreate = () => {
 *    createAccommodationHandler(fieldValues)
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
 */
export const createAccommodation = () => {
  const { dispatch } = useAccommodation()
  const { dispatch: dispatchForum } = useForum()

  const createAccommodationHandler = async (data: IAccommodation) => {
    const res = await apiPost<IAccommodation, IAccommodation>('accommodation', {
      payload: data,
    })
    if (!res.success && res.messages) {
      throw new Error(res.messages[0])
    }
    const createForumHandler = createForum()
    if (res.data) {
      createForumHandler({
        accommodation_id: res.data._id as string,
        content: [],
        is_public: true,
        status: 'active',
      }).then(forum => {
        dispatch({
          type: 'AC_CREATE',
          payload: res.data as IAccommodation,
        })
        dispatchForum({
          type: 'FR_ADD',
          payload: forum,
        })
      })
    }
  }

  return createAccommodationHandler
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
export const retrieveAccommodations = (): IAccommodation[] => {
  const { accommodations } = useAccommodation()

  return accommodations
}

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
export const retrieveAccommodationById = (
  id: string
): IAccommodation | null => {
  const accommodations = retrieveAccommodations()

  const accommodation = accommodations.filter(val => val._id === id)

  if (!accommodation) return null
  return accommodation[0]
}

/**
 * Same logic with createAccommodation.
 * @param data The updated values of accommodation
 * @returns
 */
export const updateAccommodation = () => {
  const { dispatch } = useAccommodation()

  const updateAccommodationHandler = async (data: IAccommodation) => {
    const res = await apiPut<IAccommodation, IAccommodation>(
      `accommodation/${data._id}`,
      { payload: data }
    )

    if (!res.data || !res.success) {
      if (res.messages) {
        throw new Error(res.messages[0])
      }
    }

    if (res.data && res.success) {
      dispatch({ type: 'AC_UPDATE', payload: res.data })
    }
  }

  return updateAccommodationHandler
}

/**
 * Same logic with retrieveAccommodationById
 * @param id The id of the accommodation to be deleted
 * @returns
 */
export const deleteAccommodation = () => {
  const { dispatch } = useAccommodation()

  const deleteAccommodationHandler = async (id: string) => {
    const res = await apiDelete(`accommodation/${id}`)

    if (!res.success && res.messages) {
      throw new Error(res.messages[0])
    }

    dispatch({ type: 'AC_DELETE', payload: id })
  }

  return deleteAccommodationHandler
}
