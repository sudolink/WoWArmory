import { useEffect } from "react";
import {useState} from "react";
import Item from "./Item";
import { nanoid } from "nanoid";

export default function RighBarEquipment(props){
    // console.log(props.items)    
    const [slots, setSlots] = useState(
        [
            {slotName:"Hands", slot: 9, displayOrder:1 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Hands`},
            {slotName:"Waist", slot: 5, displayOrder:2 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Waist`},
            {slotName:"Legs", slot: 6, displayOrder:3 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Legs`},
            {slotName:"Feet", slot: 7, displayOrder:4 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Feet`},
            {slotName:"Ring #1", slot: 10, displayOrder:5 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Finger`},
            {slotName:"Ring #2", slot: 11, displayOrder:6 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Finger`},
            {slotName:"Trinket #1", slot: 12, displayOrder:7 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Trinket`},
            {slotName:"Trinket #2", slot:13, displayOrder:8 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Trinket`},
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
        <div className="char-items--right-bar">
            {allSlots}
        </div>
    )
}