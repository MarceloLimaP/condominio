const express = require("express");
const router = express.Router();
const { readUsers, findDocumentByUser, createSessions } = require('../mongoA')

router.post("/", async (req, res) => {
    const { userName, password } = req.body
    const users = await readUsers()
    const erros = {}

    if (userName.length == 0) {
        res.status(400).json({ Message: "Please insert your user name." })
        return
    };
    if (password == "") {
        res.status(400).json({ Message: "Please insert your password." })
        return
    };
    if (!users.find(e => e.UserName == userName)) {
        res.status(400).json({ Message: "That user doesn't exist!" })
        return
    };
    if (users.find(e => e.UserName == userName).Password !== password) {
        res.status(400).json({ Message: "Password doesn't match!" })
        return
    }
    else {
        const token = await findDocumentByUser(userName)
        await createSessions({ userName, token: token._id.toString() })
        res.status(200).json({
            token: token._id.toString(),
            Message: "Welcome Back!"
        })
    }
})

module.exports = router;