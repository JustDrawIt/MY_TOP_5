FROM node:carbon

WORKDIR /usr/movie-shelf

COPY package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 80
CMD ["npm", "start"]
