import React, { useEffect, useState, useContext } from 'react'
import "./Style/Xco.css"
import Navbar from './Navbar/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataContext from '../Context'

export default function Catepts() {

    const { Cateptsul, funconcateptsul ,Catetrapts,funconcatetraptsul
         ,Catecokpts,funconcatecokptsul,Catefinpts ,
         funconcatefinptsul,Catetecpts,funconcatetecptsul} = useContext(DataContext);

    const { name } = useParams()

    const [ptsid, setptsid] = useState()
    const [ptsnm, setptsnm] = useState()

    const navigate = useNavigate()

    const clickonlink = (e) => {
        const pid = e.target.id
        const pnm = e.target.name
        setptsid(pid)
        setptsnm(pnm)
    }

    if (ptsid && ptsnm) {
        navigate(`/Posts/${ptsnm}/${ptsid}`)
    }

    const[postcount,setpostcount] = useState(0)
    const[visibility,setvisiblity]= useState(false)
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${process.env.REACT_APP_CATEPTS}/${name}/${postcount}`)
            const cateul = res.data.data
            const UlValues = Object.values(cateul)
            .filter(value => value.hasOwnProperty('Ul'))
            .map(value => value);
            const TTlValues = Object.values(cateul)
            .filter(value => value.hasOwnProperty('res2'))
            .map(value => value.res2);
            const NMValues = Object.values(cateul)
            .filter(value => value.hasOwnProperty('name'))
            .map(value => value.name);
            if(UlValues.length<12){
                setvisiblity(true)
            }
            const combineulttld = UlValues.map((item, index) => ({
                Ul: item.Ul,
                TTl: TTlValues[0][index].ttl,
                id: TTlValues[0][index].id,
                NM: NMValues[index]
            }))

            if(name === "Entertainment"){
                funconcateptsul(combineulttld)
            }
            if(name === "Travel"){
                funconcatetraptsul(combineulttld)
            }
            if(name === "Cooking"){
                funconcatecokptsul(combineulttld)
            }
            if(name === "Financial"){
                funconcatefinptsul(combineulttld)
            }
            if(name === "Technology"){
                funconcatetecptsul(combineulttld)
            }
            
        }
        if(!Cateptsul && name === "Entertainment" || postcount>0 && name === "Entertainment" ){
            fetch()
        }
        if(!Catecokpts && name === "Cooking" || postcount>0 && name === "Cooking"){
            fetch()
        }
        if(!Catetrapts && name === "Travel" || postcount>0 && name === "Travel"){ 
            fetch()
        }
        if(!Catefinpts && name === "Financial" || postcount>0 && name === "Financial"){
            fetch()
        }
        if(!Catetecpts && name === "Technology" || postcount>0 && name === "Technology"){
            fetch()
        }
    },[postcount])

    const [terms,setterms] = useState()
    useEffect(()=>{

    if(Cateptsul && name === "Entertainment"){   
            setterms(Cateptsul)
    }
    if(Catetrapts && name === "Travel"){
            setterms(Catetrapts)
    }
    if(Catecokpts && name === "Cooking"){
            setterms(Catecokpts)
    }
    if(Catefinpts && name === "Financial"){
            setterms(Catefinpts)
    }
    if(Catetecpts && name === "Technology"){
            setterms(Catetecpts)
    }

},[Cateptsul, Catetrapts, Catecokpts, Catefinpts, Catetecpts, name])
    
const setcount =()=>{
    setpostcount(postcount + 12)
}



    return (
        <div className='X'>

            <div >
                <Navbar />
            </div>
            <div className='Xcatefullpg-mnpts' >
                <div className='Xcatefullpg-pts-hedg' style={{ display: "flex", alignItems: 'center', paddingLeft: "10px", }} >
                    <h3>{name}</h3>
                </div>
                <div className='Xcatefullpg-ptsbx' >
                    {terms && terms.map((item => (
                        <div className='Xcate-pts' key={item.id} name={item.NM} id={item.id} onClick={clickonlink} >
                            <div className='Xcate-ptsimg' name={item.NM} id={item.id}>
                                <img src={item.Ul} alt="" name={item.NM} id={item.id} />
                            </div>

                            <div className='Xcate-ptstitle' name={item.NM} id={item.id} >
                                <b name={item.NM} id={item.id}>{item.TTl}</b>
                            </div>

                        </div>
                    )))}
                    <div style={{width:"95%",height:"fit-content", display:"flex",justifyContent:"flex-end",margin:"10px"}}>
                      <button style={{backgroundColor:"cyan",border:"0",padding:"5px",borderRadius:'5px'}} onClick={setcount} hidden={ visibility}>More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
