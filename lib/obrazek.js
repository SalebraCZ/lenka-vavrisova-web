// Obrázek k článku leží vedle něj ve složce blog/; absolutní adresy nechá být.
export function obrazekUrl(obrazek) {
  return /^(\/|https?:)/.test(obrazek) ? obrazek : `/blog/${obrazek}`;
}
