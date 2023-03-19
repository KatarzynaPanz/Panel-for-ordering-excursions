
# Panel for ordering excursions

## About project
The aim of the project was to create the application, which can be used to order excursions. There are two panels - for clients and admin. In the application JSON Server, REST API and fetch() were used. 

## Features
1. Two panels
   - client panel
      - client is able to order excursions and to confirm it after fulfilling the contact form
   - admin panel 
      - admin is able to manage excursions (modify, delete, add new)
2. Validation at every field
3. Excursions and clients orders are stored in a local database and retrieved using a local API (JSON Server).

## Technologies
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Installation and configuration
The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), follow the steps below to be able to use the application.
- Install all npm packages using command:
````
npm i
````
- To start develop mode use command:
````
npm start
````
- If you don't have JSON server installed on your device use command:
````
npm install json-server -g
````
- To run JSON server use command:
````
json-server --watch ./data/excursions.json
````
- From now on, the application is available at:
 - for client:
````
http://localhost:8080/index.html
````
 - for admin:
 ````
http://localhost:8080/admin.html
````
* Databasse are available at:
 - for excursions:
````
http://localost:3000/excursions
````
 - for orders:
 ````
 http://localost:3000/orders
 ````

## Author
Linkedin - [Katarzyna Panz](https://www.linkedin.com/in/katarzyna-panz-584399228/)

## Special thanks
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.
