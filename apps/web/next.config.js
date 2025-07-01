import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cstn/ui"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
