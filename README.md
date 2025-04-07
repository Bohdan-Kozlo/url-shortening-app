# URL Shortening App

## Project Description
This project is a URL shortening application that allows users to convert long URLs into shorter, more manageable links. It is built using NestJS and TypeORM, and utilizes a MySQL database for storing URL mappings.

## Installation
To set up the project locally, follow these steps:
1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Ensure Docker is installed and running.
4. Run `docker-compose up` to start the application and database.

## Usage
Once the application is running, you can shorten URLs by sending a POST request to `http://localhost:3000/api/url/` with a JSON body containing the long URL. The response will include the shortened URL.

## Architecture
The project is structured as follows:
- **src/url**: Contains the service, controller, and entity for URL management.
- **docker-compose.yml**: Defines the Docker services for the application and MySQL database.
- **package.json**: Lists the project dependencies and scripts.
