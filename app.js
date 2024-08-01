const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminModel = require("./models/admin")

let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Richi2001:R1CH1R0Y@cluster0.ulfkc.mongodb.net/swiggyAppDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/adminSignUp", async(req, res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(input.password, 10)
    input.password = hashedPassword
    adminModel.find({ username: input.username }).then(
        (items)=>{
            if (items.length > 0) {
                res.json({ "status": "Username already exists" })
            } else {
                console.log(input)
                let result = new adminModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

app.listen(8008, () => {
    console.log("Server started")
})