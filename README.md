# Student Course Enrollment System

## About the project

This API service is facilitate to maintain the students and thier course enrollments and disenrollments.

### Main features included :

- Create New Course with a specified maximum capacity (Admin feature,Required admin auth token to create new course)
- Get list of available courses with enrollment count for each course
- Enroll for the course, if seats are available (maximum capacity will be considered)
- Get list of all students enrolled in a particular course.
- Students able to drop a course they have enrolled (maximum capacity will be update)

## Getting started

Follow bellow steps on CLI before getting start

1. Run `git clone https://github.com/YasiruDev/student-enrollment-system.git` for clone project
2. Run `cd student-enrollment-system`
3. Run `npm install` for install packages

## Run Application

Follow bellow script on CLI to run this Application

1. Run `npm start` or `npm run dev`

### Techstack

- NodeJs - V16
- Nest.js - V8.0.0
- TypeScript - V4.3.5
- PostgreSQL - 15.2

### .env configurations

`APP_PORT=3003 , ROOT_LOG_PATH=D:/Logs/Nest/`

`#db DB_POSTGRES_HOST=xxxxx DB_POSTGRES_PORT=xxxxx DB_POSTGRES_USER=xxx DB_POSTGRES_PASSWORD=xxx DB_POSTGRES_DATABASE=xxx `

### DB schema

Find the DB schema under below folder path
`student-enrollment-system -> src -> migrations`

### Documents

- [Technical Document](https://docs.google.com/document/d/1dQc2Ny3qC1lUT6iXRFaRsNx0G5WFnjPv70F5xNAHCYE/edit?usp=sharing)
- [Postman Collection](https://drive.google.com/file/d/1AYCNW7-HXaLUAywsDZ32LXGAEODhOUKC/view?usp=sharing)
