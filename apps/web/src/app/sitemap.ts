import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  {
    url: 'https://demo.cast-it.de/',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }
];

export default sitemap;
