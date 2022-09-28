import React, {useEffect, useState} from "react";

export default function ItemImage(props){

    return (
        // <img className={`single-item--img ${props.quality}`} src={imgSrc? imgSrc : NoIcon} onError={onErr} />
        <img className={`single-item--img ${props.quality}`} src={props.imgSrc} onError={props.onError} />
    )
}