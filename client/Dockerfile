FROM node:9.10.1-alpine
# Create app directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
# Install the app dependencies
COPY package.json /usr/src/client/
RUN npm install

# Bundle app source
COPY . /usr/src/client

EXPOSE 8080
CMD ["npm", "run", "dev"]
