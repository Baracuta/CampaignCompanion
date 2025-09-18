# Stage 1: Build the TypeScript project
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Copy project files from host machine
COPY . .

# Install all dependencies (including dev dependencies)
ENV TS_NODE_PROJECT="./tsconfig.node.json"

RUN npm install
RUN chmod +x ./node_modules/.bin/tsc 

# Build the TypeScript project
RUN ./node_modules/.bin/tsc -p ./tsconfig.node.json --extendedDiagnostics --traceResolution


RUN ls -la
RUN ls -la /app
RUN ls -la /app/backend_dist
# Stage 2: Production image
FROM node:22.14.0-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/backend_dist ./backend_dist

# Set environment variables
ENV NODE_ENV=production

# Command to run your application
CMD ["node", "backend_dist/index.js"]