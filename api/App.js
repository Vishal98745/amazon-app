const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const app = express()
const port = 8000
const cors = require("cors")
app.use(cors())

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken")

mongoose.connect("mongodb+srv://demo12345colo:Vis1234567890@ecomerce.ihfstti.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology :true
}).then(()=>{
    console.log("connected to MongoDB");
}).catch((error)=>{
    console.log("Error connecting to MongoDB",error);
})
 
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}/`);
})

const User = require("./models/user")
const order = require("./models/order")

const sendVerificationEmail = async(email,verificationToken)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"demo12345colo@gmail.com",
            pass:"julnsxkaertmbjir"
        }
    })
    const mailoptions ={
        from:"ecommerce website",
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify your email : http://localhost/8000/verify/${verificationToken}`
    }
    // send the mail
    try {
        await transporter.sendMail(mailoptions)
    } catch (error) {
        console.log("Error sending cerification email",error);
    }
}
// endpoint to register in the app
app.get("",async(req,res)=>{
    return res.status(200).json({message:"backend is working"})
})
app.post("/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const exitingUser = await User.findOne({email})
        if(exitingUser){
            return res.status(400).json({message:"email is already registered"})
        }
        const newUser = await User({name,email,password})
        // verification token generation
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")
        // user is to be save 
        await newUser.save()

        // send the verfication to the email
        sendVerificationEmail(newUser.email,newUser.verificationToken)
        console.log("registration successful");
        res.status(201).json({
            message:
              "Registration successful. Please check your email for verification.",
          });
    } catch (error) {
        console.log("error registering user",error);
        res.status(500).json({message:"Registration failed"})
    }
})

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
      const token = req.params.token;
  
      //Find the user witht the given verification token
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
  
      //Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;
  
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  });

  const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();
  
  //endpoint to login the user!
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email,password);
      //check if the user exists
      const user = await User.findOne({ email });
      console.log(user,"user detail");
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  });