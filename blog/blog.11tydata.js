import { slugCs } from '../lib/slug.js';

export default {
  layout: 'clanek.njk',
  eleventyComputed: {
    permalink: data => `/blog/${slugCs(data.page.fileSlug)}/`,
    title: data => data.nazev,
    description: data => data.perex
  }
};
