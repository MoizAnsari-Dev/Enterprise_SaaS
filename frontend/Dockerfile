# ==========================================
# Stage 1: Build the Angular application
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
# (This creates the static files in the dist/ folder)
RUN npx ng build --configuration production

# ==========================================
# Stage 2: Serve the app with Nginx
# ==========================================
FROM nginx:alpine

# Remove the default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled static files from the 'builder' stage
# NOTE: Replace 'your-angular-app-name' with the actual output folder name 
# found inside your project's 'dist/' directory.
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Configure Nginx to support Angular SPA routing
RUN echo "server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files \$uri \$uri/ /index.html; \
    } \
    }" > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]