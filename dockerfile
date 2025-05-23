# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ENV PORT=3000
ENV MONGODB_URI=""

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]