# Base image for our image
FROM node:alpine

# Set the working directory where teh files of our service 
# will be placed inside the image
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application from the local file system to the image
COPY . .

# Run our application when the Docker container starts
CMD ["npm", "start"]