# Inventory Tracker

![Image of app](https://i.ibb.co/gDV98nK/Screen-Shot-2021-06-04-at-11-25-51-AM.png)

## Demo

Live site : [https://inventory-tracker.vercel.app/](https://inventory-tracker.vercel.app/)

## Technologies

- Backend
  - Node.js
  - Express
  - Prisma ORM
  - Bcrypt
  - JWT
  - Nodemailer
  - Typescript
- Frontend
  - Next.js
  - Styled Components
  - Rebass
  - Axios
  - Typescript
- Deployment
  - Netlify & Heroku

## Run locally

**Important:** You need to have a local psql database running in your system.

### frontend

1. npm i

2. set .env according to env_sample.txt

3. npm run dev

### backend

1. npm i

2. npx prisma migrate reset

3. set .env according to env_sample.txt

4. npm run dev


# Deployment(Backend)
1. git subtree push --prefix backend heroku master
