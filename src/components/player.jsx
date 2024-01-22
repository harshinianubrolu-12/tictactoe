import { useState } from "react";
export default function Player({name, symbol, active, onNameChange}){
    const [isEditing,setIsEditing]=useState(false);
    const [editPlayer,setEditPlayer]=useState(name);
    function handleClick(){
        setIsEditing(editing=>!editing);
        if(isEditing){
            onNameChange(symbol, editPlayer);
        }
    }
    function handleChange(event){
        setEditPlayer(event.target.value);
    }
    let click="Edit";
    let playerName=<span className="player-name">{editPlayer}</span>;
    if(isEditing){
        playerName=<input type="text" required value={editPlayer} onChange={handleChange}/>;
        click="Save";
    }

    return(
        <li className = { active? "active": undefined}>
            <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleClick}>{click}</button>
            </span>
        </li>
    )
}