import React from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import BottomBar from "./BottomBar";
import DummyChar from "/dummychar.png"

export default function ItemList(props){
    let [leftBar, charDisplay, rightBar, bottomBar] = [[],null,[],[]];
    props.equipment.map(item=> {
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
            <div className="char-items--top">
                <LeftBar items={leftBar}/>
                <div className="char-items--char-display">
                    <p>char here</p>
                    <img src={DummyChar}/>
                </div>
                <RightBar items={rightBar}/>
            </div>
            <div className="char-items--bottom">
                <BottomBar items={bottomBar} />
            </div>
        </div>
    )
}