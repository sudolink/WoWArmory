import React from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import BottomBar from "./BottomBar";
import { nanoid } from "nanoid";
import { resolvePlayerFactionForLogo } from "./helper";

export default function ItemList(props){
    const equipment = props.char.equipment;
    let [leftBar, charDisplay, rightBar, bottomBar] = [[],null,[],[]];
    equipment.map(item=> {
        if([0,1,2,14,4,3,18,8].includes(item.slot)){ //belongs to left bar
            leftBar.push(item);
        }else if([9,5,6,7,10,11,12,13].includes(item.slot)){ //belongs to right bar
            rightBar.push(item);
        }else if([15,16,17].includes(item.slot)){ //belongs to bottom bar
            bottomBar.push(item);
        }else{
            console.log("!UNHANDLED EDGE CASE IN ITEMLIST COMPONENT! slot -> "+item.slot);
        }
    })
    return (
        <div className="char-items">
            <div className="char--display">
                <img className="char--faction-logo" src={resolvePlayerFactionForLogo(props.char.race)}></img>
            </div>
            <div className="char--display-overlay">
                <div className="topBars">
                    <LeftBar items={leftBar}/>
                    <RightBar items={rightBar}/>
                </div>
                <div className="bottomBar">
                    <BottomBar items={bottomBar} />
                </div>
            </div>
        </div>
    )
}