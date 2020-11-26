import React from 'react'
import { getAllPosts, getPostByMinMax, searchPost } from '../../api/index'
import PostList from './PostList'
// import './postlist.css'
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
  
  initialStage = async () => {
    const { dispatch } = this.props;
    dispatch(blogAction.cleanBlogList());
    localStorage.setItem('redriaction_session_url', "");
    localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
    dispatch(blogAction.getBlogList());
  }
  
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 5};
    });
  }
  
  signUp() {
    localStorage.setItem('redriaction_session_url', "/projects");
    localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
    window.location.href = `/signup`;

  }
  
  render() {
    console.log('welcoem to amks doftdhjcbcfd');
    const { user, BlogList } = this.props;
    let userexit= user;
	  if(user!=null){
      if(Object.keys(user).length == 0){
        userexit= null
      }
	  }
    const newbloglist=BlogList!=null && BlogList!=undefined && BlogList.user!=undefined && BlogList.user.length > 0 ? BlogList.user.slice(0,this.state.visible):null;
    
    return (
      <div className="postlistingmain">
         {/* <Grid item xs={7} style={{ margin: 'auto' }}> 
         <span>Load more</span>
         </Grid> */}
         {newbloglist == null &&
          <div id="load" class="spinner-loader"> <div class="load-wrap"></div></div>
         }
        {newbloglist !=null && newbloglist.length> 0 ?  newbloglist.map((post) => (
          <PostList props={post} key={post.seno} />
        )): ''} 
        {BlogList!=null && BlogList!=undefined && BlogList.user!=undefined && 
          <Grid item xs={12} style={{ textAlign: 'center' }} >
            {this.state.visible < BlogList.user.length &&
            <span className={'useful-link'} >
              <p className={'gradient learnmore useful-link'} style={{cursor: 'pointer',fontSize :'16px'}} onClick={this.loadMore}>
                load more...
              </p>
            </span> }           
          </Grid>
        }
        
          
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <span className={'useful-link'} ><br />
                {userexit==null && userexit==undefined && 
                  <p className={'gradient learnmore useful-link'} style={{cursor: 'pointer',marginBottom: '60px',fontSize: '17px'}} onClick={this.signUp}>
                  Sign Up to Participate <img src={rightarrow} alt="" width="25px" />
                  </p>
                }
              </span>           
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