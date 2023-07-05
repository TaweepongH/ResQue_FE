
1. run the server in the temp folder of the backend project
it can be found at: 

Backend folder:
.
├── firebase.json
├── functions
└── temp
    ├── firebase.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    <!--  -->
    └── server.js  <===========  here's the file!!!!
    <!--  -->

2. to run the server, type "node server.js" 
(or use nodemon if you have it) 

- The terminal will output the port number and IP address, like: 

"Server listening on port xxxx"
"Server IP address: x.x.x.x"

you can then replace the values for the ipAddress and portNum constant variables at the top of the UserInfo.js file

this needs to be done because each one of us will run our servers on a different ipAddress. We will need to do something different for when we actually deploy our app. 