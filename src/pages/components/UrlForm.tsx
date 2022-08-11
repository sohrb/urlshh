import { Dispatch, SetStateAction, useState } from "react"
import { LinkIcon } from "@heroicons/react/solid"

const UrlForm = ({
  setShortLink,
}: {
  setShortLink: Dispatch<SetStateAction<string>>
}) => {
  const [url, setUrl] = useState("")

  const shortenUrl = async (e: any) => {
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

    setUrl("")
    setShortLink(data.shortLink)
  }

  return (
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
  )
}

export default UrlForm
