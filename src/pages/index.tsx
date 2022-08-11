import type { NextPage } from "next"
import { useState } from "react"
import UrlForm from "./components/UrlForm"
import ShortLink from "./components/ShortLink"

const Home: NextPage = () => {
  const [shortLink, setShortLink] = useState("")

  return (
    <div className="absolute w-full h-full bg-stone-900">
      <div className="flex flex-col items-center mx-[25%]">
        <div className="mt-20">
          <h1 className="text-center text-6xl text-slate-200">URL Shortener</h1>
        </div>

        <div className="w-full mt-12">
          <UrlForm setShortLink={setShortLink} />
        </div>

        <div className="mt-20">
          <ShortLink shortLink={shortLink} />
        </div>
      </div>
    </div>
  )
}

export default Home
