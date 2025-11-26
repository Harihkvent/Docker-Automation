# Use Node.js LTS version
FROM node:18-alpine

# Install Docker CLI to interact with host Docker daemon
RUN apk add --no-cache docker-cli

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
