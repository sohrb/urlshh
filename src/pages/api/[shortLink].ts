import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db/client"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const slug = req.url?.slice(5)
    if (!slug) {
      return res.status(400).json({ error: "Invalid slug" })
    }

    const shortLink = await prisma.shortLink.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!shortLink) {
      return res.status(404).json({ error: "URL with this slug doesn't exist" })
    }

    return res.redirect(shortLink.url)
  }

  return res.status(405).json({ error: "Only use GET method on this route" })
}
