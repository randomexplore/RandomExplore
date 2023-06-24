import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Xnb.css"
export default function Categories() {
  return (
    <div className='Xcatg'>

      <Link to={"/Cate/Entertainment"} style={{ textDecoration: "none", color: "black" }}>
        <h4>Entertainment</h4>
      </Link>
      <Link to={"/Cate/Financial"} style={{ textDecoration: "none", color: "black" }}>
        <h4>Financial</h4>
      </Link>
      <Link to={"/Cate/Cooking"} style={{ textDecoration: "none", color: "black" }}>
        <h4>Cooking</h4>
      </Link>
      <Link to={"Cate/Travel"} style={{ textDecoration: "none", color: "black" }}>
        <h4>Travel</h4>
      </Link>
      <Link to={"/Cate/Technology"} style={{ textDecoration: "none", color: "black" }}>
        <h4> Technology</h4>
      </Link>

    </div>
  )
}
