const express = require ('express');
const mongoose = require ('mongoose');

const AuthRouter = require('./controller/user-controller')
const CourseRouter = require('./controller/course-controller')
const StudentRouter = require('./controller/student-controller')
const FeesRouter = require('./controller/fees-controller')
const AuthMiddleware = require('./middleware/authentication')

const cookieParser = require('cookie-parser');
const cors = require('cors');
const app =express();

const path=require("path");
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
  }
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
    cors({
      origin: "https://fees-management-system-ph04.onrender.com/",
    
      credentials: true,
    })
  );
app.post('/register',AuthRouter.register);
app.post('/login',AuthRouter.login);
app.post('/logout',AuthRouter.logout);
app.post('/addCourse',AuthMiddleware.authMiddleware,CourseRouter.addCourse);
app.get('/getAllCourses',AuthMiddleware.authMiddleware,CourseRouter.getAllCourses);
app.post('/addStudent',AuthMiddleware.authMiddleware,StudentRouter.addStudent);
app.post('/editCourse/:id',AuthMiddleware.authMiddleware,CourseRouter.editCourse);
app.post('/editStudent/:id',AuthMiddleware.authMiddleware,StudentRouter.editStudent);
app.get('/getAllStudents',AuthMiddleware.authMiddleware,StudentRouter.getAllStudent)
app.post('/collectFees',AuthMiddleware.authMiddleware,FeesRouter.collectFees);
app.get('/feesHistory',AuthMiddleware.authMiddleware,FeesRouter.getFeesHistory);


if(process.env.NODE_ENV==="production"){
  const dirPath=path.resolve();
    app.use(express.static(path.join(dirPath,'./client/dist')));
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(dirPath,'client','dist','index.html'));
    })
  }


mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Mongodb Connected"))
.catch((error)=>console.log(error))

app.listen(process.env.PORT,()=>{
    console.log(`server listening to port http://localhost:${process.env.PORT}`)
})