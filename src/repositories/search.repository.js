import { prisma } from "../lib/prisma.js";

export async function search(query, offset, limit) {
  return prisma.$queryRaw`
    SELECT
      b.name AS book,
      v.chapter_number AS chapter,
      v.verse_number AS verse,
      v.verse_text AS text

    FROM verses v

    INNER JOIN books b
      ON b.id = v.book_id

    WHERE MATCH(v.verse_text)
    AGAINST(
      ${query}
      IN NATURAL LANGUAGE MODE
    )

    LIMIT ${limit}
    OFFSET ${offset}
  `;
}

export async function countSearchResults(query) {
  const result = await prisma.$queryRaw`
      SELECT
        COUNT(*) AS total

      FROM verses

      WHERE MATCH(verse_text)
      AGAINST(
        ${query}
        IN NATURAL LANGUAGE MODE
      )
    `;

  return Number(result[0].total);
}
