import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db/client"
import { Prisma } from "@prisma/client"
import { nanoid } from "nanoid"
import isURL from "validator/lib/isURL"
import normalizeUrl from "normalize-url"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { url } = req.body
    if (!isURL(url)) {
      return res.status(400).json({ error: "Please provide a valid URL" })
    }

    try {
      const normalizedUrl = normalizeUrl(url)
      const shortLink = await prisma.shortLink.findFirst({
        where: {
          url: {
            equals: normalizedUrl,
          },
        },
      })

      if (shortLink) {
        return res.status(200).json({ slug: shortLink.slug })
      }

      const slug = nanoid(6)
      await prisma.shortLink.create({
        data: {
          url: normalizedUrl,
          slug: slug,
        },
      })

      return res.status(201).json({ slug: slug })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(409).json({ error: "Please try again" })
        }
      }

      console.table(error)
      return res.status(500).json({ error: "Server error" })
    }
  }

  return res.status(405).json({ message: "Only use POST method on this route" })
}
