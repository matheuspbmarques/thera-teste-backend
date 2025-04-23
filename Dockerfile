# Build
FROM node:22-alpine AS build

# Define Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependecies
RUN npm install

# Copy Project Files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Compile Project
RUN npm run build

# Deploy
FROM node:22-alpine AS deploy

# Defined Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Copy Project Build
COPY --from=build /app/dist ./

# Copy Dependecies
COPY --from=build /app/node_modules ./node_modules

# Copy Prisma Contents
COPY --from=build /app/prisma ./prisma