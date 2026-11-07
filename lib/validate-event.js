// Hlavička akce musí mít název, datum, místo a typ, jinak se web nesestaví.
const POVINNA = ['nazev', 'datum', 'misto', 'typ'];

export function validateEvent(data, inputPath) {
  for (const pole of POVINNA) {
    const hodnota = data[pole];
    if (hodnota === undefined || hodnota === null || String(hodnota).trim() === '')
      throw new Error(`Akce ${inputPath}: chybí pole ${pole}`);
  }
  if (Number.isNaN(new Date(data.datum).getTime()))
    throw new Error(`Akce ${inputPath}: neplatné datum`);
}
