import * as searchService from "../services/search.service.js";

export async function searchVerses(req, res, next) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const page = Number(req.query.page) || 1;

    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const results = await searchService.search(q, page, limit);

    return res.status(200).json({
      success: true,
      ...results,
    });
  } catch (error) {
    next(error);
  }
}
