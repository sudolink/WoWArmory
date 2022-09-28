import React from "react";
import Item from "./Item";
import {nanoid} from "nanoid";
import DummyChar from "../assets/dummychar.png";

export default function ItemList(props){
    let [leftBar, charDisplay, rightBar, bottomBar] = [[],null,[],[]];
    props.equipment.map(item=> {
        //console.log(item);
        // left bar slots top to bottom =>      [0,1,2,14,4,3,18,8]
        // right bar slots top to bottom =>     [9,5,6,7,10,11,12,13]
        // bottom bar slots left to right =>    [15,16,17]
        let newId = nanoid()
        if([0,1,2,14,4,3,18,8].includes(item._in_slot)){ //belongs to left bar
            leftBar.push
            (
                <Item key={newId} id={nanoid()} item={item}/>
            );
        }else if([9,5,6,7,10,11,12,13].includes(item._in_slot)){ //belongs to right bar
            rightBar.push
            (
                <Item key={newId} id={nanoid()} item={item}/>
            );
        }else if([15,16,17].includes(item._in_slot)){ //belongs to bottom bar
            bottomBar.push
            (
                <Item key={newId} id={nanoid()} item={item}/>
            );
        }else{
            console.log("!UNHANDLED EDGE CASE IN ITEMLIST COMPONENT! slot -> "+item._in_slot);
        }
    })
    return (
        <div className="char-items">
            <div className="char-items--top">
                <div className="char-items--left-bar">
                    {leftBar}
                </div>
                <div className="char-items--char-display">
                    <p>char here</p>
                    <img src={DummyChar}/>
                </div>
                <div className="char-items--right-bar">
                    {rightBar}
                </div>
            </div>
            <div className="char-items--bottom">
                <div className="char-items--bottom-bar">
                    {bottomBar}
                </div>
            </div>
        </div>
    )
}