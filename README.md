# Next.js Demo

> This is a demo project for a web application built with [Next.js](https://nextjs.org/) and [Turborepo](https://turborepo.com/).

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@cstn/ui`: React component library
- `@cstn/eslint-config`: `eslint` configurations
- `@cstn/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@cstn/commitlint-config`: `commitlint` configurations
- `@cstn/validation`: shared validation schemas with `zod`
- `@cstn/vitest-config`: `vitest` configurations

## Requirements

* Node version 20 or above
* npm version 10 or above

## Using this demo

### Installation

```shell script
git clone git@github.com:cstn/next-turbo-demo.git
npm install
```

### Setup

Copy `.env.example` to `.env` and set up the environment vars


### Running the demo

```shell
npm run build
npm run dev
```


### Develop

 Run the development server:
```shell
npm run dev
```


