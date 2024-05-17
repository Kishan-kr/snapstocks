const express = require('express')
const connectToMongo = require('./db')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 80;
const cors = require('cors')
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const fileUpload = require('express-fileupload');
// const session = require('express-session');
const cookieParser = require('cookie-parser');

// import routes 
const Auth = require('./Routes/Auth/Auth')
const User = require('./Routes/User/User')
const Image = require('./Routes/Image/Image')
const CollectionRoutes = require('./Routes/Collection/CollectionRoutes')
const FollowingRoutes = require('./Routes/Following/FollowingRoutes')

// configure cors 
const corsOptions = {
  origin: clientOrigin,
};

// middlewares
app.use(express.json({limit: '16kb'})); // to parse incoming request body
app.use(cors(corsOptions)); // to handle cors
app.use(fileUpload()) // to handle file uploads
app.use(cookieParser()); // to access cookies from request


// Configure express-session
// app.use(session({
//   secret: 'secret_key', // This should be a long, random string in production
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using https
// }));


// connecting to mongoDB 
connectToMongo();

// response to Homepage 
app.get('/', (req, res)=> {
  res.end('Happy Hacking!');
})

// API routes 
app.use('/api/auth', Auth);
app.use('/api/users', User);
app.use('/api/images', Image);
app.use('/api/collections', CollectionRoutes);
app.use('/api/following', FollowingRoutes);

// listening to app 
app.listen(port, ()=> {
  console.log("server is running on port:", port);
})