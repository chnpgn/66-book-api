import * as booksService from "../services/books.service.js";

export async function getBooks(req, res, next) {
  try {
    const books = await booksService.getBooks();

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBook(req, res, next) {
  try {
    const { book } = req.params;

    const bookData = await booksService.getBook(book);

    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: `Book '${book}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: bookData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getChapter(req, res, next) {
  try {
    const { book, chapter } = req.params;

    const result = await booksService.getChapter(book, Number(chapter));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getVerse(req, res, next) {
  try {
    const { book, chapter, verse } = req.params;

    const result = await booksService.getVerse(
      book,
      Number(chapter),
      Number(verse),
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Verse not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRange(req, res, next) {
  try {
    const { book, chapter } = req.params;

    const start = Number(req.query.start);
    const end = Number(req.query.end);

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: "start and end query parameters are required",
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "start cannot be greater than end",
      });
    }

    const result = await booksService.getRange(
      book,
      Number(chapter),
      start,
      end,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
