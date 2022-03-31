import React from "react"
import { MarkdownPage } from "../components"
import "./pages.css"

type Props = {
  source: string,
  closePage: () => void
}

export const Page: React.FC<Props> = ({ source, closePage }) => {
  return (
    <article className="page">
      <button onClick={closePage} className="btn">
        Close
      </button>
      <MarkdownPage markdownSource={source} />
    </article>
  )
}
