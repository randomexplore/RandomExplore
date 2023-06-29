import "./Xocp.css"
import { useState } from "react"
import axios from "axios"
import Xocpdb2 from './Xocpdb2'
export default function Xocpdb() {

  const [Xocpdb2psim, setXocpdb2psim] = useState()
  const [Xocpdb2psimforsend, setXocpdb2psimforsend] = useState()
  const [statecate, setstatecate] = useState()
  const [idttlartsct, setidttldissct] = useState({
    ttl: "",
    art: "",
    sct: "",

  })

  const handelsetidttldissct = (e) => {
    const { name, value } = e.target;
    setidttldissct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

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

  const setCate = (e) => {
    const cate = e.target.name
    setstatecate(cate)

  }

  const handleUp = async () => {

    const Info = {
      image: Xocpdb2psimforsend,
      text: idttlartsct,
      cate: statecate
    }
    try {
      const response = await axios.post(process.env.REACT_APP_POST, Info,
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

  const [delcatename, setdelcatename] = useState()
  const [deleidsct, setdeleidsct] = useState({
    delid: "",
    delsct: "",
  })
  const data = {
    delcatename,
    deleidsct
  }
  const handeldel = () => {
    axios.delete(process.env.REACT_APP_POSTDEL, { data })
  }

  const handelsetdeleidsct = (e) => {
    const { name, value } = e.target;
    setdeleidsct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const setdelCate = (e) => {
    setdelcatename(e.target.name)
  }

  const handelclickXocpdbpsimin = () => {
    document.getElementById("Xocpdbpsimin").click()
  }
  

  return (
    <>
      <div className='Xocpdb'>
        <div className='Xocpdbps'>
          <div className='Xocpdbps1s'>
            <div className='Xocpdbpsigbx'>
              <img src={Xocpdb2psim} alt=" " id='Xocpdbpsim' />
              <input type="file" name="" onChange={setXocpdb2psimvalue} id="Xocpdbpsimin" hidden />
              <button onClick={handelclickXocpdbpsimin} id="Xocpdbpsbtn"></button>
            </div>
            <div className='Xocpdbcte'>
              <div>
                1: <input type="checkbox" name="entertainment" id="" onChange={setCate} />
              </div>
              <div>
                2: <input type="checkbox" name="financial" id="" onChange={setCate} />
              </div>
              <div>
                3: <input type="checkbox" name="cooking" id="" onChange={setCate} />
              </div>
              <div>
                4: <input type="checkbox" name="travel" id="" onChange={setCate} />
              </div>
              <div>
                5: <input type="checkbox" name="technology" id="" onChange={setCate} />
              </div>
              <div>
                6: <input type="checkbox" name="randomexplore" id="" onChange={setCate} />
              </div>
            </div>
          </div>
          <div className='Xocpdbps2s'>
            <input type="text" name="ttl" onChange={handelsetidttldissct} />
            <br />
            <textarea name="art" id="" cols="30" rows="10" onChange={handelsetidttldissct}></textarea>
            <br />
            <input type="text" name="sct" onChange={handelsetidttldissct} />
            <button onClick={handleUp} id="Xocpdbpsbtn"></button>
          </div>
        </div>
        <div className='Xocpdbdlsups'>
          <div className='Xocpdbdls'>

            <input type="text" name="delid" onChange={handelsetdeleidsct} />
            <input type="text" name='delsct' onChange={handelsetdeleidsct} />
            <div>
              1:<input type="checkbox" name="entertainment" onChange={setdelCate} id="" />
            </div>
            <div>
              2:<input type="checkbox" name="financial" onChange={setdelCate} id="" />
            </div>
            <div>
              3:<input type="checkbox" name="cooking" onChange={setdelCate} id="" />
            </div>
            <div>
              4:<input type="checkbox" name="travel" onChange={setdelCate} id="" />
            </div>
            <div>
              5:<input type="checkbox" name="technology" onChange={setdelCate} id="" />
            </div>
            <div>
              6:<input type="checkbox" name="randomexplore" onChange={setdelCate} id="" />
            </div>
            <button onClick={handeldel} id="Xocpdbpsbtn" ></button>
          </div>
        </div>
      </div>
      <div>
        <Xocpdb2 />
      </div>
    </>
  )
}
