import { useEffect } from "react";
import {useState} from "react";

export default function LeftBarEquipment(props){
    const [slots, setSlots] = useState(
        {
            0 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Head.png`},
            1 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Neck.png`},
            2 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shoulder.png`},
            14 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest.png`},
            4 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest.png`},
            3 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shirt.png`},
            18 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Tabard.png`},
            8 : {emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Wrists.png`},
        })
    useEffect(()=> {
        
    },[props])
}