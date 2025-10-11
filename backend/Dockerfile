FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using install instead of ci to avoid lockfile issues)
RUN npm install --only=production

# Copy source code
COPY . .

EXPOSE 6060

CMD ["npm", "start"]
