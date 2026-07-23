/**
 * Deterministic page-number sequence for pagination UI.
 * Returns an empty array when `totalPages <= 1`.
 */
function getPaginationItems(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 1) return [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pageSet = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  const sorted = [...pageSet]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: Array<number | 'ellipsis'> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index]!;
    const previous = sorted[index - 1];

    if (previous !== undefined && page - previous > 1) {
      items.push('ellipsis');
    }

    items.push(page);
  }

  return items;
}

export { getPaginationItems };
