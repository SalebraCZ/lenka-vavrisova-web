import { slugCs } from './lib/slug.js';
import { validateArticle } from './lib/validate-article.js';

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

  eleventyConfig.addCollection('clanky', api =>
    api.getFilteredByGlob('blog/*.md')
      .map(item => {
        validateArticle(item.data, item.inputPath);
        return item;
      })
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum))
  );

  return {
    dir: { input: '.', includes: 'src/_includes', data: 'src/_data', output: '_site' },
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: false
  };
}
