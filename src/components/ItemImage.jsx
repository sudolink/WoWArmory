import React, {useEffect, useState} from "react";
import NoIcon from "/no_icon_found.png";

export default function ItemImage(props){
    const [imgSrc, setImgSrc] = useState(() => {return NoIcon });
    const [dontRefresh, setDontRefresh] = useState(false);
    
    useEffect( () => {
        props.empty
        ? setImgSrc(props.emptyIcon+".png")
        : setImgSrc(`${import.meta.env.VITE_ICON_DIR}/${props.icon}.png`)
        setDontRefresh(true);
    }, [props && dontRefresh == false])

    const onError = (e) => {    
        setImgSrc(NoIcon);
    }
    return (
        // <img className={`single-item--img ${props.quality}`} src={imgSrc? imgSrc : NoIcon} onError={onErr} />
        <img className={`single-item--img ${props.quality}`} src={imgSrc} onError={onError}/>
    )
}