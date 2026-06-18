import * as repository from "../repositories/search.repository.js";
import { toVerseDTO } from "../dto/verse.dto.js";

export async function search(query, page, limit) {
  const offset = (page - 1) * limit;

  const [results, total] = await Promise.all([
    repository.search(query, offset, limit),
    repository.countSearchResults(query),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPreviousPage: page > 1,
    data: results.map(toVerseDTO),
  };
}
