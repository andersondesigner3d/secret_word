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

  //variaveis que controlam palavras, categorias e letras
  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters,setLetters] = useState([]);

  //função que sorteia palavra e categoria 
  const pickWordAndCategory  = () =>{
    //cria array com todas categorias usando as keys do objeto words
    const categories = Object.keys(words);
    //sorteia no array uma categoria
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //sorteia palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    //retorna em forma de objeto
    return {word,category};
  }

  //starts secret word game
  const startGame = () =>{
    //pick word,category and letters
    const {word,category} = pickWordAndCategory();
    //quebra word em letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(category+" "+word+" "+wordLetters);

    //seta as variaveis
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);
    
    //muda de pagina
    setGameStage(stages[1].name);
  }

  //process the letter input
  const verifyLetter = () =>{
    setGameStage(stages[2].name);
  }

  //reinicia o jogo
  const retry = () =>{
    setGameStage(stages[0].name);
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  )
}

export default App
