import React, { useState, useEffect, useContext } from 'react'
import {  useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from './Navbar/Navbar'
import "./Style/Xco.css"
import axios from 'axios';
import DataContext from '../Context';

export default function Home() {

  const { conimuli, conCateentidttl, conCatecokidttl, conCatefinidttl,
    conCaterandexidttl, conCatetraidttl, conCatetecidttl,
    funconimuli, funconCateentidttl, funconCatecokidttl,
    funconCatefinidttl, funconCaterandexidttl, funconCatetraidttl,
    funconCatetecidttl } = useContext(DataContext);

  useEffect(() => {
    const fecth = async () => {
      const response = await axios.get(process.env.REACT_APP_SCRLGET);
      
      const { results1, results2, results3 } = response.data;
      const combinedData = results1.map((result, index) => ({
        imul: result[process.env.REACT_APP_DB_FLD_IMGU],
        imuli: results2[index][process.env.REACT_APP_DB_FLD_XARTID],
        imulttl: results3[index][process.env.REACT_APP_DB_FLD_XARTTTL],
      }));
      funconimuli(combinedData);
      const rescate = await axios.get(process.env.REACT_APP_POSTGET)
      const { signedUrls, Cateentidttlresult, Catecokidttlresult, Catefinidttlresult, Caterandexidttlresult, Catetraidttlresult, Catetecidttlresult } = rescate.data;

      const Combinecateint = signedUrls[0].Cateent.map((res, index) => ({
        Cateentul: res.Ul,
        Cateentid: Cateentidttlresult[index].id,
        Catentttl: Cateentidttlresult[index].ttl
      }))

      const Combinecatecok = signedUrls[1].Catecok.map((res, index) => ({
        Catecokul: res.Ul,
        Catecokid: Catecokidttlresult[index].id,
        Catecokttl: Catecokidttlresult[index].ttl
      }))
      const Combinecatefin = signedUrls[2].Catefin.map((res, index) => ({
        Catefinul: res.Ul,
        Catefinid: Catefinidttlresult[index].id,
        Catefinttl: Catefinidttlresult[index].ttl
      }))
      const Combinecaterandex = signedUrls[3].Caterandex.map((res, index) => ({
        Caterandexul: res.Ul,
        Caterandexid: Caterandexidttlresult[index].id,
        Caterandexttl: Caterandexidttlresult[index].ttl
      }))
      const Combinecatetra = signedUrls[4].Catetra.map((res, index) => ({
        Catetraul: res.Ul,
        Catetraid: Catetraidttlresult[index].id,
        Catetrattl: Catetraidttlresult[index].ttl
      }))
      const Combinecatetec = signedUrls[5].Catetec.map((res, index) => ({
        Catetecul: res.Ul,
        Catetecid: Catetecidttlresult[index].id,
        Catetecttl: Catetecidttlresult[index].ttl
      }))
      funconCateentidttl(Combinecateint)
      funconCatecokidttl(Combinecatecok)
      funconCatefinidttl(Combinecatefin)
      funconCaterandexidttl(Combinecaterandex)
      funconCatetraidttl(Combinecatetra)
      funconCatetecidttl(Combinecatetec)
    }
    if(!conimuli){
      fecth()
    }
    
  }, [conimuli])
  
   

  var imulimulidisplay = 2
  var Arrowdisplay = 0


  const setimdisplay = () => {


    const imulimuli1 = document.querySelectorAll('#A1')
    imulimuli1.forEach(function (imulimuli) {
      imulimuli.style.display = "block"
    })
    if (imulimulidisplay <= 5) {
      const imulimuli = document.querySelectorAll(`#A${imulimulidisplay}`)
      imulimuli.forEach(function (imulimuli) {
        imulimuli.style.display = "none"
      })
      imulimulidisplay++
    }
    Arrowdisplay++
    const element = document.querySelectorAll("#Xmnscrl-nxtprebx")
    element.forEach(function (element) {
      element.style.display = "none";
    });

    const elementmo = document.querySelectorAll("#Xmnscrl-nxtprebtnmo")
    elementmo.forEach(function (elementmo) {
      elementmo.style.display = "none";
    });

    if (Arrowdisplay === 5) {
      setbackgim()
      const element = document.querySelectorAll("#Xmnscrl-nxtprebx")
      const elementmo = document.querySelectorAll("#Xmnscrl-nxtprebtnmo")


      element.forEach(function (element) {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        function handleMatches(mediaQuery) {
          if (mediaQuery.matches) {
            const elementmo = document.querySelectorAll("#Xmnscrl-nxtprebtnmo")
            elementmo.forEach(function (elementmo) {
              elementmo.style.display = "none"
            })
            element.style.display = "block";
          }
        }
        handleMatches(mediaQuery);
        mediaQuery.addListener(handleMatches);
      });


      elementmo.forEach(function (elementmo) {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        function handleMatches(mediaQuery) {
          if (mediaQuery.matches) {
            const element = document.querySelectorAll("#Xmnscrl-nxtprebx")
            element.forEach(function (element) {
              element.style.display = "none"
            })
            elementmo.style.display = "block";
          }

        }
        handleMatches(mediaQuery);
        mediaQuery.addListener(handleMatches);
      });
    }
  }

  const [backgim1, setbackgim1] = useState()
  const [backgim2, setbackgim2] = useState()
  const [backgim3, setbackgim3] = useState()
  const [backgim4, setbackgim4] = useState()
  const [backgim5, setbackgim5] = useState()
  const [backim, setbackim] = useState()

  useEffect(() => {
    setbackdefualt()
  }, [backgim1])

  const setbackgim = () => {
    const backimgelement1 = document.getElementById("A1")
    setbackgim1(backimgelement1.src)
    const backimgelement2 = document.getElementById("A2")
    setbackgim2(backimgelement2.src)
    const backimgelement3 = document.getElementById("A3")
    setbackgim3(backimgelement3.src)
    const backimgelement4 = document.getElementById("A4")
    setbackgim4(backimgelement4.src)
    const backimgelement5 = document.getElementById("A5")
    setbackgim5(backimgelement5.src)

  }

  const setbackdefualt = () => {
    setbackim(backgim1)
  }

  var [iii, setiii] = useState(1)
  var [iiii, setiiii] = useState(1)

  useEffect(() => {
    if (iii === 2) { setbackim(backgim2) }
    if (iii === 3) { setbackim(backgim3) }
    if (iii === 4) { setbackim(backgim4) }
    if (iii === 5) { setbackim(backgim5) }
    document.getElementById(`scrl-bullet${iii}`).style.listStyleType = ""
    const imimiblock = document.querySelectorAll(`#A${iii}`)
    imimiblock.forEach(function (imimiblock) {
      imimiblock.style.display = "block"
    })

  }, [iii])

  const handelnext = () => {

    if (iii < 5) {
      const imiminone = document.querySelectorAll(`#A${iii}`)
      imiminone.forEach(function (imiminone) {
        imiminone.style.display = "none"
      })

      setiii((i) => {
        const newcount = i + 1
        return newcount
      })

      setiiii((i) => {
        const newcount = i + 1
        return newcount
      })

    }
  }
  useEffect(() => {
    if (iiii === 1) { setbackim(backgim1) }
    if (iiii === 2) { setbackim(backgim2) }
    if (iiii === 3) { setbackim(backgim3) }
    if (iiii === 4) { setbackim(backgim4) }
    if (iiii === 5) { setbackim(backgim5) }
    const imimiblock = document.querySelectorAll(`#A${iiii}`)
    imimiblock.forEach(function (imimiblock) {
      imimiblock.style.display = "block"
    })

  }, [iiii])

  const handelback = () => {
    if (iiii > 1) {
      const imiminone = document.querySelectorAll(`#A${iiii}`)
      imiminone.forEach(function (imiminone) {
        imiminone.style.display = "none"
      })
      document.getElementById(`scrl-bullet${iiii}`).style.listStyleType = "circle"
      setiiii((i) => {
        const newcount = i - 1
        return newcount
      })
      setiii((i) => {
        const newcount = i - 1
        return newcount
      })
    }
  }

  const [ptsid, setptsid] = useState()
  const [ptsnm, setptsnm] = useState()

  const navigate = useNavigate()

  const clickonlink = (e) => {
    const pid = e.target.id
    const pnm = e.target.name
    setptsid(pid)
    setptsnm(pnm)
  }

  const clickonlinkscrl = (e) => {
    const pid = e.target.id
    const pnm = e.target.name
    const slicedCharacter = pid.slice(1);
    setptsid(slicedCharacter)
    setptsnm(pnm)
  }

  if (ptsid && ptsnm) {
    navigate(`/Posts/${ptsnm}/${ptsid}`)
  }
  const [cateptsnm, setcateptsnm] = useState()

  const clickonlinkforcatepts = (e)=>{
    const pnm = e.target.name
    setcateptsnm(pnm)
  }
  if (cateptsnm) {
    navigate(`/Cate/${cateptsnm}`)
  }

  return (
    <div className='X'>
      <div>
        <Navbar />
      </div>
      <div className='Xhm'>
        <div>
          <div className='Xmnscrl' id='Xmnscrl' style={{ backgroundImage: `url(${backim})`, backgroundPosition: 'center' }}>
            <div id='Xmnscrl-nxtprebx' onClick={handelback}  >
              <ArrowBackIcon id="Xmnscrl-nxtprebtn" />
            </div>
            <div className='Xmnscrl-imgbx '>
              {conimuli && conimuli.map(item => (
                <img src={item.imul} key={item.imuli} onClick={clickonlinkscrl} name="scrl" id={`A${item.imuli}`} alt="" onLoad={setimdisplay} style={{ display: 'none' }} />
              ))}
            </div>
            <div id='Xmnscrl-nxtprebx' onClick={handelnext}>
              <ArrowForwardIcon id="Xmnscrl-nxtprebtn" />
            </div>
          </div>
          <div className='Xmnscrl-title' style={{ padding: "10px", display: 'flex', justifyContent: "center", maxWidth: "500px", margin: "auto" }} >
            {conimuli && conimuli.map(item => (
              <h3 key={item.imuli} id={`A${item.imuli}`} style={{ display: 'none' }} onClick={clickonlinkscrl} >{item.imulttl}</h3>
            ))}
          </div>
        </div>
        <div className='Xmnscrl-bullet' style={{ display: "flex", justifyContent: "space-around" }}>
          <ArrowBackIcon id="Xmnscrl-nxtprebtnmo" onClick={handelback} />
          <div style={{ display: "flex" }}>
            <li id='scrl-bullet1' /><li id='scrl-bullet2' style={{ listStyleType: "circle" }} /><li id='scrl-bullet3' style={{ listStyleType: "circle" }} /><li id='scrl-bullet4' style={{ listStyleType: "circle" }} /><li id='scrl-bullet5' style={{ listStyleType: "circle" }} />
          </div>
          <ArrowForwardIcon id="Xmnscrl-nxtprebtnmo" onClick={handelnext} />
        </div>
        <br />
        <hr />

        <div className='Xhm-pts'>
          <div className='Xcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2>Entertainment</h2><button id='mr-btn' name='Entertainment' onClick={clickonlinkforcatepts}>More</button></div>
            <div className='Xcate-mnptsbx'>
              {conCateentidttl && conCateentidttl.map(item => (
                <div className='Xcate-pts' onClick={clickonlink} id={item.Cateentid} name="entertainment" key={item.Cateentid}>
                  <div className='Xcate-ptsimg' id={item.Cateentid} name="entertainment"><img src={item.Cateentul} alt="" id={item.Cateentid} name="entertainment" /></div>
                  <div className='Xcate-ptstitle' id={item.Cateentid} name="entertainment"><b id={item.Cateentid} name="entertainment">{item.Catentttl}</b></div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className='Xcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2>Travel</h2><button id='mr-btn' name='Travel' onClick={clickonlinkforcatepts}>More</button></div>
            <div className='Xcate-mnptsbx'>
              {conCatetraidttl && conCatetraidttl.map(item => (
                <div className='Xcate-pts' onClick={clickonlink} key={item.Catetraid} id={item.Catetraid} name="travel">
                  <div className='Xcate-ptsimg' id={item.Catetraid} name="travel"><img src={item.Catetraul} alt="" id={item.Catetraid} name="travel" /></div>
                  <div className='Xcate-ptstitle' id={item.Catetraid} name="travel"><b id={item.Catetraid} name="travel"> {item.Catetrattl} </b></div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className='Xcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2>Financial</h2><button id='mr-btn' name='Financial' onClick={clickonlinkforcatepts}>More</button></div>
            <div className='Xcate-mnptsbx'>
              {conCatefinidttl && conCatefinidttl.map(item => (
                <div className='Xcate-pts' onClick={clickonlink} key={item.Catefinid} id={item.Catefinid} name="financial">
                  <div className='Xcate-ptsimg' id={item.Catefinid} name="financial"><img src={item.Catefinul} alt="" id={item.Catefinid} name="financial" /></div>
                  <div className='Xcate-ptstitle' id={item.Catefinid} name="financial"> <b id={item.Catefinid} name="financial">{item.Catefinttl}</b></div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className='Xcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2>Cooking</h2><button id='mr-btn' name='Cooking' onClick={clickonlinkforcatepts}>More</button></div>
            <div className='Xcate-mnptsbx'>
              {conCatecokidttl && conCatecokidttl.map(item => (
                <div className='Xcate-pts' onClick={clickonlink} key={item.Catecokid} id={item.Catecokid} name="cooking">
                  <div className='Xcate-ptsimg' id={item.Catecokid} name="cooking"><img src={item.Catecokul} alt="" id={item.Catecokid} name="cooking" /></div>
                  <div className='Xcate-ptstitle' id={item.Catecokid} name="cooking"> <b id={item.Catecokid} name="cooking"> {item.Catecokttl} </b></div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className='Xcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2> Technology</h2><button id='mr-btn' name='Technology' onClick={clickonlinkforcatepts}>More</button></div>
            <div className='Xcate-mnptsbx'>
              {conCatetecidttl && conCatetecidttl.map(item => (
                <div className='Xcate-pts' onClick={clickonlink} key={item.Catetecid} id={item.Catetecid} name="technology">
                  <div className='Xcate-ptsimg' id={item.Catetecid} name="technology"><img src={item.Catetecul} alt="" id={item.Catetecid} name="technology" /></div>
                  <div className='Xcate-ptstitle' id={item.Catetecid} name="technology"> <b id={item.Catetecid} name="technology"> {item.Catetecttl} </b></div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className='Xrandexcate-ptsbx'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px" }} ><h2>RandomExplore</h2></div>
            <div className='Xrandexcate-mnptsbx'>
              {conCaterandexidttl && conCaterandexidttl.map(item => (
                <div className='Xrandexcate-pts' onClick={clickonlink} key={item.Caterandexid} id={item.Caterandexid} name="randomexplore">
                  <div className='Xcate-ptsimg' id={item.Caterandexid} name="randomexplore"><img src={item.Caterandexul} alt="" id={item.Caterandexid} name="randomexplore" /></div>
                  <div className='Xcate-ptstitle' id={item.Caterandexid} name="randomexplore"> <b id={item.Caterandexid} name="randomexplore">{item.Caterandexttl}</b></div>
                </div>
              ))
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
