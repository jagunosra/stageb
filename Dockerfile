ARG NODE_VERSION=20.11.1
ARG PNPM_VERSION=8.15.4

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

FROM builder as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /src
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
