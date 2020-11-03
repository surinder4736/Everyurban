import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1 + ' !important',
    overflow: 'hidden !important',
    // padding: theme.spacing(0) + ' !important',
    padding: '0 1%',
    margin: '2% 0',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left !important',
  },
}))

export default function AutoGridNoWrap(props) {
  const classes = useStyles()
  const comments = props.props
  // console.log(comments);
  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs={1}>
          <img
            // src={require('../../img/download.jpeg')}
            className={'commentuserprofile'}
            alt="profile"
          />
        </Grid>
        <Grid item xs={11}>
          <div className="commenthead">
            <span className={'username'}>
              {unescape(comments.commentusername)}
            </span>
            <br />
            <span className={'time'}>{comments.timedate}</span>
            <br />

            <span className={'comments'}>{unescape(comments.commenttext)}</span>
            <br />
          </div>
        </Grid>
      </Grid>
      <hr />
    </div>
  )
}
