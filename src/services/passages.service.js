import * as repository from "../repositories/passages.repository.js";

import { parseReference } from "../utils/referenceParser.js";

export async function getPassage(book, start, end) {
  const startRef = parseReference(start);
  const endRef = parseReference(end);
  const bookRecord = await repository.findBook(book);

  if (!bookRecord) {
    throw new Error("Book not found");
  }

  const verses = await repository.findPassage(bookRecord.id, startRef, endRef);

  return {
    reference: `${book} ${start}-${end}`,
    book: bookRecord.name,
    start,
    end,
    verses,
  };
}

export async function getRandomVerse() {
  return repository.randomVerse();
}

export async function getDailyVerse() {
  return repository.dailyVerse();
}
