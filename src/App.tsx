import React, { useEffect, useState } from "react"
import "./styles.css"
import { Buttons, Receptacle } from "./components"

// finite state machines for stateful aspects
type LightSquareStates = "off" | "ok" | "err"
type AudioClickStates = "off" | "playingReset" | "playingTest" | "played"
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

  // Effectful stuff

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

  useEffect(() => {
    if (audioClickState === "off") {
      return // don't do anything. Think of this as the recursive base case
    } else if (
      audioClickState === "playingReset" ||
      audioClickState === "playingTest"
    ) {
      console.log(audioClickState) // we don't want to do anything
    } else {
      // played
      // turn the duration back to 0, then set the playing state to off.
      setAudioClickState("off")
    }
  }, [audioClickState])

  return (
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
    </>
  )
}
