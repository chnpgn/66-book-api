export function getPagination(page, limit) {
  const currentPage = Number(page) || 1;
  const currentLimit = Math.min(Number(limit) || 20, 100);

  return {
    page: currentPage,
    limit: currentLimit,
    offset: (currentPage - 1) * currentLimit,
  };
}
