# Stage 1: Build the application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the working directory
COPY . .

# Build the application using Nuxt
RUN npm run build

# Expose the port that Nuxt.js uses
EXPOSE 3000

# Command to run the Nuxt app
CMD ["npm", "run", "start"]