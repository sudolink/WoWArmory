import React from "react";

export default function Search(props){
    // const suggestions = props.allNames.map(name => {
    //     return 
    // });
    return(
        <div className="search_div">
            <form onSubmit={props.handleSubmit}>
                <input id="query" name="query" type="text" onChange={props.handleChange} value={props.query}></input>
            </form>
            <div className="search_div--suggested_results">
                {/* {suggestions} */}
            </div>
        </div>
    )
}