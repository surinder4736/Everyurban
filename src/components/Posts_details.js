import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ShowPost from './showpostchild/showpost'
import {
  getOnePost,
  updateLike,
  updateComment,
  getAllCommentsByPostId,
  deleteComment,
} from '../api/index'

export class Posts_details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: [],
      postid:
        this.props.location.aboutprops !== undefined
          ? this.props.location.aboutprops.id
          : '',
      comment: '',
      username: '',
      commentalert: '',
      usernamealert: '',
      allcomments: '',
      commentRef: React.createRef(),
    }
    this.updateLikes = this.updateLikes.bind(this)
    this.updateComments = this.updateComments.bind(this)
  }

  async componentDidMount() {
    const postsdetails = await getOnePost(this.state.postid)
    const allcomment = await getAllCommentsByPostId(this.state.postid)
    this.setState({
      post: postsdetails.data.res[0],
      allcomments: allcomment.data,
    })
  }

  async updateLikes() {
    const postsdetails = await updateLike(this.state.postid)
    if (postsdetails.data.affectedRows === 1) {
      this.state.post.countlike = this.state.post.countlike + 1
    }
    this.setState({
      post: this.state.post,
    })
  }

  async deleteCommentById(commentid) {
    const result = await deleteComment(commentid)
    if (result.data.affectedRows === 1) {
      this.state.post.countlike = this.state.post.countlike - 1
    }
    this.setState({
      post: this.state.post,
    })
  }

  async updateComments() {
    let commentdetails = {
      id: this.state.postid,
      comment: this.state.comment,
      name: this.state.username,
    }
    if (this.state.comment.length > 0 && this.state.username.length > 0) {
      const postsdetails = await updateComment(commentdetails)
      const allcomment = await getAllCommentsByPostId(this.state.postid)
      if (postsdetails.data.commentinsert === 'true') {
        this.state.post.countcomment = this.state.post.countcomment + 1
        this.setState({
          comment: '',
          username: '',
          commentalert: '',
          usernamealert: '',
          allcomments: allcomment.data,
        })
      }
    } else {
      this.setState({
        commentalert:
          this.state.comment.length === 0
            ? 'Comment box should be filled'
            : this.state.username.length >= 1000
              ? 'Comment length should be less then 1000'
              : '',
        usernamealert:
          this.state.username.length < 1
            ? 'Name is required...'
            : this.state.username.length >= 70
              ? 'Name length should be less then 70'
              : '',
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    console.log(this.props);
    return
    // return this.state.postid !== '' ? (
    //   <ShowPost
    //     props={this.state}
    //     updateComments={this.updateComments}
    //     updateLike={this.updateLikes}
    //     deleteCommentById={this.deleteCommentById}
    //     commentRef={this.commentRef}
    //     changeHandler={this.changeHandler}
    //   />
    // ) : (
    //     <div>
    //       <Redirect to="./projects" />
    //     </div>
    //   )
  }
}
export default Posts_details
