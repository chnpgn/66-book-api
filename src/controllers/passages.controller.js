import * as passagesService from "../services/passages.service.js";

export async function getPassage(req, res, next) {
  try {
    const { book, start, end } = req.query;

    if (!book || !start || !end) {
      return res.status(400).json({
        success: false,
        message: "book, start and end query parameters are required",
      });
    }

    const result = await passagesService.getPassage(book, start, end);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRandomVerse(req, res, next) {
  try {
    const verse = await passagesService.getRandomVerse();

    return res.status(200).json({
      success: true,
      data: verse,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDailyVerse(req, res, next) {
  try {
    const verse = await passagesService.getDailyVerse();

    return res.status(200).json({
      success: true,
      data: verse,
    });
  } catch (error) {
    next(error);
  }
}
