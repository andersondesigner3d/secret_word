//css
import './App.css'

//react hooks
import { useCallback,useEffect,useState } from "react";

//dados
import {wordsList} from "./data/words";

//components
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver';
import Game from './components/Game';

//estados
const stages = [
  {id: 1 , name: "start"},
  {id: 2 , name: "game"},
  {id: 3 , name: "end"}
]

function App() {
  
  const [gameStage,setGameStage] = useState(stages[0].name);
  //não precisa do setWords pq ele não mudará
  const [words] = useState(wordsList);

  console.log(words);

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  )
}

export default App
