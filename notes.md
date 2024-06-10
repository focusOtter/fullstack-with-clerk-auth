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

### View and Create Milestones Pages

> If this where an application where you simply needed to be signed in to see some protected data, then using the AWS Amplify `.authorization(allow => ([allow.authenticated()]))` would be fine. But in this app, we want [`owner` authorization](https://docs.amplify.aws/react/build-a-backend/data/customize-authz/per-user-per-owner-data-access/#customize-the-owner-field). Amplify uses cognito to apply an owner using the format `<sub>::<username>`. Since we're not using Cognito, we have to manage that ourselves.

1. Create the page✅
1. [Protect the Page with Clerk Auth](https://clerk.com/docs/references/react/add-react-router)✅
1. Create the API to auth based on a simple Lambda function✅
1. [Enhance to the Lambda function](https://x.com/focusotter/status/1756048608011473122) to check the Authorization header which will contain the Clerk logic so I can [manually verify the JWT](https://clerk.com/docs/backend-requests/handling/manual-jwt)

> "Retrieve the session token from either \_\_session cookie for a same origin request or from the Authorization header for cross origin requests."
