import {useState, useEffect} from "react";
import axios from "axios";
import Talents from "./Talents";
import CharSkills from "./CharSkills";

export default function OtherDetails(props){
    
    const [abilities,setAbilities] = useState(null)
    const [skills,setSkills] = useState(null)

    useEffect( () =>{
        axios.get("/api/v2/getCharSkillLineAbilities", {params: {guid: props.charGUID}})
        .then(re => {
            setAbilities(re.data.abilities);
            setSkills(re.data.skills);
        })
        .catch(err =>{
            console.log(err);
        })
    }, [props.charGUID != undefined])

    return (
        <div className="OtherCharDetails">
            <div className="Talents">
                {abilities != null && <Talents abilities={abilities}/>}
                {skills != null && <CharSkills skills={skills}/>}
            </div>
            <div className="Professions">
                <p>profession placeholder</p>
            </div>
        </div>
    )
}