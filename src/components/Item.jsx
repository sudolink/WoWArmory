import { nanoid } from "nanoid";
import {useState, useEffect, useRef} from "react";
import ItemTooltip from "./ItemTooltip";
import ItemImage from "./ItemImage";
import NoIcon from "../assets/no_icon_found.png";

export default function Item(props){
    const quality = getQualityClass(props.item.quality);
    const [hoveredOver, setIsHoveredOver] = useState(false);
    const [mousePos, setMousePos] = useState({x:0,y:0});
    const ref = useRef(null);
    const [imgSrc, setImgSrc] = useState(() => {
        return `${import.meta.env.VITE_BACKEND_URL}${props.item.icon}.png`
    });
    
    const onError = (e)=>{ 
        if (e.target.src !== NoIcon){
            setImgSrc(NoIcon);
        }
    }

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
            <ItemImage id={props.id} quality={quality} imgSrc={imgSrc} onError={onError}/>
            {/* <img id={props.id} className={`single-item--img ${quality}`} src={url} onError={replaceImage} /> */}
            {hoveredOver && <ItemTooltip id={nanoid()} item={props.item} loc={mousePos} quality={quality}/>}
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