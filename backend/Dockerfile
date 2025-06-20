# Dockerfile (development only)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Ensure dev mode
ENV NODE_ENV=development

# Copy manifest files and install ALL dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose the port your dev server listens on
EXPOSE 5000

# Run your dev script (e.g. with nodemon)
CMD ["npm", "run", "start:dev"]
