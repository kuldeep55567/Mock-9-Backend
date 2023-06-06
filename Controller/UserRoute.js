const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../Middleware/auth")

UserRouter.post("/register", async (req, res) => {
    const { name, email, password, dob, bio, posts, friends, friendRequests } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ "ok": false, "mssg": "User Already Registered" })
    }
    bcrypt.hash(password, 8, async (err, hashed) => {
        try {
            const data = new UserModel({ name, email, password: hashed, dob, bio, posts, friends, friendRequests });
            await data.save();
            return res.status(201).json({ "ok": true, "mssg": "User Registered Successfully" })
        } catch (error) {
            return res.status(400).json({ "ok": false, "mssg": error.message })
        }
    })
})
UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ "ok": false, "mssg": "Register First" })
        }
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return res.status(401).json({ "ok": false, "mssg": "Invalid Credentials" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.Secret, { expiresIn: "2hr" });
        const response = {
            "Ok": true,
            "token": token,
            "mssg": "Login Successfull"
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
UserRouter.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
UserRouter.get("/users/:id/friends", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await UserModel.findById(ids);
        res.status(200).json(data.friends)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
UserRouter.post("/users/:id/friends", authMiddleware, async (req, res) => {
    const ids = req.params.id
    try {
        const friend = await UserModel.findById(ids);
        friend.friendRequests.push(req.user.id)
        await friend.save()
        return res.status(200).json({ "ok": true, "mssg": "Friend Request Sent Successfully" })
    } catch (error) {
        return res.status(500).json({ "ok": false, "mssg": error.message })
    }
})
UserRouter.patch("/users/:id/friends/:friendId", authMiddleware, async (req, res) => {
    const ids = req.params.id;
    const friendId = req.params.friendId;
    try {
        const { accepted } = req.body;
        const user = await UserModel.findById(ids);
        if (!user) {
            res.status(404).json({ "ok": false, "mssg": "User Not Found" })
        }
        const friend = await UserModel.findById(friendId);
        if (!friend) {
            res.status(404).json({ "ok": false, "mssg": "Friend Not Found" })
        }
        if (accepted==false) {
            user.friendRequests.pull(friendId)
        } else {
            user.friendRequests.pull(friendId)
            user.friends.push(friendId)
            friend.friends.push(ids)
        }
        await user.save()
        await friend.save()
        res.status(200).json({ "ok": true, "mssg": "Friend Request Updated Successfully" })
    } catch (error) {
        res.status(500).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = { UserRouter }
// {
//     "_id": {
//       "$oid": "647ed91253166db78492d114"
//     },
//     "name": "Kanha",
//     "email": "kanha@gmail.com",
//     "password": "$2b$08$KxqdjNXNRE5xBAC40yFAPeGnHIlnGxzDWk.hERdsfZaAFV7H1L5w.",
//     "dob": {
//       "$date": "2002-02-03T00:00:00.000Z"
//     },
//     "bio": "I am a masai Student",
//     "posts": [],
//     "friends": [],
//     "friendRequests": [
//       {
//         "$oid": "647ed95a53166db78492d11a"
//       }
//     ]
//   }
