// Rozdělí akce na připravované a proběhlé podle kalendářního dne v Praze.
// Akce s dnešním datem zůstává mezi připravovanými do konce dne.
const denVPraze = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Prague' });

function denAkce(datum) {
  return datum instanceof Date ? datum.toISOString().slice(0, 10) : String(datum);
}

export function splitEvents(events, today) {
  const dnes = denVPraze.format(today);
  const upcoming = events.filter(e => denAkce(e.data.datum) >= dnes)
    .sort((a, b) => denAkce(a.data.datum).localeCompare(denAkce(b.data.datum)));
  const past = events.filter(e => denAkce(e.data.datum) < dnes)
    .sort((a, b) => denAkce(b.data.datum).localeCompare(denAkce(a.data.datum)));
  return { upcoming, past };
}
