import "./Game.css";
import { useState, useRef } from "react";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {

  //recebe a letra digitada
  const [letter,setLetter] = useState("");
  //captura a referencia do input text
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    //limpa a letter
    setLetter("");

    //após digitar volta pro input
    letterInputRef.current.focus();
  } 

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa{guesses>1? "s" : null}.</p>
      <div className="wordContainer">
        {letters.map((letter,i) => 
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
            {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" name="letter" required maxLength="1" 
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}
          autoFocus
           />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>

        {wrongLetters.length === 0? (<span>Não errou nenhuma letra ainda.</span>) : (

          wrongLetters.map((letter,i) => (
            <span key={i}>{letter}, </span>
          ))

        )}
        
      </div>
    </div>
  )
}

export default Game