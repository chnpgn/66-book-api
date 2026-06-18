export function parseReference(reference) {
  const [chapter, verse] = reference.split(":").map(Number);

  return {
    chapter,
    verse,
  };
}
