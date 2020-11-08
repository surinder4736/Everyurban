import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
// import './postlist.css'
import rightarrow from '../../Images/rightarrow.png'
import {APIURL,BASE_URL} from '../../Config/config'

function toSeoUrl(url) {
  if(url!=undefined){
    return url.toString()               // Convert to string
    .normalize('NFD')               // Change diacritics
    .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
    .replace(/\s+/g,'-')            // Change whitespace to dashes
    .toLowerCase()                  // Change to lowercase
    .replace(/&/g,'-and-')          // Replace ampersand
    .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
    .replace(/-+/g,'-')             // Remove duplicate dashes
    .replace(/^-*/,'')              // Remove starting dashes
    .replace(/-*$/,'');             // Remove trailing dashes
  }
}

export default function AutoGridNoWrap(props) {
  const post = props.props
  return (
    <div className={'listcontaner'}>
      <div className={'projectimage'}>
        <img
          src={`${BASE_URL}/images/${unescape(post.image)}`}
          className={'projectimage'}
          alt="Project"
        />
      </div>
      <div className={'Projectlistdetails'}>
        <div className={'makecenter'}>
          <span className={'posttitle'} dangerouslySetInnerHTML={{ __html: unescape(post.posttitle) }}></span>
          <br/>
          <span className={'postdetails useful-link'} dangerouslySetInnerHTML={{ __html: unescape(post.postlistcontent), }}>
          </span>  
          <span className={'postshowlink useful-link'}>
            <a style={{cursor: 'pointer',fontSize :'16px'}} href={`/${post.posturlextension}/${toSeoUrl(post.posttitle)}`}
              className={'gradient learnmore useful-link'}
            >learn more <img src={rightarrow} alt="" width="25px" /></a>
          </span>
        </div>
      </div>
    </div>
  )
}
