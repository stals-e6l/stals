type TForumStatus = 'active' | 'archived' | 'deleted'

interface IForum {
  accommodation_id: string // the id of the accommodation where it belongs
  is_public: boolean // whether the forum is available for public (unregistered) users or not
  status: TForumStatus // the status of the forum, by default it is active
  content: string[] // the array of forum content/comments
}

interface IForumState {
  // TODO:
  test: any
}
