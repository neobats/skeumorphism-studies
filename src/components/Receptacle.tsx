import React from "react"

type Props = {
  lightSquare?: boolean
}
export const Receptacle: React.FC<Props> = ({ lightSquare }) => (
  <section className={`receptacle bg${lightSquare ? " light-square" : ""}`}>
    <div className="prong first"></div>
    <div className="prong small"></div>
    <div className="ground"></div>
  </section>
)
