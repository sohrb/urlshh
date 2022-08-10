import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { LinkIcon } from "@heroicons/react/solid"

const Home: NextPage = () => {
  const [url, setUrl] = useState("")
  const [slug, setSlug] = useState("")
  const [shortLink, setShortLink] = useState("")

  useEffect(() => {
    setShortLink(`http://localhost:3000/api/${slug}`)
  }, [slug])

  const shortenUrl = async (e) => {
    e.preventDefault()

    if (url === "") {
      alert("URL field cannot be empty")
      return
    }

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })

    const data = await response.json()
    console.log(data)

    setUrl("")
    setSlug(data.slug)
  }

  return (
    <div className="absolute w-full h-full bg-stone-900">
      <div className="flex flex-col items-center mx-[25%]">
        <div className="mt-20">
          <h1 className="text-center text-6xl text-slate-200">URL Shortener</h1>
        </div>

        <div className="w-full mt-12">
          <form className="flex w-full">
            <div className="basis-10/12 flex items-center p-2 mr-4 border border-orange-500 rounded-sm">
              <LinkIcon className="text-slate-200 h-6 mr-2" />

              <input
                className="w-full outline-none bg-transparent text-left text-slate-200 placeholder:text-slate-600"
                placeholder="URL"
                autoFocus
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="basis-2/12">
              <input
                className="p-3 rounded-sm bg-orange-500 hover:cursor-pointer"
                type="submit"
                value="Shorten"
                onClick={shortenUrl}
              />
            </div>
          </form>
        </div>

        <div className="mt-20">
          <a
            className="text-blue-500 text-3xl underline"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            {slug}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
