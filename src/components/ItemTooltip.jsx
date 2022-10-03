import {useState,useEffect,useRef} from "react";

export default function ItemTooltip(props){

    const [dimensions, setDimensions] = useState(()=> {
        return {width:0, height: 0}
    });
    const ref = useRef(null);
    useEffect(()=> {
        setDimensions({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight
        })
    },[ref.current])

    return(
        <div id={props.id}
                ref={ref}
                className={`item-tooltip`} 
                style={
                    {
                        top:`${props.loc.y - dimensions.height }px`, // subtract top dimension, to sticky the
                        left:`${props.loc.x}px`                     // bottom left of tooltip to cursor
                    }
                }
            > 
            <p className={`${props.quality} no-outline`}>{props.item.name}</p>
            <p>display_id: {props.item.display_id}</p>
            <p>in_slot: {props.item._in_slot}</p>
            <p>icon: {props.item.icon}</p>
        </div>
    )

}