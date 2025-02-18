# Build stage
FROM node:16 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16 AS production
WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the 'dist' directory from the build stage
COPY --from=build /app/dist /app/dist

# Expose the port that 'serve' will use
EXPOSE 3000

# Run 'serve' to serve the 'dist' directory
CMD ["serve", "-s", "dist", "-l", "3000"]