import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';

function App() {
  const [query, setQuery] = useState("character name");
  const [apiErr, setApiErr] = useState(null);
  const [foundChar, setFoundChar] = useState(null);
  const [charEquipment, setCharEquipment] = useState(null);
  const [items, setItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);
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
    .then(re => {
      console.log(re);
      setApiErr(null);
      setFoundChar(re.data);
    })
    .catch(err => {
      console.log(err);
      setApiErr(err.response.data);
    });
  }

  useEffect( ()=>{ //run on site load
    axios.get("api/getAllCharNames")
    .then(re => {
      setCharNames(re.data.map(char => {
        return char.name; //return list of only charnames and store into state
      }));
    })
  },[])

  useEffect( ()=>{ //run whenever a new char obj is stored after response from api
    if (foundChar != null){ //don't request char equipment if character is null (i.e at page load)
      axios.get("api/getCharGear", {params: {guid: foundChar[0].guid}})
      .then(re => {
        setCharEquipment(re.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },[foundChar]);

  function getItemInfoAndStoreToState(item_template){
    let baseItem;
    axios.get("/api/getbaseitem", {params: {item_template: item_template}})
    .then(re => {
      baseItem = re.data[0];
      // console.log(baseItem);
      setItems(oldArr => {
        return [...oldArr, baseItem]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  function getItemIconsAndUpdateItemState(items){
    items.map(item => {
      if(item.icon == undefined){
        axios.get("/api/getitemicon", {params: {display_id: item.display_id}})
        .then(re => {
          setUpdatedItems(oldArr => {
            return [...oldArr, {...item, icon: re.data[0]}]
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    })
  }

  useEffect( ()=> {
    if(items.length != 0){
      getItemIconsAndUpdateItemState(items);
    }
  },[items.length])

  useEffect( ()=> { //run whenever char equipment is fetched and stored to state
    if(charEquipment != null){ //only do when actual data present
      //get item info for all items
      charEquipment.map(item => {
        axios.get("/api/getbaseitem", {params:{item_template: item.item_template}})
        .then(re => {
          // console.log(re.data[0]);
          // console.log(re.data[0].entry);
          getItemInfoAndStoreToState(re.data[0].entry);
        })
        .catch(err =>{
          console.log(err);
        })
      })
    }
  },[charEquipment]);

  return (
    <div className="App">
      <h1>Armory</h1>
      <Search handleChange={handleChange} handleSubmit={handleSubmit} value={query}/>
      <div className="error-box">
        <p>{apiErr}</p>
      </div>
      <div className="charSheet">
        {JSON.stringify(foundChar)}
        {JSON.stringify(items)}
      </div>
    </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
