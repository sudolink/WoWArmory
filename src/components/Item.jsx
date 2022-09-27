import { nanoid } from "nanoid";
import {useState, useEffect, useRef} from "react";
import ItemTooltip from "./ItemTooltip";

export default function Item(props){
    //hardcoded for now `${req.protocol}://${req.get('host')}/${requestedName}`
    const url = props.item.icon != undefined ? `http://localhost:5000/${props.item.icon}.png` : "/"
    const quality = getQualityClass(props.item.quality);
    const [hoveredOver, setIsHoveredOver] = useState(false);
    const [mousePos, setMousePos] = useState({x:0,y:0});
    const ref = useRef(null);

    useEffect(()=> {
        const handleHover = e => {
            setIsHoveredOver(true);          
        }

        const handleOut = e => {
            setIsHoveredOver(false);
        }

        const el = ref.current;

        el.addEventListener('mouseover', handleHover);
        el.addEventListener('mouseout', handleOut);

        return () => {
            el.removeEventListener('mouseover', handleHover);
            el.removeEventListener('mouseout', handleOut)
        }

    },[])

    function tooltipFollow(e){
        setMousePos({x:e.pageX, y:e.pageY})
    }

    return (
        <div ref={ref} className="single-item" onMouseMove={e => tooltipFollow(e)}>
            <img id={props.id} className={`single-item--img ${quality}`} src={url} />
            {hoveredOver && <ItemTooltip id={nanoid()} item={props.item} loc={mousePos}/>}
            {/* <p className="single-item--name">{props.item.name}</p> */}
        </div>
    )
}

function getQualityClass(qualityInt){
    let quality;
    switch(qualityInt){
        case 0:
            quality = "quality-poor";
            break;
        case 1:
            quality = "quality-common";
            break; 
        case 2:
            quality = "quality-uncommon";
            break;
        case 3:
            quality = "quality-rare";
            break;
        case 4:
            quality = "quality-epic";
            break;
        case 5:
            quality = "quality-legendary";
            break;
        case 6:
            quality = "quality-artifact";
    }
    return quality;
}