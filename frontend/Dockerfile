FROM node:25-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

FROM base AS builder

RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:25-alpine AS runner

WORKDIR /app

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=base /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]