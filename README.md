# This is a [Next.js](https://nextjs.org/) project with [Stripe Payment GateWay](https://support.stripe.com/topics/getting-started):

1. [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) for type safety
2. [Tailwind CSS](https://tailwindcss.com/docs/installation) for styling
3. [Jest](https://jestjs.io/docs/getting-started) for testing
4. [ESLint](https://eslint.org/docs/latest/use/getting-started) for linting
5. [Prettier](https://prettier.io/docs/en/install.html) for formatting
6. [Husky](https://typicode.github.io/husky/getting-started.html) & [Lint-Staged](https://github.com/okonet/lint-staged) for pre-commit testing and linting

## If you like this, checkout my other projects on [GitHub](https://github.com/GLD5000) or via my [Portfolio](https://gld-portfolio.vercel.app/)

## How I made this (also read on [my blog](https://gld-dev-blog.vercel.app/) or [dev.to](https://dev.to/gld5000)):

# Setup Stripe with Next 13.4

## How I set up a project

> #### TLDR: This setup is available as a template in my [GitHub Account](https://github.com/GLD5000) if you want the quickest path to the end result or want to see the setup in context- [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate)

## Installation

1. Start with a clean Next.js install or my [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate)
2. If starting with the [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate), run `npm i` to set up dependencies etc.
3. Run `npm i stripe axios` to install stripe and axios (You can also just use the native Fetch API if you like).

## Setup Account on Stripe

1. Go to [Stripe](https://stripe.com/) and setup an account with you email address (You do not need a credit card or anything as you can just stay in 'test mode').
2. Copy your secret key from the 'Developers' Tab and put it into a '.env' file in your repos root directory.
3. Add some products using the 'Products' tab (we will use the API to fetch these for our page).
