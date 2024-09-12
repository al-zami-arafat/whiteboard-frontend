FROM node:18.4.0-alpine

# Create app directory
WORKDIR /srv/www/app

# Set process.env variables. Ex: NODE_ENV=production/staging
# ENV NODE_ENV development

# Create user named buntu
# RUN adduser -S buntu

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json .

# For Development
RUN npm install

# If you are building your code for production (this is not install npm dev dependencies)
# RUN npm ci --only=production

# Own directory
# RUN chown -R buntu /srv/www/app

# Switch user
# USER buntu

# Bundle app source
COPY . .

EXPOSE 6000

CMD ["npm", "start"]
