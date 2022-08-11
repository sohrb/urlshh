const ShortLink = ({ shortLink }: { shortLink: string }) => {
  return (
    <a
      className="text-blue-500 text-3xl underline"
      href={shortLink}
      target="_blank"
      rel="noreferrer"
    >
      {shortLink}
    </a>
  )
}

export default ShortLink
