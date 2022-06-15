require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt=require("bcryptjs");
const multer = require('multer');
const { PythonShell } = require('python-shell');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");
const alert = require("alert");
const app = express();
require("./db/conn");
const Register = require('./models/registers');
const { cookie } = require('express/lib/response');
// const async = require('hbs/lib/async');
const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 8000;
app.use(express.static(static_path));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, "temp.jpg");
    }
})
let upload = multer({ storage: storage });


app.get('/index', (req, res) => {
    res.render("index");
});
app.get('/', (req, res) => {
    res.render("index");
});
app.get('/imp', (req, res) => {
    res.render("imp");
});
app.get('/imgOp', async(req, res) => {
    try {
        res.render("imgOp", {
            path: "/images/temp.jpg"
        });
    } catch (e) {
        res.status(400).send(e);
    }
});
app.get('/login', (req, res) => {
    res.render("login");
});
app.get('/register', (req, res) => {
    res.render("register");
});
app.get('/about', (req, res) => {
    res.render("about");
});
app.get('/userProfile',auth, (req, res) => {
    // console.log(`these are cookies  ${req.cookies.jwt}`);
    res.render("userProfile");
})
app.get('/logout', auth, async (req, res) => {
    try {
        
        // const all = req.body.forLogout;
        // console.log(all);
        // if (all == '0') {
        //     //for clear multi users
        //     req.user.tokens = [];
            
        // }
        // else {
            //for single user
            req.user.tokens = req.user.tokens.filter((currentElement) => {
                return currentElement.tokens != req.user.tokens;
            })
        // }
        // req.user.tokens = [];
        
        res.clearCookie("jwt");

        req.user.save();
        res.redirect("/login");
    } catch (e) {
        res.status(500).send(e);
    }
    
})

app.post('/login', async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const getemail = await Register.findOne({ email: email });
        const decryptPassword = await bcrypt.compare(password, getemail.password);
        const token = await getemail.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 1000000000),
            httpOnly: true,
            // secure:true
        })
        if (decryptPassword) {
            // res.render("userProfile");
            res.redirect('/userProfile');
        }
        else {
            // res.write(`<script>alert("Enter Right Login")</script>`);
            alert("Enter right login");
            res.render("login");
            // res.send(`<script>alert("Enter Right Login")</script>`);
        }
        
    } catch (e) {
        res.status(400).send("error while login");
   }
});


app.post('/register', async (req, res) => {
    try {
        const password =req.body.password;
        const password2 =req.body.password;
        if (password === password2) {

            const register = new Register({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                password2:req.body.password2
            })

            const token = await register.generateAuthToken();
            const registered = await register.save();
            alert("please login");
            res.status(200).render("login");
        }
        else {
            res.send("Invalid login details");
        }
        // res.render("login");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
app.get("/images/temp.jpg", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../images/temp.jpg"));
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
app.post('/imp',upload.single('image'), async (req, res) => {
    try {
        // let fileinfo = await req.file;
        res.render("imgOp", { path:"/images/temp.jpg"});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
app.post('/operation', async(req, res) => {
    try {
        // let fileinfo = await req.file;
    let option = req.body.operationName;
    option = option.toLowerCase();
    if (option == "binarization") {
        option = 1;
    }
    else if (option == "grey scale") {
        option = 2;
    }
    else if (option == "blur")
    {
        option = 3;
    }
    else if (option == "detect coins")
    {
        option = 4;
    }
    else if (option == "emoboss filter")
    {
        option = 5;
    }
    else if (option == "clear coins")
    {
        option = 6;
    }
    else if (option == "sharp filter")
    {
        option = 7;
    }
    else if (option == "specia filter")
    {
        option = 8;
    }
    else if (option == "low brightness")
    {
        option = 9;
    }
    else if (option == "increase brightness")
    {
        option = 10;
    }
    else if (option == "low contrast")
    {
        option = 11;
    }
    else if (option == "increase contrast")
    {
        option = 12;
    }
    else if (option == "gamma correction")
    {
        option = 13;
    }
    else if (option == "inverse transform")
    {
        option = 14;
    }
    else if (option == "log transform")
    {
        option = 15;
    }
    else {
        console.log("Option not found");
        }

        let options={
            args:[option]
        }
PythonShell.run("test.py", options,(err, response) => {
         try{    
                if (!err) {
        
                    // console.log(response);
                    res.render("imgOp", {
                    path:"/images/temp.jpg"
                });
                }
                else {
                    res.send(e);
                    return err;
            }
    
            } catch (e) {
                res.send(e);
                return e;
            }
    });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
