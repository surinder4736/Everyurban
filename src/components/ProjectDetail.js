import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './Header'
import MenuComponent from './MenuComponent'
import Grid from '@material-ui/core/Grid'
import rightarrow from '../Images/rightarrow.png'
import Footer from './Footer'
import './App.css';
import blogAction from '../actions/blog';
import profileAction from '../actions/profile';
import MetaTags from 'react-meta-tags';
import {APIURL,BASE_URL} from '../Config/config'

export class ProjectDetail extends Component {
    // static displayName = Home.name;

    constructor(props) {
        super(props)
        this.state={comment:'',commentlist:null}
    }
    componentDidMount() {
        const { dispatch,user } = this.props;
        console.log(this.props.match);
        const  project_id  = this.props.match.params.project_url;
        localStorage.setItem('redriaction_session_url', "");
        localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
        dispatch(blogAction.getBlogDetail({userId:project_id}));
        dispatch(profileAction.getProfile({userId:user.id}));
    }
    componentWillReceiveProps(nextProps) {
        const{dispatch}=this.props;
        if(nextProps.blog_detail!=this.props.blog_detail){
            dispatch(blogAction.getBlogComment({blogId:nextProps.blog_detail.blog.seno}));
        }
    }

    signUp(e) {
        e.preventDefault();
        let url=this.props.match.url;
        localStorage.setItem('redriaction_session_url', url);
        localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
        window.location.href = `/signup`;
    }

    clickCommentHandle(e){
        e.preventDefault();
        const{dispatch,user,blog_detail}=this.props;
        if(user==null){
            alert('please logged in first');
            return;
        }
        if(this.state.comment==''){
            alert('please add comment')
            return;
        }
        const  project_id  = blog_detail.blog.seno;
        console.log(project_id);
        let data={
            postid: parseInt(project_id),
            userid:user.id,
            postcomment:this.state.comment
        };
        this.setState({comment:''});
        dispatch(blogAction.addBlogComment(data));
    }

    changeCommentHandle(e){
        this.setState({comment:e.target.value});
    }

    render() {
       const { blog_detail,user,comment_list,profile } = this.props;
        let userexit= user;
        let commentDisabled=false;
        if(user!=null){
            if(Object.keys(user).length == 0){
                userexit= null
            }
        }
        if(userexit!=null && (userexit.is_profilestatus==true || (profile.profile!=undefined && profile.profile.isCompleted==true))){
            commentDisabled=true;
        }
        return (
            <div>
                <Header />
                <MetaTags>                    
                    <meta name="title" content={`${blog_detail.blog!=undefined?blog_detail.blog.postmetaextension:''}`} />
                    <meta name="description" content={`${blog_detail.blog!=undefined?blog_detail.blog.postmetaextension:''}`}/>
                    <meta name="Publisher" content={`${blog_detail.blog!=undefined?blog_detail.blog.publisher:''}`} />
                    <meta name="Keywords" content={`${blog_detail.blog!=undefined?blog_detail.blog.keywords:''}`}/>
                </MetaTags>
                <MenuComponent />
                {/* Slider */}
                {blog_detail.blog!=null && blog_detail.blog!=undefined &&
                <section id="projectdetail">
                   <div className="howitwork-body">
                        <h1>Project RFPs</h1>
                        <p> {blog_detail.blog.posturlextension == this.props.match.params.project_url ?
                            <span className={''} dangerouslySetInnerHTML={{ __html: unescape(blog_detail.blog.posttitle) }}></span>: ""}
                        </p>
                    </div>
                    <div className="howitwork-content ">
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                    {blog_detail.blog.posturlextension == this.props.match.params.project_url ? <span className={'postdetails useful-link'} dangerouslySetInnerHTML={{ __html: unescape(blog_detail.blog.postcontent) }}></span> : "No record found"}
                                 </div>
                            </div>
                        </div>
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <hr/> 
                                </div>
                            </div>
                        </div>
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined && 
                            <div className="row list-body">
                                <div className="col-lg-12 ">
                                    <div className="bs-component">
                                        <span style={{fontSize:'16px',fontWeight:'400'}}>({comment_list.comments.length}) comment(s)</span> 
                                    </div>
                                </div>
                            </div>
                        }
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined ? comment_list.comments.map((comment) => (
                                <div className="commentlist">
                                    <div className="row list-body">
                                        <div className="col-lg-2">
                                        <img
                                        src={`${BASE_URL}/images/${unescape(comment.photo)}`}
                                        className={'commentimage'}
                                        alt="comment"
                                        />
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <p className="commentuser" style={{fontSize:'16px', fontWeight:'500'}}>{comment.firstName}</p>
                                                    <p className="commenttime">{comment.commentdate}</p>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-lg-12">
                                                    <span style={{fontSize:'12px'}}>{comment.postcomment}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                              )): ''
                        }
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <span style={{fontSize:'16px',fontWeight:'400'}}>Leave a comment</span> 
                                </div>
                            </div>
                        </div>
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <section id="comment" class="commentsection">
                                    <div className="row">
                                        <div className="col-lg-12" style={{fontSize:'12px'}}>
                                            <textarea id="w3review" name="w3review" rows="4" style={{width:'100%',opacity:(commentDisabled==false)?0.5:1,pointerEvents:(commentDisabled==false)?'none':''}}  onChange={this.changeCommentHandle.bind(this)} value={this.state.comment}>
                                                    
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <div style={{float:'right'}}>
                                                <a className="btn gradientcomment" style={{ cursor:(commentDisabled==false)?'default':'pointer', opacity:(commentDisabled==false)?0.5:1,pointerEvents:(commentDisabled==false)?'none':'' }}  onClick={ this.clickCommentHandle.bind(this)}>Send</a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        
                    </div>
                    <Grid item xs={12} style={{ textAlign: 'center' }} className={""}>
                        <span className={'useful-link'} ><br />
                            {userexit==null && userexit==undefined && 
                                <p className={'gradient learnmore useful-link'} style={{cursor: 'pointer',marginBottom: '60px',fontSize: '17px'}} onClick={this.signUp.bind(this)}>
                                Sign Up to Participate <img src={rightarrow} alt="" width="25px" />{' '}
                                </p>
                            }
                        </span>           
                    </Grid>                        
                </section>
                }
                <Footer />
            </div>
        )
    }
}
ProjectDetail.propTypes = {
    user: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    blog_detail: state.blog.blogs,
    comment_list:state.blog.comment,
    user: state.users.user,
    profile:state.profile.profile,
  }
}
export default connect(mapStateToProps)(ProjectDetail)
