import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';
import ItemList from "./components/ItemList";
import PlayerShort from './components/PlayerShort';
import OtherDetails from './components/OtherCharDetails';
import { resolvePlayerFactionForBg } from './components/helper.js';
import { nanoid } from 'nanoid';

const API_URL = import.meta.env.VITE_PROD_ENV === "DEV" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL;

function App() {
  const [apiErr, setApiErr] = useState(null);
  const [charData, setCharData] = useState(null);
  const [charNames, setCharNames] = useState([]);
  const [factionBgHEX, setFactionBgHEX] = useState({inner: "#242424", outer:"#151515"})
  
  const sendQuery = (e,item) => {
    // console.log(e.target,item);
    e.preventDefault();
    queryForChar(item);
  }

  const charList = charNames.map(item => {
    return (
      <div key={nanoid()} onClick={e => sendQuery(e,item)}>
        <a className="notAnActualHref" href={`${item}`}>{`${item}`}</a>
      </div>
    )
  })
  document.body.style['background'] = `radial-gradient(closest-side, ${factionBgHEX.inner}, ${factionBgHEX.outer})`

  function queryForChar(name){
    setCharData(null);
    axios.get(`${API_URL}/api/v2/getCharAndGear`, {params: {name : name}})
    .then(re => {
      setApiErr(null);
      setCharData(re.data);
      setFactionBgHEX(resolvePlayerFactionForBg(re.data.race));
    })
    .catch(err => {
      console.log(err.response.data);
      setApiErr(err.response.data);
    });
  }

  // USE EFFECTS ====================================================================================  

  useEffect( ()=>{ //run on site load
    axios.get(`${API_URL}/api/v1/getAllCharNames`)
    .then(re => {
      setCharNames(Object.values(re.data).map(char => {
        return char.name; //return list of only charnames and store into state
      }));
    })
  },[])

    // RENDERING
    return (
    <div className="App">
      <p className="armoryHeading">Armory</p>
      <Search queryFunc={queryForChar}/>
      <div className="error-box">
        <p>{apiErr}</p>
      </div>
      <h3 style={{padding: '0rem 0rem 1rem 0', color:"pink", fontSize:"x-large"}}>(temp) LIST OF NAMES IN DB</h3>
      <div className='tempCharList'>
        {charList}
      </div>
      {/* <div className="temp">
        <button onClick={()=>{setTempState(prev => !prev)}}>M3</button>
        {tempState && <ModelThree />}
      </div> */}
        {charData != null &&
                <PlayerShort name={charData.name} hrank={charData.honor_highest_rank} level={charData.level} class={charData.class} health={charData.health} race={charData.race} gender={charData.gender}/>
        }
        {/* {JSON.stringify(items)} */}
        {charData != null && <ItemList char={charData}/>}
        
        {charData != null && <OtherDetails charGUID = {charData.guid}/>}
      </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
