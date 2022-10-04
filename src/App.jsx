import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';
import ItemList from "./components/ItemList";

const API_URL = import.meta.env.VITE_PROD_END === "DEV" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL;


function App() {
  const [apiErr, setApiErr] = useState(null);
  const [charData, setCharData] = useState(null);
  const [charNames, setCharNames] = useState([]);

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
      <h1>Armory</h1>
      <Search queryFunc={queryForChar}/>
      <div className="error-box">
        <p>{apiErr}</p>
      </div>
      <div className="charSheet">
        {charData != null ? JSON.stringify(charData.name) : ""}
        {/* {JSON.stringify(items)} */}
        {charData != null && <ItemList equipment={charData.equipment}/>}
      </div>
    </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
