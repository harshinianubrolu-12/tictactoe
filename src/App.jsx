import { useState } from "react";
import Player from "./components/player.jsx";
import Gameboard from "./components/gameboard.jsx";
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";
const initial=[[null,null,null],
[null,null,null],
[null,null,null]];

function gameturns(gturns){
  let currentP="X";
      if(gturns.length!=0 && gturns[0].player==="X"){
        currentP="O";
      }
  return currentP;
}

function App() {
  const [turns,setTurns]=useState([]);
  const [players, setPlayers] = useState({
    'X':'Player 1',
    'O':'Player 2'
  })
  let currentActivePlayer = gameturns(turns);
  
  let gameboard=[...initial.map((initialRow)=>[...initialRow])];
  for (const turn of turns){
      const {square,player}=turn;
      const {row,col}=square;
      gameboard[row][col]=player;

  }
  let winner = null;
  for(const combination of WINNING_COMBINATIONS )
  {
    let firstSquare = gameboard[combination[0].row][combination[0].column]
    let secondSquare = gameboard[combination[1].row][combination[1].column]
    let thirdSquare = gameboard[combination[2].row][combination[2].column]
    if(firstSquare && firstSquare === secondSquare && thirdSquare === firstSquare)
      winner = players[firstSquare]
  }
  let hasDrawn = false
  if(turns.length === 9 && winner===null)
    hasDrawn = true

  function handlexo(rowIndex, columnIndex){
    setTurns((prevTurns)=>{
      let currentP = gameturns(prevTurns)
      const updateTurns=[{square:{row:rowIndex,col:columnIndex},player:currentP},...prevTurns];
      return updateTurns;
    });    
  }

  function handleNameClick(symbol, newName){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  function handleReset()
  {
    setTurns([])
  }

  return(
  <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="player 1" symbol="X" active={currentActivePlayer==='X'} onNameChange = {handleNameClick}/>
        <Player name="player 2" symbol="O" active={currentActivePlayer==='O'} onNameChange = {handleNameClick}/>
      </ol>
      {(winner || hasDrawn) && <GameOver winner = {winner} reset = {handleReset}/>}
      <Gameboard  onSelectSquare={handlexo} board = {gameboard}/>
    </div>
    <Log turns={turns}/>
  </main>
  )}
export default App
