import React, { useEffect } from "react"
import { MarkdownPage } from "../components"
import { useTitle } from "../hooks/useTitle"
import "./pages.css"

type Props = {
  source: string,
  closePage: () => void,
  title: string
}

export const Page: React.FC<Props> = ({ source, closePage, title}) => {
  useTitle(title)

  useEffect(() => {
    document.querySelector('h1')?.setAttribute("id", title.toLocaleLowerCase())
    document.querySelectorAll('h2, h3, h4').forEach((element) => {
      const ele = element as HTMLHeadingElement // stupid. There's a better way to do this.
      const headingTitle = ele.innerText
      element.setAttribute("id", headingTitle.toLocaleLowerCase())
    })
  }, [])
  return (
    <article className="page">
      <button onClick={closePage} className="btn">
        Close
      </button>
      <MarkdownPage markdownSource={source} />
    </article>
  )
}
