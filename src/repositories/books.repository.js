import { prisma } from "../lib/prisma.js";

export async function findAllBooks() {
  return prisma.books.findMany({
    select: {
      id: true,
      name: true,
      abbreviation: true,
      testament: true,
      chapters_count: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function findBookByName(bookName) {
  return prisma.books.findFirst({
    where: {
      OR: [
        { name: { equals: bookName } },
        { abbreviation: { equals: bookName } },
        { id: Number(bookName) || -1 },
      ],
    },
    select: {
      id: true,
      name: true,
      abbreviation: true,
      testament: true,
      chapters_count: true,
    },
  });
}

export async function findBookByIdentifier(value) {
  const id = Number.isNaN(Number(value)) ? null : Number(value);

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
        ...(id ? [{ id }] : []),
      ],
    },
  });
}

export async function findChapter(bookId, chapter) {
  return prisma.verses.findMany({
    where: {
      book_id: bookId,
      chapter_number: chapter,
    },
    select: {
      verse_number: true,
      verse_text: true,
    },
    orderBy: {
      verse_number: "asc",
    },
  });
}

export async function findVerse(bookId, chapter, verse) {
  return prisma.verses.findFirst({
    where: {
      book_id: bookId,
      chapter_number: chapter,
      verse_number: verse,
    },
    select: {
      chapter_number: true,
      verse_number: true,
      verse_text: true,
    },
  });
}

export async function findVerseRange(bookId, chapter, start, end) {
  return prisma.verses.findMany({
    where: {
      book_id: bookId,
      chapter_number: chapter,
      verse_number: {
        gte: start,
        lte: end,
      },
    },
    select: {
      verse_number: true,
      verse_text: true,
    },
    orderBy: {
      verse_number: "asc",
    },
  });
}
