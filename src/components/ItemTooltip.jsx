import {useState,useEffect,useRef} from "react";
import {resolveBindingText, resolveInvType, resolveSubClass} from "./ItemHelper.js"

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

    console.log(props.item);

    const [bonding, setBonding] = useState(() => {
        if(!props.empty){
            return resolveBindingText(props.item.bonding);
        }else{
            return null
        }
    })
    const [invType, setInvType] = useState(() => {
        if(!props.empty){
            return resolveInvType(props.item.inventory_type);
        }else{
            return null
        }
    })
    const [subClass, setSubClass] = useState(() => {
        if(!props.empty){
            return [2,4].includes(props.item.class) && props.item.subclass != 0 ? resolveSubClass(props.item.class, props.item.subclass) : null; //only weps and armors
        }else{
            return null
        }
    })

    const itemMisc = (
        <div>
            <p className="item-level">Item Level {props.item.item_level}</p>
            {bonding && <p className="item-binding">{bonding}</p>}
            {invType && <div className="inventory-type">
                                        <p className="item-class">{invType}</p>
                                        {subClass && <p className="item-subclass">{subClass}</p>}
                                    </div>}
        </div>
    )

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
            <p className={`${props.quality} no-outline single-item--name ${!props.empty && "item-tooltip--not-empty"}`}>{props.item.name || props.item.slotName }  </p>
            {!props.empty ? itemMisc : <p style={{color: "grey"}}>(empty slot)</p>}
        </div>
    )

}