import { useEffect } from "react";
import {useState} from "react";
import Item from "./Item";
import { nanoid } from "nanoid";

export default function LeftBarEquipment(props){
    // console.log(props.items)    
    const [slots, setSlots] = useState(
        [
            {slotName:"Head", slot: 0, displayOrder:1 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Head`},
            {slotName:"Neck", slot: 1, displayOrder:2 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Neck`},
            {slotName:"Shoulder", slot: 2, displayOrder:3 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shoulder`},
            {slotName:"Back", slot: 14, displayOrder:4 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest`},
            {slotName:"Chest", slot: 4, displayOrder:5 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Chest`},
            {slotName:"Shirt", slot: 3, displayOrder:6 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shirt`},
            {slotName:"Tabard", slot: 18, displayOrder:7 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Tabard`},
            {slotName:"Wrist", slot: 8, displayOrder:8 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Wrists`},
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