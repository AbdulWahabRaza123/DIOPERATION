const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const res = require("express/lib/response");
const formSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
        required: true
        }
    }]
})
formSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (e)
    {
        res.send("There is error in authentication"+e);
    }
}
formSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.password2 = await bcrypt.hash(this.password, 10);
        
    }
    next();
});
const Register = new mongoose.model("Register", formSchema);

module.exports = Register;
