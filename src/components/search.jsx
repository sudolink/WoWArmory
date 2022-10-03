import React, {useState} from "react";

export default function Search(props){
    // const suggestions = props.allNames.map(name => {
    //     return 
    // });
    
    const [query, setQuery] = useState("");

    function checkInputValid(inp){
        return inp != undefined && inp.length <= 12 && inp.length >= 1;
      }
    
    function handleChange(e){
        setQuery(e.target.value);
      }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(query);
        //check input here no numbers, no special chars, no spaces, length limit...
        //should maybe check for input validity during statechanges and color input red if invalid chars are detected
        if(checkInputValid(query)){
            props.queryFunc(query);
        }
    }   

    return(
        <div className="search-div">
            <form onSubmit={handleSubmit}>
                <input id="query" name="query" type="text" onChange={handleChange} value={query}></input>
            </form>
            <div className="search-div--suggested_results">
                {/* {suggestions} */}
            </div>
        </div>
    )
}