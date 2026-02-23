FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port exactly as requested (8081)
EXPOSE 8081

# Serve the Angular application allowing connections from any host (required for Docker)
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "8081", "--disable-host-check"]
