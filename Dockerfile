# Build Stage
FROM node:18-alpine3.19 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Serve Stage
FROM node:18-alpine3.19

# Create app directory
WORKDIR /usr/src/app

# Install serve package globally
RUN npm install -g serve

# Copy build artifacts from the build stage
COPY --from=build /app/dist /usr/src/app

# Expose port 80
EXPOSE 80

# Start the server using serve
CMD ["serve", "-s", ".", "-l", "80"]