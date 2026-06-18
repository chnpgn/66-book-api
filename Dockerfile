# Use a lightweight Node image for the build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency manifests and install all dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Remove dev dependencies and keep production modules only
RUN npm prune --production

# Final runtime image
FROM node:20-alpine AS runtime
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["node", "src/index.js"]
