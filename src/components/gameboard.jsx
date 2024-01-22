import { useState } from "react";

export default function Gameboard({onSelectSquare, board}){


   /*const [playersPlay,setPlayersPlay]=useState(initial);
    function handlexo(rowIndex,columnIndex){
        setPlayersPlay((prevPlay)=>{
            const updatePlay=[...prevPlay.map(initialRow=>[...initialRow])];
            updatePlay[rowIndex][columnIndex]=currentActivePlayer;
            return updatePlay;
        });
        currPlayer();
    }
    */
    return (
    <ol id="game-board">
        {board.map((row,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {row.map((column,columnIndex)=>(
                    <li key={columnIndex}>
                        <button onClick={()=>{onSelectSquare(rowIndex, columnIndex)}} disabled = {board[rowIndex][columnIndex]!=null}>{column}</button>
                    </li>))}
                </ol>
            </li>))}
    </ol>
    )
}