# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port (match your backend port, e.g., 5000)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
