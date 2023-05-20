import React from 'react'
import { deleteCommentFromForum } from '../../store/forum/actions'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, DialogActions, DialogTitle, Typography, Grid } from '@mui/material'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
}

const DeleteCommentFromForum: React.FC<IProps> = ({ forumId, comment }) => {
  // hook
  const deleteCommentFromForumHandler = deleteCommentFromForum()

  const [open, setOpen] = React.useState(false)

// original code
//    <Button
//      variant="contained"
//      onClick={() => {
//        // use this function delete comment in the forum
//        deleteCommentFromForumHandler(forumId, comment)
//      }}
//    >
//      Delete
//    </Button>

  return (
    <>
        <Button onClick={ () => {setOpen(true)} }>Delete</Button>
        <Dialog open={open} onClose={ () => {setOpen(false)} } fullWidth={true} maxWidth={'xs'}>
            <DialogTitle>
                <Grid sx={{ flexGrow: 1 }} container spacing={0}>

                </Grid>
            </DialogTitle>
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs sx={{}}>
                    <Typography sx={{ p: 1, textAlign: 'center' }}>Are you sure you want to delete your comment?</Typography>
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={ () => {setOpen(false)} }>Cancel</Button>
                <Button onClick={ () => {deleteCommentFromForumHandler(forumId, comment)}}>Delete</Button>
            </DialogActions>
        </Dialog> 
    </>
  )
}

export default DeleteCommentFromForum
