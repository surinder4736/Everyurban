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
import MetaTags from 'react-meta-tags';
import {APIURL,BASE_URL} from '../Config/config'

export class ProjectDetail extends Component {
    // static displayName = Home.name;

    constructor(props) {
        super(props)
        this.state={comment:'',commentlist:null}
    }
    componentDidMount() {
        const { dispatch } = this.props;
        console.log(this.props.match);
        const  project_id  = this.props.match.params.project_url;
        localStorage.setItem('redriaction_session_url', "");
        localStorage.setItem('redriaction_session_time', Math.round(new Date() / 1000)+30);
        dispatch(blogAction.getBlogDetail({userId:project_id}));
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
       const { blog_detail,user,comment_list } = this.props;
        let userexit= user;
        if(user!=null){
            if(Object.keys(user).length == 0){
                userexit= null
            }
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
                <section id="howitwork">
                   <div className="howitwork-body">
                        <h1>Project RFPs</h1>
                        <p> {blog_detail.blog.posturlextension == this.props.match.params.project_url ?
                            <span className={''} dangerouslySetInnerHTML={{ __html: unescape(blog_detail.blog.posttitle) }}></span>: ""}
                        </p>
                    </div>
                    <div className="howitwork-content ">
                        <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                    {blog_detail.blog.posturlextension == this.props.match.params.project_url ? <span className={'postdetails useful-link'} dangerouslySetInnerHTML={{ __html: unescape(blog_detail.blog.postcontent) }}></span> : "No record found"}
                                 </div>
                            </div>
                        </div>
                        <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <hr/> 
                                </div>
                            </div>
                        </div>
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined && 
                            <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                                <div className="col-lg-12 ">
                                    <div className="bs-component">
                                        <span style={{fontSize:'16px'}}>({comment_list.comments.length}) comments</span> 
                                    </div>
                                </div>
                            </div>
                        }
                        {comment_list!=null && comment_list!=undefined && comment_list.comments!=undefined ? comment_list.comments.map((comment) => (
                                <div className="commentlist">
                                    <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                                        <div className="col-lg-2">
                                        <img
                                        src={`${BASE_URL}/images/${unescape(comment.photo)}`}
                                        className={'commentimage'}
                                        alt="comment"
                                        />
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                                                <div className="col-lg-12">
                                                    <p className="commentuser" style={{fontSize:'20px', fontWeight:'500'}}>{comment.firstName}</p>
                                                    <p className="commenttime">{comment.commentdate}</p>
                                                </div>
                                            </div>
                                            <div className="row list-body" style={{fontSize:'20px',width:'35em'}}>
                                                <div className="col-lg-12">
                                                    <span>{comment.postcomment}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                              )): ''
                        }
                        <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                            <div className="col-lg-12 ">
                                <div className="bs-component">
                                   <span style={{fontSize:'16px'}}>Leave a comment</span> 
                                </div>
                            </div>
                        </div>
                        <div className="row list-body" style={{fontSize:'25px',width:'35em'}}>
                            <div className="col-lg-12 ">
                                <section id="comment" class="commentsection">
                                    <div className="row">
                                        <div className="col-lg-12" style={{fontSize:'16px'}}>
                                            <textarea id="w3review" name="w3review" rows="4" style={{width:'100%',opacity:(userexit==null && userexit==undefined)?0.5:1,pointerEvents:(userexit==null && userexit==undefined)?'none':''}}  onChange={this.changeCommentHandle.bind(this)} value={this.state.comment}>
                                                    
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <div style={{float:'right'}}>
                                                <a className="btn gradientcomment" style={{ cursor:(userexit==null && userexit==undefined)?'default':'pointer', opacity:(userexit==null && userexit==undefined)?0.5:1,pointerEvents:(userexit==null && userexit==undefined)?'none':'' }}  onClick={ this.clickCommentHandle.bind(this)}>Send</a>
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
  }
}
export default connect(mapStateToProps)(ProjectDetail)
