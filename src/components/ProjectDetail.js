import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './Header'
import MenuComponent from './MenuComponent'
import Footer from './Footer'
import './App.css';
import blogAction from '../actions/blog';
import MetaTags from 'react-meta-tags';

export class ProjectDetail extends Component {
    // static displayName = Home.name;

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        //  if(!this.props.user){
        // window.location.href="/Login";
		// }
        const { dispatch } = this.props;
        console.log(this.props.match);
        const  project_id  = this.props.match.params.project_url;
        dispatch(blogAction.getBlogDetail({userId:project_id}));
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps");
    }

    render() {
       const { blog_detail } = this.props;
        console.log(this.props);

        return (
            <div>
                <Header />
                <MetaTags>                    
                    <meta name="title" content={`${blog_detail.blog.postmetaextension}`} />
                    <meta name="description" content={`${blog_detail.blog.postmetaextension}`}/>
                    <meta name="Publisher" content={`${blog_detail.blog.publisher}`} />
                    <meta name="Keywords" content={`${blog_detail.blog.keywords}`}/>
                </MetaTags>
                <MenuComponent />
                {/* Slider */}
                <section id="howitwork">
                   
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
                        </div>                        
                </section>
                <Footer />
            </div>
        )
    }
}
ProjectDetail.propTypes = {
  blog_detail: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    blog_detail: state.blog.blogs
  }
}
export default connect(mapStateToProps)(ProjectDetail)
