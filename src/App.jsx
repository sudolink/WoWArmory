import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';

function App() {
  const [query, setQuery] = useState("character name");
  const [apiErr, setApiErr] = useState(null);
  const [queryRe, setQueryRe] = useState(null);
  const [charNames, setCharNames] = useState([]);

  function handleChange(e){
    setQuery(e.target.value);
  }

  function checkInputValid(inp){
    return inp != undefined && inp.length <= 12 && inp.length >= 1;
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(query);
    //check input here no numbers, no special chars, no spaces, length limit...
    //should maybe check for input validity during statechanges and color input red if invalid chars are detected
    if(checkInputValid(query)){
      queryForChar(query);
    }
  }

  function queryForChar(name){

    axios.get("api/getchar", {params: {name : name}})
    .then(re => console.log(re))
    .catch(err => {
      console.log(err);
      setApiErr(err.response);
    });
  }

  useEffect( ()=>{
    axios.get("api/getAllCharNames")
    .then(re => {
      setCharNames(re.data.map(char => {
        return char.name; //return list of only charnames and store into state
      }));
    })
  },[])

  return (
    <div className="App">
      <h1>Armory</h1>
      <Search handleChange={handleChange} handleSubmit={handleSubmit} value={query}/>
      <div className="error-box">
        {apiErr != null ? <p>{apiErr}</p> : <p>
          </p>}
      </div>
    </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
