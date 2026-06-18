import * as booksRepository from "../repositories/books.repository.js";

export async function getBooks() {
  return booksRepository.findAllBooks();
}

export async function getBook(bookName) {
  return booksRepository.findBookByName(bookName);
}

export async function getChapter(book, chapter) {
  const bookRecord = await booksRepository.findBookByIdentifier(book);

  if (!bookRecord) {
    return null;
  }

  const verses = await booksRepository.findChapter(bookRecord.id, chapter);

  return {
    book: bookRecord.name,
    chapter,
    verses,
  };
}

export async function getVerse(book, chapter, verse) {
  const bookRecord = await booksRepository.findBookByIdentifier(book);

  if (!bookRecord) {
    return null;
  }

  return booksRepository.findVerse(bookRecord.id, chapter, verse);
}

export async function getRange(book, chapter, start, end) {
  const bookRecord = await booksRepository.findBookByIdentifier(book);

  if (!bookRecord) {
    return null;
  }

  const verses = await booksRepository.findVerseRange(
    bookRecord.id,
    chapter,
    start,
    end,
  );

  return {
    book: bookRecord.name,
    chapter,
    range: `${start}-${end}`,
    verses,
  };
}
