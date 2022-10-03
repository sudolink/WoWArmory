import { useEffect } from "react";
import {useState} from "react";
import Item from "./Item";
import { nanoid } from "nanoid";

export default function LeftBarEquipment(props){
    // console.log(props.items)    
    const [slots, setSlots] = useState(
        [
            {slot: 0, displayOrder:1 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Head`},
            {slot: 1, displayOrder:2 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Neck`},
            {slot: 2, displayOrder:3 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shoulder`},
            {slot: 14, displayOrder:4 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest`},
            {slot: 4, displayOrder:5 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest`},
            {slot: 3, displayOrder:6 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shirt`},
            {slot: 18, displayOrder:7 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Tabard`},
            {slot: 8, displayOrder:8 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Wrists`},
        ])

    useEffect(()=> {
        props.items.map(item => {
            setSlots(prevSlotArr => {
                return prevSlotArr.map(slotObj => {
                    if(item.slot == slotObj.slot){
                        return {
                            ...slotObj,
                            ...item
                        }   
                    }else{
                        return slotObj
                    }
                })
            });
        })
    },[props])

    const allSlots = slots.map(slot => {
        let newId = nanoid()
        return <Item key={newId} item={slot}/>
    })

    return (
        <div className="char-items--left-bar">
            {allSlots}
        </div>
    )
}