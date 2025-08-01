import { useState } from "react"
import { clsx } from 'clsx';
import data from "./languages.js"
import {getFarewellText, getRandomWord} from "./utils.js"
import Confetti from "react-confetti"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState(new Set())
    const [recentLetter, setRecentLetter] = useState("");

    let wrongGuessCount = guessedLetters.size;
    currentWord.split('').forEach((letter) => {
      if(guessedLetters.has(letter)){
        wrongGuessCount -= 1;
      }
    })

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    let languages = data.map((language, i) => {
      const styles = {
        backgroundColor: language.backgroundColor,
        color: language.color
      }

      return (
        <span 
          className={i < wrongGuessCount ? "chip lost" : "chip"} 
          style={styles}
          key={language.name}
        >
          {language.name}
        </span>
      )
    })
    const isGameWon = currentWord.split('').every(letter => guessedLetters.has(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost

    const displayLetters = currentWord.split('').map((letter, i) => {
      let showLetter = false;
      if(guessedLetters.has(letter) || isGameLost){
        showLetter = true
      }

      const letterClassName = clsx(
        isGameLost && !guessedLetters.has(letter) && "missed-letter"
      )

      return (
        <span key={i} className={letterClassName}>
          {showLetter ? letter.toUpperCase() : ""}
        </span>
      )
    })

    function addToGuessedLetters(letter) {
      setGuessedLetters((prev) => {
        const newSet = new Set(prev)
        newSet.add(letter)
        return newSet
      })

      setRecentLetter(letter)
    }

    const keyboard = alphabet.split('').map((letter, i) => {
      const isGuessed = guessedLetters.has(letter)
      const isCorrect = isGuessed && currentWord.includes(letter)

      const className = clsx({
        correct: isCorrect,
        wrong: isGuessed && !isCorrect
      })

      return (
        <button 
          onClick={() => addToGuessedLetters(letter)} 
          key={i}
          className={className}
          disabled={isGameOver}
        >
          {letter.toUpperCase() }
        </button>
      )
    })

    const gameStatusClass = clsx("game-status", {
      won: isGameWon, 
      lost: isGameLost, 
      progress: !isGameOver && !currentWord.includes(recentLetter)
    })

    function renderGameStatus() {
        if (!isGameOver) {
            return !currentWord.includes(recentLetter) ? (
              <h2>{getFarewellText(data[wrongGuessCount-1]?.name)}</h2>
            ) : (
              null
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    function resetGame() {
      setCurrentWord(getRandomWord())
      setGuessedLetters(new Set())
      setRecentLetter("")
    }

    return (
        <main>
            {isGameWon && <Confetti />}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>

            <section className="language-chips">
              {languages}
            </section>

            <section className="word">
              {displayLetters}
            </section>

            <section className="keyboard">
              {keyboard}
            </section>
            {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
        </main>
    )
}
