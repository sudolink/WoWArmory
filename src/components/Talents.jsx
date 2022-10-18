import { getSkillLineDeets, getSkillLineAbilityDeets, resolveSkillCategory } from "./helper";

export default function Talents(props){
    let abilities = {};
    Object.keys(props.abilities).forEach(item => {
        let spellID = props.abilities[item]['spell'];
        console.log(getSkillLineAbilityDeets(spellID));
    })
    return (
        <div className="Talents">
            {/* {props.abilities != null && abilityElements} */}
        </div>
    )
}