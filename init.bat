@echo off
npm i && npx prisma generate && npx prisma migrate dev && npm run start