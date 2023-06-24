import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Loading from '../../Assests/Loading.gif'
export default function Search(props) {

    const [Combineddata, setCombineddata] = useState([])

    const srchV = props.searchValue

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

    
   useEffect(()=>{

       const fetch = async () => {
           const res = await axios.post(process.env.REACT_APP_SCRHGET, { srchV })
        const UlValues = Object.values(res.data)
            .filter(value => value.hasOwnProperty('Ul'))
            .map(value => value);

        const NMValues = Object.values(res.data)
            .filter(value => value.hasOwnProperty('name'))
            .map(value => value);

        const IDValues = Object.values(res.data)
            .filter(value => value.hasOwnProperty(process.env.REACT_APP_DB_FLD_XARTID))
            .map(value => value);

        const TTLValues = Object.values(res.data)
            .filter(value => value.hasOwnProperty('TTl'))
            .map(value => value);

        const combinedata = UlValues.map((item, index) => ({
            UL: item,
            NM: NMValues[index],
            ID: IDValues[index], 
            TTL: TTLValues[index]
        }))
        
        setCombineddata(combinedata)

    }
    
    fetch()
    
},[srchV]) 
    
const [loadingstate,setloadingstate]=useState(false)
var i = 1
const setloading = ()=>{
    if(i===1){
        console.log('hello');
        setloadingstate(true)
    }
    i ++
}

    return (
        <div className='X'>
            <div style={{ backgroundColor: "white", backfaceVisibility: "hidden", display: "flex", alignItems: 'center', paddingLeft: "10px" }}> <div className='Xcatefullpg-pts-hedg' >
                    <h2>Results for :'{srchV}'</h2>
                </div></div>
            <div className='Xcatefullpg-mnpts' style={{ backgroundColor: "white", backfaceVisibility: "hidden" }} >
               <div><div style={{margin:'auto',width:"50px"}}><img src={Loading} alt="" height={'50px'} hidden={loadingstate} /></div></div>
                <div className='Xcatefullpg-ptsbx' >
                    {Combineddata && Combineddata.map((item =>(

                        <div className='Xcate-pts' key={item.ID.id} id={item.ID.id} name={item.NM.name} onClick={clickonlink} onLoad={setloading} >
                            <div className='Xcate-ptsimg' id={item.ID.id} name={item.NM.name} >
                                <img src={item.UL.Ul} alt="" id={item.ID.id} name={item.NM.name}  />
                            </div>

                            <div className='Xcate-ptstitle' id={item.ID.id} name={item.NM.name} >
                                <b name={item.NM.name} id={item.ID.id}> {item.TTL.TTl}</b>
                            </div>

                        </div>
                    )))}

                </div>

            </div>
        </div>
    )
}
