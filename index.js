//import express and store in a variable

const express = require("express");

//import ds
const ds = require("./service/dataservice");

//import js

// const jwt = require("jsonwebtoken");

const jwt = require("jsonwebtoken")

//app creation
const app = express();

//to covert all datas json to js

app.use(express.json());

// middleware creation
const jwtMiddleware = (req, res, next) => {
  try {
    //access data from request body
    const token = req.headers['access_token']

    //verify the token with secret key
    const data = jwt.verify(token, "superkey123")

    console.log(data);
    next()
  } 
  catch{
    res.status(422).json({
      status: false,
      message: "please login",
      statusCode: 404,
    });
  }
};





// const jwtMiddleware=(req,res,next)=>{
//     try{
//        const token=req.headers["access_token"]

//        const data=jwt.verify(token,"key1234")
//        next()


//     }

//     catch{
//         res.status(422).json({
//             status:false,
//             message:"please login",
//             statuscode:404
//     })
// }
// }



//register post

app.post("/register", (req, res) => {
  const result = ds.register(req.body.acno, req.body.uname, req.body.psw);
  res.status(result.statuscode).json(result);
  // console.log(req.body);
  // res.send("work")
});

app.post("/login", (req, res) => {
  const result = ds.login(req.body.acno, req.body.psw);
  res.status(result.statuscode).json(result);
  // console.log(req.body);
  // res.send("work")
});

app.post("/deposit",jwtMiddleware,(req, res) => {
  const result = ds.deposit(req.body.acno, req.body.psw, req.body.amnt);
  res.status(result.statuscode).json(result);
  // console.log(req.body);
  // res.send("work")
});

app.post("/withdraw", jwtMiddleware, (req, res) => {
  const result = ds.withdraw(req.body.acno, req.body.psw, req.body.amnt);
  res.status(result.statuscode).json(result);
  // console.log(req.body);
  // res.send("work")
});

app.get("/transaction",jwtMiddleware, (req, res) => {
  const result = ds.getTransaction(req.body.acno);
  res.status(result.statuscode).json(result);
  // console.log(req.body);
  // res.send("work")
});

//register post
//login get
//deposit patch
//withdraw patch
//transaction get
//delete delete

//resolve api

// app.get("/",(req,res)=>{
//     res.send("get..... method working....")
// })

// app.post("/",(req,res)=>{
//     res.send("post method working....")
// })

// app.put("/",(req,res)=>{
//     res.send("put method working....")
// })

// app.patch("/",(req,res)=>{
//     res.send("patch method working....")
// })

// app.delete("/",(req,res)=>{
//     res.send("delete method working....")
// })

//port set
app.listen(3000, () => {
  console.log("server started at port 3000");
});
