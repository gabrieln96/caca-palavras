//CSS
import './App.css';

//React
import {useCallback, useEffect, useState} from 'react';

//Data
import {wordsList} from "./data/words";

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

const guessesQdt = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState ("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQdt)
  const [score, setScore] = useState(0)



  //escolhendo categoria aleatoria
  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = 
    categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category);

  //escolhendo palavra aleatoria
  const word = 
  words[category][Math.floor(Math.random() * words[category].length)]

  console.log(word)

  return{word, category}
  }

 // Start no Game 
  const startGame = () => {
    // escolher palavra e escoler categoria
    const {word, category} = pickWordAndCategory();


    //criando o array de letras

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    console.log(wordLetters);
    console.log(word, category);

    //setando os estado
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    setGameStage(stages[1].name);
  };

// Process the letter input
const verifyLetter = (letter) => {
  
  const normalizedLetter = letter.toLowerCase()

  if(
    guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)
  ) {
    return;
  }

  if(letters.includes(normalizedLetter)) {
    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters,
      normalizedLetter
    ]);
  } else {
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter
    ]);

    setGuesses((actualGuesses) => actualGuesses -1);
    
  };
}

const clearLetterStates = () => {
  setGuessedLetters([]);
  setWrongLetters([]);
};

  useEffect(() => {

    if(guesses <= 0){
      clearLetterStates();
      setGameStage(stages[2].name);
    }

  }, [guesses]);


// restart the game
const retry = () => {
  setScore(0);
  setGuesses(guessesQdt);


  setGameStage(stages[0].name);
}

  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen startGame={startGame}/>}
     {gameStage === 'game' && <Game 
     verifyLetter={verifyLetter} 
     pickedWord={pickedWord} 
     pickedCategory={pickedCategory} 
     letters={letters} 
     guessedLetters={guessedLetters} 
     wrongLetters={wrongLetters} 
     guesses={guesses} 
     score={score} />}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
