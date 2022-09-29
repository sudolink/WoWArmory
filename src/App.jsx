import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Search from './components/search';
import ItemList from "./components/ItemList";

function App() {
  const [query, setQuery] = useState("character name");
  const [apiErr, setApiErr] = useState(null);
  const [foundChar, setFoundChar] = useState(null);
  const [charEquipment, setCharEquipment] = useState([]);
  const [itemCount, setItemCount] = useState(null); //for firing item get requests only when equipment is loaded.
  const [items, setItems] = useState([]);
  const [itemRequestCount, setItemRequestCount] = useState(0) //for firing item icon requests only when item get requests are done
  const [iconRequestCount, setIconRequestCount] = useState(0);
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
      setApiErr(null);
      setFoundChar(re.data);
    })
    .catch(err => {
      console.log(err.response.data);
      setApiErr(err.response.data);
    });
  }

  function resetCharData(){
    setCharEquipment([]); //reset equipment ids
    setItems([]); //reset equipment list
    setItemCount(null);
    setItemRequestCount(0);
    setIconRequestCount(0);
  }

  function getItemInfoAndStoreToState(item){
    let baseItem;
    axios.get("/api/getbaseitem", {params: {item_template: item.item_template}})
    .then(re => {
      let reItem = re.data[0];
      if(reItem){ //api sends back an object of item props
        if(reItem.inventory_type != 0){ //disregard unequipabble items unequippable items.
          baseItem = {
            ...reItem,
            _in_slot: item.slot,
            _item_instance: item.item
          };
          setItems(oldArr => {
            return [...oldArr, baseItem]
          })
          setItemRequestCount(prev => prev + 1); //icon getter useffect conditional
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  function getAndSetIconName(item_display_id){
    axios.get("/api/getitemicon", {params : {display_id: item_display_id}})
    .then( re =>{
      setItems(prevArr => {
        return Object.values(prevArr).map(item => {
          if (item_display_id == item.display_id){
            return {...item, icon: re.data[0].icon}
          }else{
            return item
          }
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // USE EFFECTS ====================================================================================  

  useEffect( ()=>{ //run on site load
    axios.get("api/getAllCharNames")
    .then(re => {
      setCharNames(Object.values(re.data).map(char => {
        return char.name; //return list of only charnames and store into state
      }));
    })
  },[])

  useEffect( ()=>{ //run whenever a new char obj is stored after response from api
    if (foundChar != null){ //don't request char equipment if character is null (i.e at page load)
      resetCharData();
      axios.get("api/getCharGear", {params: {guid: foundChar[0].guid}})
      .then(re => {// re.data == array
        setCharEquipment(Object.values(re.data));
        setItemCount(re.data.length);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },[foundChar]);

  
  useEffect( ()=> { //run whenever char equipment is fetched and stored to state
    if(charEquipment.length > 0){ //only do when actual data present
      //get item info for all items
      Object.values(charEquipment).map(item => {
        getItemInfoAndStoreToState(item);
        console.log(itemCount, itemRequestCount)
      })
    }},[charEquipment.length == itemCount]);
    
    useEffect( ()=> {
      if(items.length >= 1){
        Object.values(items).map(item => {
          if (item.icon == undefined && item.display_id != undefined){
            getAndSetIconName(item.display_id);
          }
        })
      }
    },[itemRequestCount == itemCount && itemRequestCount]);


    // RENDERING


    return (
      <div className="App">
      <h1>Armory</h1>
      <Search handleChange={handleChange} handleSubmit={handleSubmit} value={query}/>
      <div className="error-box">
        <p>{apiErr}</p>
      </div>
      <div className="charSheet">
        {foundChar != null ? JSON.stringify(foundChar) : ""}
        {/* {JSON.stringify(items)} */}
        {foundChar != null && <ItemList equipment={items}/>}
      </div>
    </div>
  )
}
//DISABLE REACT STRICT MODE IN INDEX TO STOP THE DOUBLE-LOGGING
export default App
