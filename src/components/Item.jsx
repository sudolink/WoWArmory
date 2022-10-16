import {useState, useEffect, useRef} from "react";
import ItemTooltip from "./ItemTooltip";
import ItemImage from "./ItemImage";

const WOWPATCH = import.meta.env.VITE_WOWDBPHASE;

export default function Item(props){
    const quality = getQualityClass(props.item.quality);
    const [hoveredOver, setIsHoveredOver] = useState(false);
    const [mousePos, setMousePos] = useState({x:0,y:0});
    const [empty, setEmpty] = useState(false);
    const ref = useRef(null);
    
    const [itemID, setItemID] = useState(()=> {
        return props?.item?.item_id || 0
    });
    const [patch, setPatch] = useState(()=> {
        return props?.patch || null
    })

    useEffect( ()=> {
        props.item.icon ? setEmpty(false) : setEmpty(true);
    },[props])
    
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
        setMousePos({x:e.clientX, y:e.clientY})
    }

    const tooltip = 
        empty == false
        ?
        <a href={`https://classicdb.ch/?item=${itemID}`+`${patch != null ? "-"+patch : ""}`} target='_blank' rel={`item=${itemID}`}>
            <ItemImage id={props.id} quality={quality} icon={props.item.icon} emptyIcon={props.item.emptyIcon} empty={empty}/>
        </a>
        :
        <>
        <ItemImage id={props.id} quality={quality} icon={props.item.icon} emptyIcon={props.item.emptyIcon} empty={empty}/>
        {hoveredOver && <ItemTooltip item={props.item} loc={mousePos} quality={quality} empty={empty}/>}
        </>

    return (
        <div ref={ref} className="single-item" onMouseMove={e => tooltipFollow(e)}>
            {tooltip}
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