###############################################################################################
# Use official node image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /usr/local/app

# Install certbot
RUN apt-get update

# Install the application's dependencies
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install --force

# Copy the rest of the application's files
COPY . .

# Build the application
RUN npm run build



# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html

# Copy SSL certificates
#COPY /etc/letsencrypt/live/www.4aithings.com/fullchain.pem /etc/nginx/certs/fullchain.pem
#COPY /etc/letsencrypt/live/www.4aithings.com/privkey.pem /etc/nginx/certs/privkey.pem


# Expose port 80
EXPOSE 80
#EXPOSE 4200

#CMD ["nginx","-g","daemon off;"]


