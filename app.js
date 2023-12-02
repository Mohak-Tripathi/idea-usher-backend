const express = require("express");
const app = express();

// const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload")
// const rateLimit = require("express-rate-limit")
// const helmet = require("helmet")
// const mongoSanitize = require('express-mongo-sanitize');
// const xssClean = require('xss-clean')
// const hpp = require("hpp")
// const cors = require('cors')

const connectDataBase = require("./config/database")
// const errorMiddleware = require("./middlewares/errors")
// const ErrorHandler = require("./utils/errorHandler")


//setting config environemnt file variable-
dotenv.config({ path: "./config/config.env" });



//Handling Uncaught Exceptions 

process.on("uncaughtException", err =>{
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);   // in this case we don't need to close the server. Just need to come out (exit) from the process.
})

// connecting database 
connectDataBase()

//Set up Security headers => Use Helmet

// app.use(helmet()) //for increasing security. 

//Setting up the body parser
app.use(express.json());

// //Setting cookie parser
// app.use(cookieParser());



// //Sanitize data
// app.use(mongoSanitize());

// //Prevent xss attacks
// app.use(xssClean());

// //Prevent Parameter Pollution
// app.use(hpp({
//   whitelist: ["positions"]
// }))

// //Set CORS => Accesible by other domains.
// app.use(cors());

// //Rate Limiting
// const limiter = rateLimit({
//   windowMs : 10*60*1000, //10Minutes
// max: 100
// });

// app.use(limiter);






//importing all routes
 const tags = require("./routes/tagRoute");
 const posts = require("./routes/postRoute");

app.use("/api/v1", tags);
app.use("/api/v1", posts);


app.all("*", function(req, res, next){
  next( new ErrorHandler(`${req.originalUrl} route not found`, 404))
})




// app.use(errorMiddleware);

const PORT = process.env.PORT;

const server = app.listen(8080, () => {
  console.log(
    `Server is listening at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});



//Handling Unhandled Promise Rejection 

process.on("unhandledRejection", err =>{

  console.log(`Error: ${err.stack}`);
  console.log(`Shutting down server due to unhandled promise rejection`);

  server.close(()=>{
    process.exit(1);
  })
})