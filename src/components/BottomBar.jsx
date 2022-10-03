import { useEffect } from "react";
import {useState} from "react";
import Item from "./Item";
import { nanoid } from "nanoid";

export default function BottomBarEquipment  (props){
    // console.log(props.items)    
    const [slots, setSlots] = useState(
        [
            {slotName:"Main Hand", slot: 15, displayOrder:1 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Head`},
            {slotName:"Off Hand", slot: 16, displayOrder:2 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Neck`},
            {slotName:"Ranged", slot: 17, displayOrder:3 ,emptyIcon: `${import.meta.env.VITE_EMPTY_SLOT_DIR}/UI-PaperDoll-Slot-Shoulder`},
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
        <div className="char-items--bottom-bar">
            {allSlots}
        </div>
    )
}