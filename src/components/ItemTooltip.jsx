import React, {useState,useEffect,useRef} from "react";
import {resolveBindingText, resolvePlayerClass, resolveInvType, resolveSubClass, resolveStatType, resolveResistType, resolveSkill} from "./helper.js"
import {nanoid} from "nanoid";
import axios from "axios";

const API_URL = import.meta.env.VITE_PROD_ENV === "DEV" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL;

export default function ItemTooltip(props){
    const [dimensions, setDimensions] = useState(()=> {
        return {width:0, height: 0}
    });

    // Object.keys(props.item).map(prop => {
    //     prop.includes("stat_type") ? console.log(prop) : "";
    // })

    const [instance, setInstance] = useState(null);

    const [stats, setStats] = useState(()=>{
        const tempStats = [];
        let statList = []
        Object.keys(props.item).map(prop=>{
            if(prop.includes("stat_type") && props.item[prop] > 0){
                statList.push(props.item[prop]);
            }
        })
        for(let i=0; i<statList.length; i++){
            const statName = resolveStatType(statList[i]);
            const statValue = props.item[`stat_value${i+1}`]// +1 for the list offset, stat_type_{number} table names start with 1, not 0
            // console.log(statName, statValue);
            tempStats.push({
                name : statName,
                val: statValue
            })
        }
        return tempStats;
    })

    const [resistances, setResistances] = useState(()=>{
        const tempResistances = [];
        Object.keys(props.item).map(prop=>{
            if(prop.includes("_res") && props.item[prop] > 0){
                const resName = resolveResistType(prop);
                const resVal = props.item[prop];
                tempResistances.push({
                    name: resName,
                    val: resVal
                });
            }
        })
        return tempResistances;
    })

    const ref = useRef(null);
    useEffect(()=> {
        let xOffset= 0;
        let yOffset= 0;
        setDimensions({
            width: ref.current.offsetWidth + xOffset,
            height: ref.current.offsetHeight + yOffset
        })
    },[ref.current])

    useEffect(()=>{
        // IN PROD, CHECK IF ITEM IS IN LOCAL STORAGE, ELSE PUT RESPONSE INTO LOCAL STORAGE FOR AN HOUR, AND USE THE CACHE IN EVERY ITEM DETAIL REQUEST FOR AN HOUR HENCEFORTH.
        if(!props.empty){
            axios.get(`${API_URL}/api/v2/getItemInstance`,{params: {itemGuid: props.item.item_guid}})
            .then(re => {
                setInstance(re.data);
            })
            .catch(err => {
                console.log(`iteminstance fetch failed => ${err}`);
            })
        }
    }, [props.empty])

    const computedStyle = {
        top:`${
                props.loc.y < window.innerHeight / 4 ? props.loc.y - dimensions.height /2 : props.loc.y - dimensions.height - 10
            }px`, // subtract top dimension, to sticky the
        left:`${
                props.loc.x > window.innerWidth /2 ? (props.loc.x - dimensions.width) - 10 : (props.loc.x + 30)
            }px`                     // bottom left of tooltip to cursor
    }

    //console.log(props.item);

    const [bonding, setBonding] = useState(() => {
        if(!props.empty){
            return resolveBindingText(props.item.bonding);
        }else{
            return null
        }
    })
    const [invType, setInvType] = useState(() => {
        if(!props.empty){
            return resolveInvType(props.item.inventory_type);
        }else{
            return null
        }
    })
    const [subClass, setSubClass] = useState(() => {
        if(!props.empty){
            let tempSub = resolveSubClass(props.item.class, props.item.subclass)
            tempSub = tempSub === "Miscellaneous" ? null : tempSub; //don't show miscellaneous armor category on tooltip
            return [2,4].includes(props.item.class) ? tempSub : null; //only weps and armors
        }else{
            return null
        }
    })

    const itemMisc = (
        <div className="itemMisc">
            <p className="item-level">Item Level {props.item.item_level}</p>
            {bonding && <p className="item-binding">{bonding}</p>}
            {invType && <div className="inventory-type">
                            <p className="item-class">{invType}</p>
                            {subClass && <p className="item-subclass">{subClass}</p>}
                        </div>}
        </div>
    )
    const itemDamage = (
        <>
            <div className="dmgDiv"> 
                <p className="minDmg">{props.item.dmg_min1}</p>
                <p className="dmgSep">{" - "}</p>
                <p className="maxDmg">{`${props.item.dmg_max1} Damage`}</p>
                <p className="speed">{`Speed: ${(props.item.delay/1000).toFixed(2)}`}</p>
            </div>
            <div className="dpsDiv">
                <p className="dps">({((props.item.dmg_min1 + (props.item.dmg_max1 - props.item.dmg_min1)/2) / (props.item.delay/1000)).toFixed(2)} damage per second)</p>
            </div>
        </>
    )

    const statListDiv = (
        <div className="statsDiv">
            {stats.map(stat => {
                let statString = stat.val > 0 ? `+${stat.val}` : `${stat.val}`;
                return (
                    <p key={nanoid()}>{`${statString} ${stat.name}`}</p>
                )
            })}
        </div>
    )

    const resistancesDiv = (
        <div className="resistDiv">
            {resistances.map(resistance => {
                let resistString = resistance.val > 0 ? `+${resistance.val}` : `${resistance.val}`;
                return (
                    <p key={nanoid()}>{`${resistString} ${resistance.name}`}</p>
                )
            })}
        </div>
    )

    // console.log(props.item);
    // console.log(instance?.durability);

    return(
        <div id={props.id} ref={ref} className={`item-tooltip`} style={computedStyle}> 
            <h1 className={`${props.quality} no-outline single-item--name ${!props.empty && "item-tooltip--not-empty"}`}>{props.item.name || props.item.slotName }  </h1>
            {!props.empty ? itemMisc : <p style={{color: "grey"}}>(empty slot)</p>}
            {!props.empty && props?.item?.dmg_min1 > 0 && itemDamage}
            {!props.empty && props?.item?.armor > 0 && <p className="armorAmount">{props.item.armor} Armor</p>}
            {!props.empty && stats.length > 0 && statListDiv}
            {!props.empty && resistances.length > 0 && resistancesDiv}
            {/* {!props.empty && enchants.length > 0 && enchantsDiv} */}
            {!props.empty && props.item.required_level > 0 && <p className="requiredLevel">Requires Level {props.item.required_level}</p>}
            {!props.empty && props.item.required_skill > 0 && <p className="requiredSkill">Requires {resolveSkill(props.item.required_skill)} {props.item.required_skill_rank > 0 ? `(${props.item.required_skill_rank})` : ""}</p>}
            {!props.empty && instance != null && props.item.max_durability > 0 && <p className="durabilityText">{`Durability ${instance.durability} / ${props.item.max_durability}`}</p>}
            {/* {!props.empty && <p className="allowedClass">{"Classes: "}<span className={}>{`${props.item.allowable_class}`}</span></p>} */}
        </div>
    )

}