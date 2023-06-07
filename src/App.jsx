//css
import './App.css'

//react hooks
import { useEffect,useState } from "react";

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

const guessesQty = 3;

function App() {
  
  const [gameStage,setGameStage] = useState(stages[0].name);
  //não precisa do setWords pq ele não mudará
  const [words] = useState(wordsList);

  //variaveis que controlam palavras, categorias e letras
  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters,setLetters] = useState([]);
  //letras adivinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  //letras erradas
  const [wrongLetters,setWrongLetters] = useState([]);
  //chances
  const [guesses,setGuesses] = useState(guessesQty);
  //pontuação
  const [score,setScore] = useState(0);

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
    //limpa todas as letras
    clearLetterStates();
    //pick word,category and letters
    const {word,category} = pickWordAndCategory();
    //quebra word em letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //seta as variaveis
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    
    //muda de pagina
    setGameStage(stages[1].name);
  }

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    //check  if letter has already  been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;      
    }
    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses)=>actualGuesses - 1);

    }
  };

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //check if guesses ended
  useEffect(()=>{
    if(guesses<=0){
      //reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses]);

  //check win condition
  useEffect(()=>{
    //pega as letras em letters e cria um novo array sem repetir letras
    const uniqueLetters = [...new Set(letters)];
    //win condition
    if(guessedLetters.length == uniqueLetters.length){
      //add score
      setScore((actualScore)=>(actualScore += 100));
      //restart the game with new word
      startGame();
    }
  },[guessedLetters]);

  //reinicia o jogo
  const retry = () =>{
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game 
        verifyLetter = {verifyLetter}
        pickedWord = {pickedWord}
        pickedCategory = {pickedCategory}
        letters = {letters}
        guessedLetters = {guessedLetters}
        wrongLetters = {wrongLetters}
        guesses = {guesses}
        score = {score}      
      />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
