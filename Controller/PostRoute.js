const express = require("express");
const PostRouter = express.Router();
const { PostModel } = require("../Model/PostModel");
const { authMiddleware } = require("../Middleware/auth");
PostRouter.get("/posts", async (req, res) => {
    try {
        const data = await PostModel.find().populate('comments.user','name');
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.post("/posts", authMiddleware, async (req, res) => {
    try {
        const { text, image } = req.body
        const data = new PostModel({ user: req.user.id, text, image });
        await data.save()
        res.status(201).json({ "ok": true, "mssg": "Posted Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.patch("/posts/:id", authMiddleware, async (req, res) => {
    let ids = req.params.id
    try {
        const data = await PostModel.findByIdAndUpdate(ids, req.body)
        await data.save()
        res.status(201).json({ "ok": true, "mssg": "Post updated Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.delete("/posts/:id", authMiddleware, async (req, res) => {
    let ids = req.params.id
    try {
        const data = await PostModel.findByIdAndDelete(ids)
        res.status(201).json({ "ok": true, "mssg": "Post Deleted Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.post("/posts/:id/like", authMiddleware, async (req, res) => {
    const ids = req.params.id;
    try {
        const liked = await PostModel.findByIdAndUpdate(ids, { $addToSet: { likes: req.user.id } }, { new: true })
        if (!liked) {
            return res.status(404).json({ "ok": false, "mssg": "Post Unavailable" })
        }
        return res.status(200).json({ "ok": true, liked })
    } catch (error) {
        return res.status(500).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.post("/posts/:id/comment", authMiddleware, async (req, res) => {
    const ids = req.params.id;
    const {text} = req.body
    try {
        const commented = await PostModel.findByIdAndUpdate(ids, { $push: { comments: {user:req.user.id,text:text}} }, { new: true })
        if (!commented) {
            return res.status(404).json({ "ok": false, "mssg": "Post Unavailable" })
        }
        return res.status(200).json({ "ok": true, commented })
    } catch (error) {
        return res.status(500).json({ "ok": false, "mssg": error.message })
    }
})
PostRouter.get("/posts/:id",async(req,res)=>{
    const ids = req.params.id
    try {
        const data = await PostModel.findById(ids).populate('comments.user','name');
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = { PostRouter }
// {
//     "_id": {
//       "$oid": "647ee5f79542c60ad4d50169"
//     },
//     "user": {
//       "$oid": "647ed91253166db78492d114"
//     },
//     "text": "Hello How are you guys",
//     "image": "image/png",
//     "likes": [
//       {
//         "$oid": "647ed91253166db78492d114"
//       }
//     ],
//     "createdAt": {
//       "$date": "2023-06-06T07:53:27.435Z"
//     },
//     "comments": [
//       {
//         "user": {
//           "$oid": "647ed91253166db78492d114"
//         },
//         "text": "I am loving Revisions",
//         "_id": {
//           "$oid": "647eeadcf84ff6030cd432b3"
//         },
//         "createdAt": {
//           "$date": "2023-06-06T08:14:20.762Z"
//         }
//       }
//     ]
//   }