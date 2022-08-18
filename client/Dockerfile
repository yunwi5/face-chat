FROM node:latest

# Working directory
WORKDIR /user/src/app

# For setting up npm private packages before npm install
ARG NPM_TOKEN
COPY .npmrc .npmrc

# Copying our dependencies to the container
COPY package.json package.json

# Intall the dependencies we copied
RUN npm install

# Remove the .npmrc file when the npm install is completed.
RUN rm -f .npmrc

# Copy the source files
COPY . .

# Exposing the port 
EXPOSE 3000

# Start the client app
CMD ["npm", "start"]