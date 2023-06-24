import React from 'react'
import "../Style/Xnb.css"
import { Link } from 'react-router-dom'
import Catemnu from './Catemnu'
export default function Menu() {
  const displaycates=()=>{
    if (document.getElementById("Xcatemnu").style.display=== "none") {
      document.getElementById("Xmnu1").style.display = "none"
      document.getElementById("Xcatemnu").style.display="block" 
    }
  }
  function incrementCount() {
    if (document.getElementById("Xmnu1").style.display==='none') {
      document.getElementById("Xmnu1").style.display="flex" 
      document.getElementById("Xcatemnu").style.display = "none"

    }
  }

  return (
    <>
    <div className='Xmnu'>
      <div className='Xmnu1' id='Xmnu1'>
       
        <Link to={"/"} style={{textDecoration:"none",color:"black"}}>
          <h4>Home</h4>
        </Link>
        <h4 onClick={displaycates} style={{cursor: "pointer"}}>Categories</h4>
        <Link to={"/About"} style={{textDecoration:"none",color:"black"}}>
          <h4>About</h4>
        </Link>
        <Link to={"/Contact"} style={{textDecoration:"none",color:"black"}}>
          <h4>Contact</h4>
        </Link>
        <Link to={"/Privacypolicy"} style={{textDecoration:"none",color:"black"}}>
          <h4>Privacy policy</h4>
        </Link>
        
       
      </div>
     <div id='Xcatemnu' style={{display:'none'}}>
      <Catemnu onButtonClick={incrementCount}/>
      </div> 
    </div>
    </>
  )
}
