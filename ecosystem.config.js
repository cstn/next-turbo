module.exports = {
  apps: [
    {
      name: 'next-web',
      script: 'npm',
      args: 'run web',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'next-storybook',
      script: 'npm',
      args: 'run storybook',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
