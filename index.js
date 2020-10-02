const express = require('express');
const app = express();
const mongoose = require('mongoose');

//cors
const cors = require('cors');
app.use(cors());

//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//dotenv - dont have to require in other files.
const dotenv = require('dotenv');
//to acces our .enf file
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//connect to mongo-db
mongoose.connect('mongodb://localhost/primeflix',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }
);


//mongoose.conn gives diff info about the conn.....and once is just an event listener
//once eventlistner listens just one time
//on listens each time
mongoose.connection.once('open',()=>{
    console.log('mongo conn made');
}).on('error',(err)=>{
    console.log('Connection error: ',err);
})


//creating Route middlewares
//i.e calling all the routes on auth
app.use('/api/user',authRoute);
    //this means to go to register we have to go to /api/user/register
    //it'll always have this prefix
app.use('/api/posts',postRoute);





app.listen(3700, ()=>{console.log('Server Created at port:3700')});
