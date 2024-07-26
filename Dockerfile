# Base image for our image
# as build is an alias for this stage
FROM node:alpine AS build

# During build time, we also set the VITE_BACKEND_URL environment variable
ARG VITE_BACKEND_URL=http://localhost:3000/api/v1

# Set the working directory to /build for the build stage
WORKDIR /build

# Copy the package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# Build the app
RUN npm run build

##### Final Stage #####

# Base image for final stage
FROM nginx AS final

# Set the working directory to /var/www/html which is the directory nginx serves static files from
WORKDIR /usr/share/nginx/html

# Copy the built files from the build stage to the working directory
COPY --from=build /build/dist .