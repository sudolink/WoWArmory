import { getSkillLineDeets, getSkillLineAbilityDeets, resolveSkillCategory, resolveIconFromSpellEntry } from "./helper";
import {nanoid} from "nanoid";

export default function Talents(props){
    console.log(props);
    const abilitiesEls = Object.keys(props.abilities).map(index =>{
        // console.log(props.abilities[index].name);
        let ability = props.abilities[index];
        console.log(ability);
        let icon = resolveIconFromSpellEntry(ability.entry);
        return (
        <>
            <a className="tempSkill" key={nanoid()} href={`https://classicdb.ch/?spell=${ability.entry}`} target='_blank' rel={`spell=${ability.entry}`}>{ability.name}</a>;
            <img style={{width: '30px'}} src={`/icons_v2/${icon}.png`}/>
        </>
        )
    })
    return (
        <div className="Talents">
            {props.abilities != null && abilitiesEls}
        </div>
    )
}