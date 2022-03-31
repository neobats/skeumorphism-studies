import React from "react"

type Props = {
  resetHandler: (e: React.MouseEvent) => void,
  testHandler: (e: React.MouseEvent) => void
}
export const Buttons: React.FC<Props> = ({ resetHandler, testHandler }) => (
  <article className="bg fl-col infl" id="buttons">
    <button className="reset fl-col infl" onClick={resetHandler}>
      Reset
      <span className="upside-down">Reset</span>
    </button>
    <button className="test fl-col infl" onClick={testHandler}>
      Test
      <span className="upside-down">Test</span>
    </button>
  </article>
)
