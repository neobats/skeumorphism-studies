import React, { useEffect, useState } from "react"
import "./styles.css"
import gfci from "./notes/GFCI.md"
import playingReset from "./assets/audio-that-i-literally-recorded-on-my-mac/resetClick.wav"
import playingTest from "./assets/audio-that-i-literally-recorded-on-my-mac/testClick.wav"
import { Buttons, Receptacle } from "./components"
import { Page } from "./pages/Page"

// finite state machines for stateful aspects
type LightSquareStates = "off" | "ok" | "err"
type AudioClickStates = "off" | "playingReset" | "playingTest"
const LIGHT_SQUARE_COLORS = {
  off: "#000",
  ok: "rgba(0, 255, 0, 0.8)",
  err: "#F00"
}
export default function App() {
  const [tripped, setTripped] = useState(true)
  const [error, setError] = useState(false)
  const [audioClickState, setAudioClickState] = useState<AudioClickStates>(
    "off"
  )
  const [notes, setShowNotes] = useState(false)

  // HANDLERS
  const handleLightSquareColorChange = (element: HTMLElement) => (
    state: LightSquareStates
  ) => {
    const color = LIGHT_SQUARE_COLORS[state]
    element.style.setProperty("--light-square-color", color)
  }
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault()
    // if we aren't tripped, hitting the reset button shouldn't do anything.
    if (!tripped) {
      return
    }
    // but if we are tripped, then we should make sure we
    setTripped(false)
    setAudioClickState("playingReset")
  }

  const handleTest = (e: React.MouseEvent) => {
    e.preventDefault()
    // if we aren't tripped, we set the internal breaker
    // so that power flows through. This means we play the sound
    // however, if we're already tripped, the sound has already been played
    // and we won't do anything, really.
    if (!tripped) {
      setTripped(true)
      setAudioClickState("playingTest")
    } else {
      setAudioClickState("off")
    }
  }

  const showNotes = () => {
    setShowNotes(true)
  }
  const hideNotes = () => {
    setShowNotes(false)
  }

  // Effectful stuff
  useEffect(() => {
    const getButton = (cl: string) => document.querySelector("button." + cl)
    const test = getButton("test")
    const reset = getButton("reset")

    if (tripped) {
      // will run on initial load, FYI
      test?.classList.add("on")
      test?.classList.remove("off")
      reset?.classList.add("off")
      reset?.classList.remove("on")
    } else {
      reset?.classList.add("on")
      reset?.classList.remove("off")
      test?.classList.add("off")
      test?.classList.remove("on")
    }
  }, [tripped])

  // Setting the Square Color
  useEffect(() => {
    const root = document.documentElement
    if (!root) {
      return
    }
    const setSquareColor = handleLightSquareColorChange(root)
    if (tripped) {
      setSquareColor("off")
      return
    }
    if (error) {
      setSquareColor("err")
      return
    }
    setSquareColor("ok")
    return
  }, [tripped, error])

  // Handling the Audio
  useEffect(() => {
    if (audioClickState === "off") {
      return // don't do anything. Think of this as the recursive base case
    }
    // this re-runs and we're now "playing", so we want to
    // actually play the audio file here.
    const audioElement: HTMLMediaElement | null = document.querySelector(
      `#${audioClickState}`
    )
    if (!audioElement) {
      setError(true)
      console.error(
        "encountered an error playing the audio for",
        audioClickState
      )
      setAudioClickState("off")
      return
    }
    audioElement.play().then(() => {
      setAudioClickState("off")
    })
  }, [audioClickState])

  return (
    <div className="App">
      {!notes && (
        <>
          <div className="outer">
            <hr />

            <main className="fl-col bg">
              <Receptacle />
              <Buttons testHandler={handleTest} resetHandler={handleReset} />
              <Receptacle lightSquare />
            </main>
          </div>
          <article className="instructions">
            <h1>Skeumorphism and UX</h1>
            <p>
              Make sure you have sound on{" "}
              <span role="img" aria-label="smile">
                🙂
              </span>
            </p>
          </article>
          <article className="instructions bottom">
            <p> Checkout the notes for this </p>
            <button onClick={showNotes} className="btn">
              Show Notes
            </button>
          </article>
        </>
      )}
      {notes && <Page source={gfci} closePage={hideNotes} />}
      <audio
        src={playingReset}
        preload="auto"
        aria-label="reset click sound"
        id="playingReset"
      >
        Well, this is awkward. Your browser does not seem to handle audio. You
        can try
        <a href={playingReset}>this link</a>
        to hear the click instead.
      </audio>
      <audio
        src={playingTest}
        preload="auto"
        aria-label="test click sound"
        id="playingTest"
      >
        Well, this is awkward. Your browser does not seem to handle audio. You
        can try
        <a href={playingTest}>this link</a>
        to hear the click instead.
      </audio>
    </div>
  )
}
