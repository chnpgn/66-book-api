import { prisma } from "../lib/prisma.js";

export async function findBook(value) {
  return prisma.books.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: value,
          },
        },
        {
          abbreviation: {
            equals: value,
          },
        },
      ],
    },
  });
}

export async function findPassage(bookId, start, end) {
  return prisma.verses.findMany({
    where: {
      book_id: bookId,

      OR: [
        {
          chapter_number: start.chapter,

          verse_number: {
            gte: start.verse,
          },
        },

        {
          chapter_number: {
            gt: start.chapter,
            lt: end.chapter,
          },
        },

        {
          chapter_number: end.chapter,

          verse_number: {
            lte: end.verse,
          },
        },
      ],
    },

    orderBy: [
      {
        chapter_number: "asc",
      },
      {
        verse_number: "asc",
      },
    ],
  });
}

export async function randomVerse() {
  const [result] = await prisma.$queryRaw`

      SELECT
        v.id,
        b.name,
        v.chapter_number,
        v.verse_number,
        v.verse_text

      FROM verses v

      JOIN books b
        ON b.id = v.book_id

      ORDER BY RAND()

      LIMIT 1
    `;

  return result;
}

export async function dailyVerse() {
  const total = await prisma.verses.count();
  if (total === 0) {
    return null;
  }

  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;

  for (const char of today) {
    hash += char.charCodeAt(0);
  }

  const skip = hash % total;

  const [verse] = await prisma.verses.findMany({
    skip,
    take: 1,
    orderBy: {
      id: "asc",
    },
  });

  return verse ?? null;
}
