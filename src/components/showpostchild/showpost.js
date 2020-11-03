import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CommentsShow from './CommentsShow';
import MuiAlert from '@material-ui/lab/Alert';
import './showpost.css';

const useStyles = makeStyles((theme) => ({
  contai: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  containerdiv: {
    margin: 'auto',
  },
  paper: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
    width: '20ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const commentStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    commenttext: '',
  },
  paper: {
    margin: `${theme.spacing(1)}px`,
    padding: theme.spacing(0.5),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CSSGrid(props) {
  const classes = useStyles();
  const commentstyle = commentStyle();
  const post = props.props.post;
  const allcomments = props.props.allcomments;
  const commentalert = props.props.commentalert;
  const usernamealert = props.props.usernamealert;
  return post.imageurl !== undefined ? (
    <div className="maindiv">
      <Grid item xs={7} className={classes.containerdiv}>
        <Paper className={classes.paper}>
          <img
            style={{width: '100%'}}
            src={`http://localhost:8080/images/${post.imageurl}`}
            className="img-fluid"
            alt=""
          />
        </Paper>
        <Grid item xs={12}>
          <div className={'afterimagediv'}>
            <font className="title">{unescape(post.posttitle)}</font>
            <br />
            <font className="postDescription">
              {post.userid} &nbsp;/&nbsp; {post.postdate} &nbsp;/&nbsp;{' '}
              {post.countcomment} Comments
            </font>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div
            className={'postContent'}
            dangerouslySetInnerHTML={{__html: unescape(post.posttext)}}
          ></div>
        </Grid>

        <Grid item xs={12}>
          <div className={'commentsection'}>
            <b>({post.countcomment}) Comments</b>
            <hr />
          </div>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs>
            <div className={commentstyle.root}>
              {allcomments.length > 0
                ? allcomments.map((comment) => (
                    <CommentsShow
                      props={comment}
                      key={comment.timedate}
                      deleteCommentById={props.deleteCommentById}
                    />
                  ))
                : ''}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={'commentform'}>
              <font> Leave Comments..</font>
              <input
                type="text"
                placeholder="Your Name"
                className="form-control"
                name="username"
                value={props.props.username}
                onChange={props.changeHandler}
              />
              {usernamealert !== '' ? (
                <Alert severity="warning">{usernamealert}</Alert>
              ) : (
                ''
              )}
              <textarea
                placeholder="Comment"
                rows="5"
                className="form-control"
                name="comment"
                value={props.props.comment}
                onChange={props.changeHandler}
              ></textarea>

              {commentalert !== '' ? (
                <Alert severity="warning">{commentalert}</Alert>
              ) : (
                ''
              )}
              <button
                className="btn btn-primary"
                style={{alignSelf: 'flex-end'}}
                onClick={props.updateComments}
              >
                Send
              </button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    ''
  );
}
