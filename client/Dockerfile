FROM node:9.11.1

# Install node modules
RUN npm install

# Create a work directory
RUN mkdir -p /app && chown node:node /app -R

USER node
ADD package.json /app/package.json
RUN cd /app && npm install

# Define working directory
WORKDIR /app
ADD . /app

# Expose port
EXPOSE 3000

# Run app using nodemon
CMD ["npm", "run", "start"]

