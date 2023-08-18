const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const Users = require("./models/userModels")
const Posts = require("./models/postModels")

const app = express()


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// Mongo db connection
mongoose.connect(`mongodb+srv://sanjeev:qwerasdzx@cluster0.jvlmw5n.mongodb.net/blog-api?retryWrites=true&w=majority`)
.then(()=>{
    console.log("connected to mongo db")
    app.listen(3001,()=>{
        console.log("Node App running")
    });
}).catch((e)=>{
    console.log(e)
})


// Routes
app.get('/',(req,res)=>{
    res.json({"message":"Hi from node js"})
});

app.get("/user",async (req,res)=>{
    try {
        const users = await Users.find({}, 'name email password');
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});
    }
})


app.get("/user/:id",async (req,res)=>{
    try {
        const {id}=req.params;
        const users = await Users.findById(id)
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});
    }
})

app.post('/register',async(req,res)=>{
    try {
        const {email}  = req.body;
        const check = await Users.findOne({email});

        if(check){
            res.status(500).json({"message":"user exists", "value":false})
        }
        else{
            const user = await Users.create(req.body);
            user.value=true
            res.status(200).json({"message":"user created", "value":true});
        }

    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});

    }
})

app.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        
        const check = await Users.findOne({email})

        if(check && check.password===password){
            res.status(200).json({message:"Authentication sucessfull",value:true,id:check.id,name:check.name,email:check.email,});
        }
        else{
            res.status(500).json({message:"Authentication failed",value:false});
        }

        

    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});

    }
})


app.post("/create_post",async (req,res)=>{
    try {
        const post = await Posts.create(req.body)
        res.status(200).json(post)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});
    }
})

app.get("/get_posts",async (req,res)=>{
    try {
        const post =  await Posts.find({},"title imgurl description");
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});
    }
})

app.get("/get_posts/:email",async (req,res)=>{
    try {
        const {email} = req.params;

        const post =  await Posts.find({useremail:email},"title imgurl description");
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500).json({message:error.message});
    }
})