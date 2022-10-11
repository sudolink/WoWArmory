import {
    resolvePlayerClass, resolvePlayerRaceToText, resolvePlayerClassToHEX,
    resolvePlayerRank, resolvePlayerFactionForLogo, resolvePlayerPortraitSrc
} from "./helper.js";

export default function PlayerShort(props){
    return (
        <div className="char--quick-info">            
            <div className="quick-partition-char">
                <div className="quick-portrait-box">
                    <img className="quick-portrait" src={resolvePlayerPortraitSrc(props.race,props.gender)}/>
                    <p className="quick-level">{props.level}</p>
                </div>
                <div className="quick-details">
                    <h1 className="quick-name" style={{color:resolvePlayerClassToHEX(props.class)}}>{props.name}</h1>
                    <h4 className="quick-hrank">{resolvePlayerRank(props.hrank)}</h4>
                </div>
            </div>
            <div className="quick-partition-faction">
                <img className="quick--faction-logo" src={resolvePlayerFactionForLogo(props.race)}></img>
            </div>
        </div>
    )
}