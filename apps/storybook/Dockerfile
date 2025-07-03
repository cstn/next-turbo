# Use Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY apps/storybook/package.json ./apps/storybook/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build:storybook

# Expose Storybook's default port
EXPOSE 6006

# Set the working directory to storybook app
WORKDIR /app/apps/storybook

# Start Storybook
CMD ["npm", "run", "start"]
