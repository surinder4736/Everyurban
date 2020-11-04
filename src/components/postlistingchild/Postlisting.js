import React from 'react'
import { getAllPosts, getPostByMinMax, searchPost } from '../../api/index'
import PostList from './PostList'
import './postlist.css'
import Grid from '@material-ui/core/Grid'
import PaginationControlled from './Pagination'
import PostSearching from './PostSearching'
import rightarrow from '../../Images/rightarrow.png'
import { Link } from 'react-router-dom'
import blogAction from '../../actions/blog';
import { connect } from 'react-redux';
import PropTypes, { array } from 'prop-types';
class Postlisting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postid: '',
      totalNumberOfPost: 0,
      postPerPage: '',
      actualPostPerPage: 5, // To Increase Number of Post per Page Change This Line
      visible: 5,
      
    }
        this.loadMore = this.loadMore.bind(this);
        this.signUp = this.signUp.bind(this);

  }

  componentDidMount() {
    this.initialStage()

  }
  getPageNumber = async (pageNumber) => {
    pageNumber = pageNumber - 1
    let { postPerPage } = this.state
    let startingPost = postPerPage * pageNumber
    // const posts = await getPostByMinMax(startingPost, postPerPage)
    const posts = 20
    console.log(posts);
    this.setState({
      posts: posts.rows,
    })
  }

  searchContent = async (event) => {
    const searchText = event.target.value
    if (searchText !== '') {
      const posts = await searchPost(searchText)
      this.setState({
        posts: posts.data.res,
        postPerPage: posts.data.res.length,
        totalNumberOfPost: posts.data.res.length,
      })
    } else {
      await this.initialStage()
    }
  }
  initialStage = async () => {

    const { dispatch } = this.props;
    dispatch(blogAction.getBlogList());
    // const posts = await getPostByMinMax(startingPost, postPerPage)
    const posts = this.props;
    console.log('welcoem to hoem blog');
    const totalNumberOfPost = 10
    // this.setState({
    //   posts: posts.BlogList.user
    // })
  }
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 5};
    });
  }
  signUp() {
     localStorage.setItem('redriaction_session_url', "projects");
    localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
     window.location.href = `/signup`;

  }
  
  render() {
    console.log('welcoem to amks doftdhjcbcfd');
    const { user, BlogList } = this.props;
    // const numberofPage = Math.ceil(
    //   this.state.totalNumberOfPost / this.state.postPerPage,
    // )

    
    return (
      <div className="main">

        <Grid item xs={7} style={{ margin: 'auto' }}>
          {BlogList.user.length > 0
           
            ?  BlogList.user.slice(0,this.state.visible).map((post) => (
              <PostList props={post} key={post.seno} />
            ))
            : ''}


          <Grid item xs={12} style={{ textAlign: 'center' }} className={""}>
            {this.state.visible < BlogList.user.length &&
           <span className={'useful-link'} >
              <p className={'gradient learnmore useful-link'} style={{cursor: 'pointer'}} onClick={this.loadMore}>
                load more...
              </p>
            </span> }           
        </Grid>
         
          {/* <PaginationControlled
            maxpost={numberofPage}
            getPageNumber={this.getPageNumber}
          /> */}
        <Grid item xs={12} style={{ textAlign: 'center' }} className={""}>
           <span className={'useful-link'} ><br />
              {user==null && user==undefined && 
                <p className={'gradient learnmore useful-link'} style={{cursor: 'pointer',marginBottom: '60px'}} onClick={this.signUp}>
                Sign Up to Participate <img src={rightarrow} alt="" width="25px" />{' '}
                </p>
              }
            </span>           
          </Grid>
        </Grid>
        </div>
    )
  }
}
Postlisting.propTypes = {
  user: PropTypes.object.isRequired
};
function mapStateToProps(state) {

  return {
    user: state.users.user,
    profile: state.profile.profile,
    isLoading: state.profile.isLoading,
    BlogList: state.users.AdminUserList,
  };
}

export default connect(mapStateToProps)(Postlisting);