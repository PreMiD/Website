FROM node:current-slim

ENV NUXT_PORT=8080
ENV NUXT_HOST=0.0.0.0

EXPOSE 8080

COPY . .

RUN npm install
RUN npm run build


CMD ["npm", "start"]