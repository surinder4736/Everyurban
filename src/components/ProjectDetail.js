import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './Header'
import MenuComponent from './MenuComponent'
import Grid from '@material-ui/core/Grid'
import { confirmAlert } from 'react-confirm-alert';
import rightarrow from '../Images/rightarrow.png'
import Footer from './Footer'
import './App.css';
import blogAction from '../actions/blog';
import profileAction from '../actions/profile';
import MetaTags from 'react-meta-tags';
import NoImage from '../Images/Ulogosquare.png';
import {APIURL,BASE_URL} from '../Config/config'

export class ProjectDetail extends Component {
    // static displayName = Home.name;

    constructor(props) {
        super(props)
        this.state={comment:'',commentlist:null,initailImage:NoImage,is_Editable:false,editCommentid:0}
    }
    componentDidMount() {
        const { dispatch,user } = this.props;
        console.log(this.props.match);
        const  project_id  = this.props.match.params.project_url;
        localStorage.setItem('redriaction_session_url', "");
        localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
        dispatch(blogAction.cleanBlogCommentList());
        dispatch(blogAction.getBlogDetail({userId:project_id}));
        let userexit= user;
        if(user!=null){
            if(Object.keys(user).length == 0){
                userexit= null
            }
        }
        if(userexit!=null){
            dispatch(profileAction.getProfile({userId:user.id}));
        }
    }
    componentWillReceiveProps(nextProps) {
        const{dispatch}=this.props;
        if(nextProps.blog_detail!=this.props.blog_detail){
            dispatch(blogAction.getBlogComment({blogId:nextProps.blog_detail.blog.seno}));
        }
        if(nextProps.comment_list!=this.props.comment_list){
            this.setState({comment:'',is_Editable:false,editCommentid:0});
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
        
        if(this.state.is_Editable==false){
            dispatch(blogAction.addBlogComment(data));
        }
        else{
            data.id=this.state.editCommentid;
            dispatch(blogAction.editBlogComment(data))
            
        }
    }

    changeCommentHandle(e){
        this.setState({comment:e.target.value});
    }

    deleteCommentHandle(commentid,e){
        e.preventDefault();
        console.log(commentid);
        const{dispatch}=this.props;
        confirmAlert({
            title: 'Remove Comment',
            message: 'Are you sure you want to delete this comment?',
            buttons: [
              {
                label: 'Yes',
                onClick:()=>dispatch(blogAction.removeComment(commentid))
               },
              {
                label: 'Cancel'
              }
            ]
        });
        
    }

    editCommentHandle(comment,e){
        e.preventDefault();
        console.log(comment);
        this.setState({comment:comment.postcomment,is_Editable:true,editCommentid:comment.id});
    }


    render() {
       const { blog_detail,user,comment_list,profile } = this.props;
        let userexit= user;
        let curobj=this;
        let commentDisabled=false;
        if(user!=null){
            if(Object.keys(user).length == 0){
                userexit= null
            }
        }
        if(userexit!=null && (userexit.is_profilestatus==true || (profile.profile!=undefined && profile.profile.isCompleted==true))){
            commentDisabled=true;
        }
        let listingcomment=[];
        if(comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined){
            comment_list.comments.map((cmt)=>{
                let dt=new Date(cmt.commentdate);
                cmt.commentdate=(dt.getMonth()+1)+"/"+(dt.getDate())+"/"+dt.getFullYear();
                let time=cmt.commenttime.split('.')[0];
                cmt.commenttime=time;
                listingcomment.push(cmt);
            })
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
                {blog_detail.blog==null && blog_detail.blog==undefined &&
                    <div id="load" class="spinner-loader"> <div class="load-wrap"></div></div>
                }
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
                                    {blog_detail.blog.posturlextension == this.props.match.params.project_url ? <span className={'postdetails useful-link'} dangerouslySetInnerHTML={{ __html: unescape(blog_detail.blog.postcontent) }}></span> : <div id="load" class="spinner-loader"> <div class="load-wrap"></div></div>}
                                 </div>
                            </div>
                        </div>
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined && 
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <hr/> 
                                </div>
                            </div>
                        </div>}
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined && 
                            <div className="row list-body commentcount">
                                <div className="col-lg-12 ">
                                    <div className="bs-component">
                                        <span style={{fontSize:'16px',fontWeight:'400'}}>({comment_list.comments.length}) Comments</span> 
                                    </div>
                                </div>
                            </div>
                        }
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined ? listingcomment.map((comment) => (
                                
                                <div className="commentlist">
                                    <div className="row list-body">
                                        <div className="col-lg-2">  
                                        <img
                                        // src={`${BASE_URL}/images/${unescape(comment.photo==""?curobj.state.initailImage:comment.photo)}`}
                                        src={comment.photo==""?curobj.state.initailImage:`${BASE_URL}/images/${unescape(comment.photo)}`}
                                        className={'commentimage'}
                                        alt="comment"
                                        />
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <p className="commentuser" style={{fontSize:'16px', fontWeight:'500'}}>{comment.firstName}</p>
                                                    {/* <p className="commenttime">{comment.commentdate +' '+comment.commenttime}</p> */}
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-lg-12">
                                                    <p style={{fontSize:'14px',margin:'0px'}}>{comment.postcomment}</p>
                                                </div>
                                            </div>
                                            {commentDisabled==true && user.id== parseInt(comment.userid) &&
                                                <div className="row" >
                                                    <div className="col-lg-12">
                                                        <p style={{color:'#686868'}}><a alt="edit" style={{cursor:'pointer'}} onClick={this.editCommentHandle.bind(this,comment)}>Edit</a> | <a alt="delete" style={{cursor:'pointer'}} onClick={this.deleteCommentHandle.bind(this,comment.id)}>Delete</a></p>
                                                    </div>
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                              )): ''
                        }
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined && 
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <hr/> 
                                </div>
                            </div>
                        </div>}
                        <div className="row leavecommnt">
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <span style={{fontSize:'16px',fontWeight:'400'}}>Leave a Comment</span> 
                                </div>
                            </div>
                        </div>
                        <div className="row list-body">
                            <div className="col-lg-12 ">
                                <section id="comment" class="commentsection">
                                    <div className="row">
                                        <div className="col-lg-12" style={{fontSize:'12px'}}>
                                            <textarea id="w3review" placeholder="Send Text" name="w3review" rows="4" style={{width:'100%',padding:'10px',opacity:(commentDisabled==false)?0.5:1,pointerEvents:(commentDisabled==false)?'none':''}}  onChange={this.changeCommentHandle.bind(this)} value={this.state.comment}>
                                                    
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <div style={{textAlign:'center'}}>
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
