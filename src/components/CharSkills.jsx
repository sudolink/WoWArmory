import { getSkillLineDeets, resolveSkillCategory } from "./helper";

export default function CharSkills(props){
    let profs = {};
    const skillElements = Object.keys(props.skills).map(skill => {
        // 'skill' is guid of skill, 'guid' is the player, 'max' is max possible skill, 'value' is actual skill
        let currentSkill = props.skills[skill]
        let skillGUID = currentSkill['skill'];
        let skillPoints = currentSkill['value']
        let maxPoints = currentSkill['max']
        let [skillName,catID]= getSkillLineDeets(skillGUID);
        let skillCat = resolveSkillCategory(catID);
        let skillObj = {name: skillName, points: skillPoints, maxPoints: maxPoints, GUID: skillGUID};
        if(profs.hasOwnProperty(skillCat)){
            profs[skillCat] = [...profs[skillCat], skillObj];
        }else{
            profs[skillCat] = [skillObj];
        }
    })
    
    const tempSkillElements = Object.keys(profs).map(category => {
        return (
            <div key={category} className="tempCat">
                <h2>{category}</h2>
                <div className="catList">
                    {profs[category].map(skill => {
                        return (
                                <p key={skill.GUID}>{`${skill.name} ${skill.points}/${skill.maxPoints}`}</p>
                            )
                        })
                    }
                </div>
            </div>
        )
    })
    return (
        <>
            {props.skills != null && tempSkillElements}
        </>
    )
}