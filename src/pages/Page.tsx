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
    console.log("this is showing")
    setTimeout(() => {
      const nodes = document.querySelectorAll("h1, h2, h3, h4")
      console.log(nodes)
      nodes.forEach((element) => {
        const ele = element as HTMLHeadingElement // stupid. There's a better way to do this.
        if (ele.tagName === "H1") {
          title.current = ele.innerText
        }

        const splitTitle = ele.innerText.replace(/(\s)/g, "-")
        const headingTitle = splitTitle.replace(/(—)/gi, "")
        console.log("split", splitTitle, "heading", headingTitle)
        element.setAttribute("id", headingTitle.toLocaleLowerCase())
      })
    }, 20)
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
