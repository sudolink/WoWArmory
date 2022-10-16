import React, {useState,useEffect,useRef} from "react";

export default function ItemTooltip(props){
    const [dimensions, setDimensions] = useState(()=> {
        return {width:0, height: 0}
    });


    const ref = useRef(null);
    useEffect(()=> {
        let xOffset= 0;
        let yOffset= 0;
        setDimensions({
            width: ref.current.offsetWidth + xOffset,
            height: ref.current.offsetHeight + yOffset
        })
    },[ref.current])

    const computedStyle = {
        top:`${
                props.loc.y < window.innerHeight / 4 ? props.loc.y - dimensions.height /2 : props.loc.y - dimensions.height - 10
            }px`, // subtract top dimension, to sticky the
        left:`${
                props.loc.x > window.innerWidth /2 ? (props.loc.x - dimensions.width) - 10 : (props.loc.x + 30)
            }px`                     // bottom left of tooltip to cursor
    } 

    return(
        <div id={props.id} ref={ref} className={`item-tooltip`} style={computedStyle}> 
            <h1 className={`${props.quality} no-outline single-item--name ${!props.empty && "item-tooltip--not-empty"}`}>{props.item.name || props.item.slotName }  </h1>
            <p style={{color: "grey"}}>(empty slot)</p>
        </div>
    )

}