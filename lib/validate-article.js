// Hlavička článku musí mít název, datum a perex, jinak se web nesestaví
// a zůstane v poslední funkční verzi.
const POVINNA = ['nazev', 'datum', 'perex'];

export function validateArticle(data, inputPath) {
  for (const pole of POVINNA) {
    const hodnota = data[pole];
    if (hodnota === undefined || hodnota === null || String(hodnota).trim() === '')
      throw new Error(`Článek ${inputPath}: chybí pole ${pole}`);
  }
  if (Number.isNaN(new Date(data.datum).getTime()))
    throw new Error(`Článek ${inputPath}: neplatné datum`);
}
