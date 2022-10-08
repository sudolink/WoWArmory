import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';
import ItemList from "./components/ItemList";
import ModelThree from './components/Model';

const API_URL = import.meta.env.VITE_PROD_ENV === "DEV" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL;

function App() {
  const [apiErr, setApiErr] = useState(null);
  const [charData, setCharData] = useState(null);
  const [charNames, setCharNames] = useState([]);
  const [tempState, setTempState] = useState(false);

  const charList = charNames.map(item => {
    return (
      ` ${item},`
    )
  })

  function queryForChar(name){
    setCharData(null);
    axios.get(`${API_URL}/api/v2/getCharAndGear`, {params: {name : name}})
    .then(re => {
      setApiErr(null);
      setCharData(re.data);
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
      
      <div className='tempCharList'>
        <u><p>Temp list of names in DB</p></u>
        {charList}
      </div>
      {/* <div className="temp">
        <button onClick={()=>{setTempState(prev => !prev)}}>M3</button>
        {tempState && <ModelThree />}
      </div> */}
      <div className="charSheet">
        {charData != null &&
            <div className="char--quick-info">
                <p className="char--name">{charData.name}</p>
            </div>
        }
        {/* {JSON.stringify(items)} */}
        {charData != null && <ItemList char={charData}/>}
      </div>
    </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
