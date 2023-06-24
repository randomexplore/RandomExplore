import React, { useState } from 'react'
import axios from 'axios'
import "./Xocp.css"

export default function Xocpdb2() {



  const [Xocpdb2psim, setXocpdb2psim] = useState()
  const [Xocpdb2psimforsend, setXocpdb2psimforsend] = useState()
  const [idttlartsct, setidttldissct] = useState({
    id: "",
    ttl: "",
    art: "",
    sct: "",

  })



  const setXocpdb2psimvalue = (e) => {
    const file = e.target.files[0];
    setXocpdb2psimforsend(file)
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setXocpdb2psim(reader.result)
      };

      reader.readAsDataURL(file);

    }

  }



  const handelsetidttldissct = (e) => {
    const { name, value } = e.target;
    setidttldissct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  

  const handelclickXocpdb2psimin = () => {
    document.getElementById("Xocpdb2psimin").click()
  }



  const handleUp = async () => {
    const Info = {
      image: Xocpdb2psimforsend,
      text: idttlartsct
    }
    try {
      const response = await axios.post(process.env.REACT_APP_SCRL, Info,
        {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <div className='Xocpdb'>
      <div className='Xocpdbps'>
        <div className='Xocpdbps1s'>
          <div className='Xocpdb2psigbx'>
            <img src={Xocpdb2psim} alt="" id='Xocpdb2psim' />
            <input type="file" name='image' onChange={setXocpdb2psimvalue} id="Xocpdb2psimin" hidden />
            <button onClick={handelclickXocpdb2psimin} id="Xocpdbpsbtn"></button>
          </div>

        </div>
        <div className='Xocpdbps2s'>
          <input type="text" name='ttl' onChange={handelsetidttldissct} />
          <br />
          <textarea name="art" onChange={handelsetidttldissct} cols="30" rows="10"></textarea>
          <br />
          <input type="text" name='id' onChange={handelsetidttldissct} />
          <input type="text" name='sct' onChange={handelsetidttldissct} />
          <button onClick={handleUp} id="Xocpdbpsbtn"></button>
        </div>
      </div>
    </div>
  )
}
