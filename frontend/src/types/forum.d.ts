type TForumStatus = 'active' | 'archived' | 'deleted'

interface IForum {
  accommodation_id: string // the id of the accommodation where it belongs
  is_public: boolean // whether the forum is available for public (unregistered) users or not
  status: TForumStatus // the status of the forum, by default it is active
  content: string[] // the array of forum content/comments
}

interface IForumState {
  forums: IForum[] // this changes when current_accommodation changes
  current_accommodation?: string // loads the forums of the current_accommodation, undefined means no accommodation has been selected
  dispatch: React.Dispatch<IReducerAction<TForumActionType, TForumPayload>> // the dispatch function to manipulate forum state
}

type TForumActionType = 'FR_INIT' // TODO: add more actions
type TForumPayload = IForum[] // TODO: add more payload types
