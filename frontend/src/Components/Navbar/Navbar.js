import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./Style/Xnb.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import lg from "../../Assests/Logo.png"
import Categories from './Categories/Categories';
import Menu from './Menu/Menu';
import Search from '../Search/Search';
export default function Navbar() {
  const [Mnuic, setmnuic] = useState(MenuIcon)
  const [Srhic, setsrhic] = useState(SearchIcon)
  const [catgdisplaystate, setcatgdisplaystate] = useState("none")
  const [searchcodisstate, Setsearchcodis] = useState(true)
  const handelsetmnu = () => {
    if (Mnuic === MenuIcon || document.getElementById('Xmnu').style.display === "none") {
      document.getElementById('Xmnu').style.display = "block"
      setmnuic(CloseIcon)

    } else {
      document.getElementById('Xmnu').style.display = "none"
      setmnuic(MenuIcon)
    }
  }
  const handelsetsrhic = () => {

    if (Srhic === SearchIcon || document.getElementById('Xnb1-srh').style.display === "none") {
      document.getElementById('Xnb1-srh').style.display = 'flex'
      document.getElementById('Xnb1-lgnm').style.display = 'none'
      setsrhic(CloseIcon)
    } else {
      document.getElementById('Xnb1-srh').style.display = 'none'
      document.getElementById('Xnb1-lgnm').style.display = 'flex'
      setsrhic(SearchIcon)
    }
    Setsearchcodis(true)
  }
 
  const handeldisplayofcatg = () => {

    if (catgdisplaystate === 'none') {
      setcatgdisplaystate('block')
    } else {
      setcatgdisplaystate("none")
    }

  }


  const searchcodis = () => {
    Setsearchcodis(false)
  }
  const [searchValue, setSearchvalue] = useState()

  const getsearch = (e) => {
    if (e.key === 'Enter') {
      const searchV = e.target.value
      setSearchvalue(searchV)
      searchcodis()
    }
  }


  return (
    <>
      <div className='Xnb' >
        <div className='Xnb1-lgnm' id='Xnb1-lgnm'>
          <img src={lg} alt="Logo" height={"40px"} width={"40px"} />
          <h4><i>RandomExplore</i></h4>
        </div>
        <div className='Xnb1-srh' id='Xnb1-srh'>
          <input type="search" name="search" onKeyDown={getsearch} placeholder='Search' />
        </div>
        <div className='Xnb1-srhic'>
          <Srhic style={{ fontSize: "30px" }} onClick={handelsetsrhic} />
        </div>
        <div className='Xnb1-mnu'>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <h4>Home</h4>
          </Link>
          <h4 onClick={handeldisplayofcatg}>Categories</h4>
          <Link to={"/About"} style={{ textDecoration: "none", color: "black" }}>
            <h4>About</h4>
          </Link>
          <Link to={"/Contact"} style={{ textDecoration: "none", color: "black" }}>
            <h4>Contact</h4>
          </Link>
          <Link to={"/Privacypolicy"} style={{ textDecoration: "none", color: "black" }}> <h4>Privacy policy</h4></Link>
        </div>

        <div className='Xnb1-mnuic'>
          <Mnuic style={{ fontSize: "30px" }} onClick={handelsetmnu} />
        </div>
      </div>
      <div className="Xcatg-mnucatg" style={{ display: catgdisplaystate }} >
        <Categories />
      </div>
      <div id='Xmnu' style={{ display: "none" }}>
        <Menu />
      </div>
      <div hidden={searchcodisstate}>
        <Search searchValue={searchValue} />
      </div>
    </>
  )
}
