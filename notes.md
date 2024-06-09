# Notes for Fullstack with Clerk Auth

## Initialization

1. `npm create vite@latest`: TypeScript + SWC options
1. `npm create amplify@latest`: Init in root (`.`) of project
1. `touch .env.local`: Get this from Clerk and display as showin in `sample.envlocal` file
1. `npm install @clerk/clerk-react`: Installs the clerk deps for Vite
1. Follow [this doc](https://clerk.com/docs/quickstarts/react) for install steps
1. [Install Tailwind](https://tailwindcss.com/docs/guides/vite), [DaisyUI](https://daisyui.com/docs/install/), and [React Router](https://reactrouter.com/en/main/start/tutorial):

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm i -D daisyui@latest

npm install react-router-dom
```

## Landing Page

This is going to be an app where users can upload text with photos to create a timeline of events.

The landing page should speak on that.

1. Create HomePage Route
1. DaisyUI Nav, Hero, and Footer

## Auth Pages

This app needs a place to add milestones (text + images), and view them. Note that the only person that should be able to view them are the owner.

## View Milestones Page

1. Create the page
1. [Protect the Page with Clerk Auth](https://clerk.com/docs/references/react/add-react-router)
1. Create the API to auth based on a simple Lambda function
1. [Enhance to the Lambda function](https://x.com/focusotter/status/1756048608011473122) to check the Authorization header which will contain the Clerk logic
