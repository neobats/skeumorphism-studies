import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export const MarkdownPage: React.FC<{ markdownSource: string }> = ({
  markdownSource
}) => {
  const [error, setError] = useState("")
  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(markdownSource)
        const text = await response.text()
        console.log(text)
        setMarkdown(text)
      } catch (e) {
        setError(`${e}`)
      }
    }
    fetcher()
  }, [markdownSource])
  return error ? (
    <div className="error-message">
      <p>
        We encountered an error loading {markdownSource}. Here's more info:{" "}
        {error}{" "}
      </p>
    </div>
  ) : (
    <ReactMarkdown children={markdown} />
  )
}
