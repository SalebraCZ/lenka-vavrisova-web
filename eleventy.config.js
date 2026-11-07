import { slugCs } from './lib/slug.js';
import { validateArticle } from './lib/validate-article.js';
import { splitEvents } from './lib/events.js';

// Den sestavení; v testech pevně přes BUILD_DATE.
const dnes = () => (process.env.BUILD_DATE ? new Date(`${process.env.BUILD_DATE}T12:00:00Z`) : new Date());

// Datum česky: 7. 11. 2026
function datumCs(datum) {
  const d = new Date(datum);
  return `${d.getUTCDate()}. ${d.getUTCMonth() + 1}. ${d.getUTCFullYear()}`;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy('blog/**/*.{jpg,jpeg,png,webp}');
  for (const ignore of ['test/**', 'README.md', '.superpowers/**', '.claude/**']) eleventyConfig.ignores.add(ignore);

  eleventyConfig.addFilter('slugCs', slugCs);
  eleventyConfig.addFilter('datumCs', datumCs);
  eleventyConfig.addFilter('denMesic', d => datumCs(d).split(' ').slice(0, 2).join(' '));
  eleventyConfig.addFilter('rok', d => new Date(d).getUTCFullYear());

  eleventyConfig.addCollection('clanky', api =>
    api.getFilteredByGlob('blog/*.md')
      .map(item => {
        validateArticle(item.data, item.inputPath);
        return item;
      })
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum))
  );

  eleventyConfig.addCollection('akcePripravovane', api => splitEvents(api.getFilteredByGlob('akce/*.md'), dnes()).upcoming);
  eleventyConfig.addCollection('akceProbehle', api => splitEvents(api.getFilteredByGlob('akce/*.md'), dnes()).past);

  return {
    dir: { input: '.', includes: 'src/_includes', data: 'src/_data', output: '_site' },
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: false
  };
}
