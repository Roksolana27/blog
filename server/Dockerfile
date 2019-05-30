FROM node:9.11.1

# Install Node.js and other dependencies
#RUN apt-get update && \
#   apt-get -y install curl && \
#   apt-get -y install python wget && \
#   apt-get -y install mc

# Install nodemon -g nodemon
RUN npm install

RUN mkdir -p /app && chown node:node /app -R

USER node
ADD package.json /app/package.json
RUN cd /app && npm install

# Define working directory
WORKDIR /app
ADD . /app

# Expose port
EXPOSE 5000

# Run app using nodemon
CMD ["nodemon", "index.js", "--ignore", "tests"]

