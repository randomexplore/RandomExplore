import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import axios from 'axios'
export default function Posts() {
  
  const { id,Cate } = useParams();

  const [postsul,setpostsul]=useState() 
  const [poststtl,setpoststtl]=useState() 
  const [postsARTS,setpostsARTS]=useState() 
  var ARTS = ''
  if(postsARTS){
     ARTS = postsARTS.replace(/:br/g,() =>' <br/>')
    ARTS = ARTS.replace(/h1/g,() =>' <h4>')
     ARTS = ARTS.replace(/h2/g,() =>' </h4>')
  }

  

    const clickonlink = async() => {
      
      const res =  await axios.get(`${process.env.REACT_APP_MNPTS}/${id}/${Cate}`)
      const Ul = res.data[0].Ul
      setpostsul(Ul)
      const TTLS = res.data[0].res2[0][process.env.REACT_APP_DB_FLD_XARTTTL]
      setpoststtl(TTLS)
      const ARTS = res.data[0].res2[0][process.env.REACT_APP_DB_FLD_XARTART]
      setpostsARTS(ARTS)
    }
    
    if(id && Cate){
      clickonlink()
    }
    
    

  return (
    <div className='X'>
        <div>
            <Navbar/>
        </div>
      <div className='Xmnpts'>
         <div className='Xmnpts-mnimgbx' style={{backgroundImage:`url(${postsul})`}}>
          <div className='Xmnpts-innerimgbx'>
            <img src={postsul} alt="" id='Xmnpts-img'/>
          </div>
         </div>
         <div className='Xmnpts-mntitlebx'>
                   <h2 style={{margin:"auto"}}>{poststtl}</h2> 
         </div>
            <div className='Xmnpts-art'>
              <div dangerouslySetInnerHTML={{ __html: ARTS }} />
            </div>
      </div>
    </div>
  )
}
