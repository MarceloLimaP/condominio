const express = require("express");
const router = express.Router();

const { checkEmail, checkPasswordStrength } = require('../functions/functions');
const { createAccByEmail, readUsers } = require('../mongoA')

router.post('/', async (req, res) => {
    const { email, userName, password, passwordConfirmation } = req.body;
    const errors = {};
    const users = await readUsers();

    if (checkEmail(email)) {
        errors.Message = checkEmail(email);
        res.status(400).json(errors);
        return
    };
    if (users.some(e => e.email === email)) {
        errors.Message = "This email is already registred!";
        res.status(400).json(errors);
        return
    };
    if (checkPasswordStrength(password) < 4) {
        errors.Message = "Your Password must have at least an uppercase letter, a number and a special character."
        res.status(400).json(errors)
        return
    };
    if (userName.length == 0) {
        errors.Message = "Please insert your name."
        res.status(400).json(errors)
        return
    };
    if (password !== passwordConfirmation) {
        errors.Message = "Password doesn't match!"
        res.status(400).json(errors)
        return
    }
    else {
        await createAccByEmail({
            Email: email,
            UserName: userName,
            Password: password,
        })
        res.status(200).json({ Message: "Your Account has been created!" })
    }
})

module.exports = router;

