const express = require("express")
const app = express()
const port = process.env.PORT ?? 3500

app.use(express.json())

const routerSignup = require('./routes/signup')
const routerLogin = require('./routes/login')


app.use('/signup', routerSignup)
app.use('/login', routerLogin)
app.listen(port, () => console.log(`Server is running at port ${port}`))