# Use the official Node.js image as the base image
FROM node:22-bullseye-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Install Python and other dependencies
RUN apt-get update && apt-get install -y python3 g++ make

# Create a symlink for `python` as some tools expect `python` command
RUN ln -s /usr/bin/python3 /usr/bin/python


# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run clean-build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/public .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
