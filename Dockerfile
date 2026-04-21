# Base image includes:
  # Node.js
  # Browsers (Chromium, Firefox, WebKit)
  # Linux dependencies
  # Playwright preinstalled
# tag version matches package.json @playwright/test version
# Obtained from playwright docs: Integrations > Docker
# https://playwright.dev/docs/docker#pull-the-image
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Create /app directory
RUN mkdir /app
# Set working directory
# RUN commands will be set to this directory
WORKDIR /app
# Copy whole project into /app/ directory of container
COPY . /app/

# Install node dependencies to the WORKDIR
RUN npm install
# Ensures playwright browsers are installed
# May already be installed from base image
RUN npx playwright install

# Builds Docker image with tag pw-ui-tests
# from current directory with CLI command:
# sudo docker build -t pw-ui-tests .

# See list of docker images
# sudo docker images

# Run playwright tests inside container
# using the built image with CLI command:
# sudo docker run -it <image_name>
# npx playwright test
# or npm package.json scripts
