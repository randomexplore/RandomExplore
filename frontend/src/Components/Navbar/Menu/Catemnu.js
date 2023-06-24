import React from 'react'
import {Link} from "react-router-dom"
export default function Catemnu(props) {
   function handelbackclick() {
      props.onButtonClick();
   }
   return (
      <>
         <div className='Xmnu1'>
            <Link to='/Cate/Entertainment' style={{textDecoration:"none",color:"black"}}>
               <h4 style={{ cursor: "pointer" }}>Entertainment</h4>
            </Link>
            <Link to='/Cate/Travel' style={{textDecoration:"none",color:"black"}}>
               <h4 style={{ cursor: "pointer" }}>Travel</h4>
            </Link>
            <Link to='/Cate/Financial' style={{textDecoration:"none",color:"black"}}>
               <h4 style={{ cursor: "pointer" }}>Financial</h4>
            </Link>
            <Link to='/Cate/Cooking' style={{textDecoration:"none",color:"black"}}>
               <h4 style={{ cursor: "pointer" }}>Cooking</h4>
            </Link>
            <Link to='/Cate/Technology' style={{textDecoration:"none",color:"black"}}>
               <h4 style={{ cursor: "pointer" }}>Technology</h4>
            </Link>
            <h5 onClick={handelbackclick} style={{ cursor: "pointer" }}>Back</h5>
         </div>
      </>
   )
}
