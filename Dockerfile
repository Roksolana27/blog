FROM node:9.11.1
RUN mkdir -p /app

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./ /app/
EXPOSE 5000

CMD ["npm", "run", "dev"]

