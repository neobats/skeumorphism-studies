import React, { useEffect, useState } from "react"
import playingReset from "./assets/audio-that-i-literally-recorded-on-my-mac/resetClick.wav"
import playingTest from "./assets/audio-that-i-literally-recorded-on-my-mac/testClick.wav"
import { Buttons, Receptacle } from "./components"
import gfci from "./notes/GFCI.md"
import { Page } from "./pages/Page"
import "./styles.css"

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
  const [isVibrating, setIsVibrating] = useState(false)

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
    const getButton = (cl: string) =>
      document.querySelector("button." + cl) as HTMLButtonElement
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

    const buttons: Array<HTMLButtonElement> = [test, reset]

    const turnOnVibrate = () => setIsVibrating(true)
    const turnOffVibrate = () => setIsVibrating(false)
    buttons.forEach((element) => {
      element.addEventListener("mousedown", turnOnVibrate)
      element.addEventListener("mouseup", turnOffVibrate)
    })

    return () => {
      buttons.forEach((el) => {
        el.removeEventListener("mousedown", turnOnVibrate)
        el.removeEventListener("mouseup", turnOffVibrate)
      })
    }
  }, [tripped])

  useEffect(() => {
    const navigator = window.navigator
    if (!navigator || !navigator.vibrate) {
      // we don't have that mobile support
      return
    }
    if (!isVibrating) {
      // vibrate() returns false if it fails.
      navigator.vibrate(0)
    } else {
      // set a vibrate for 10 seconds that should be stopped on mouseup
      // doesn't handle intensity. might be a way to do that?
      navigator.vibrate(10000)
    }
  }, [isVibrating])

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
    audioElement
      .play()
      .then(() => {
        setAudioClickState("off")

        // Setting the Light Color... After the play starts
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
      })
      .catch((err) => {
        setError(true)
        console.error(err)
      })
  }, [audioClickState, error, tripped])

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
      {notes && <Page source={gfci} closePage={hideNotes} title="GFCI" />}
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
