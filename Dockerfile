FROM node:current-alpine

ENV NUXT_PORT=80
ENV NUXT_HOST=0.0.0.0

EXPOSE 80

COPY . .

RUN yarn
RUN yarn build
RUN npm prune --production; exit 0

CMD ["yarn", "start"]