import axios from "axios";
import React, {useEffect, useState} from "react";
import NoIcon from "../assets/no_icon_found.png";

export default function ItemImage(props){
    const [imgSrc, setImgSrc] = useState(() => { return props.src || NoIcon });

    return (
        // <img className={`single-item--img ${props.quality}`} src={imgSrc? imgSrc : NoIcon} onError={onErr} />
        <img className={`single-item--img ${props.quality}`} src={imgSrc}/>
    )
}