export function toVerseDTO(verse) {
  return {
    reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
    book: verse.book,
    chapter: verse.chapter,
    verse: verse.verse,
    text: verse.text,
    links: {
      self:
        `/api/v1/books/${verse.book.toLowerCase()}` +
        `/chapters/${verse.chapter}` +
        `/verses/${verse.verse}`,
      chapter:
        `/api/v1/books/${verse.book.toLowerCase()}` +
        `/chapters/${verse.chapter}`,
    },
  };
}
