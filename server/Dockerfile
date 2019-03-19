# Set the base image to Ubuntu
FROM node:9.11.1

# File Author / Maintainer
MAINTAINER Alexander Sheremisnkiy

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install python wget && \
    apt-get -y install mc

# Install nodemon
RUN npm install -g nodemon

RUN mkdir -p /docker && chown node:node /docker -R

USER node

# Define working directory
WORKDIR /docker

ADD package.json .

COPY . .

RUN npm install --quiet

#RUN ln -s ./node_modules node_modules

# Expose port
EXPOSE  5000

# Run app using nodemon
CMD ["nodemon", "index.js", "--ignore", "tests"]