import React, { useEffect, useRef } from "react"
import { MarkdownPage } from "../components"
import { useTitle } from "../hooks/useTitle"
import "./pages.css"

type Props = {
  source: string
  closePage: () => void
  isShowing: boolean
}

export const Page: React.FC<Props> = ({ source, closePage, isShowing }) => {
  const title = useRef("UX Case Study")
  useTitle(title.current)

  useEffect(() => {
    // Sets up relative links for the table of contents
    if (!isShowing) {
      return
    }
    document.querySelectorAll("h1, h2, h3, h4").forEach((element) => {
      const ele = element as HTMLHeadingElement // stupid. There's a better way to do this.

      if (ele.tagName === "H1") {
        title.current = ele.innerText
      }

      const headingTitle = ele.innerText
        .replace(/(\s)/g, "-")
        .replace(/(\W)/gi, "")
      element.setAttribute("id", headingTitle.toLocaleLowerCase())
    })
  }, [isShowing])
  return (
    <article className="page">
      <button onClick={closePage} className="btn">
        Close
      </button>
      <MarkdownPage markdownSource={source} />
    </article>
  )
}
