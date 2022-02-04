const express = require('express');
const app = express();
const port = process.env.PORT ?? 3003

const {
    connectToMongo,
    getMongoCollection,
    insertUser,
    findUserByEmail,
    insertSession,
    findSessionByToken,
    updateSession,
    findUserById } = require('./db')

const {
    updatePomodoro } = require('./analytics')

const {
    createComment, readAllComments } = require('./community')

app.use(express.json());




async function verifyUser(req, res, next) {
    console.log(req.headers)
    const auth = req.headers.authorization?.split(' ') ?? []
    console.log(auth)
    if (auth.length > 0) {
        console.log("primeiro")
        const session = await findSessionByToken(auth[1])
        if (session && session.expiresAt > new Date()) {
            console.log("antes")
            console.log(session)
            await updateSession(session._id)
            console.log("depois")
            req.user = await findUserById(session.userId)
            console.log("dpsdps");
            next()
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}


app.post("/signup", async (req, res) => {
    const errors = await validateNewUser(req.body)
    console.log(errors)
    if (Object.keys(errors).length === 0) {
        // Criar utilizador
        const { passwordConfirmation, ...user } = req.body
        const id = await insertUser(user)

        res.status(201).json({
            "message": "User created!",
            "_id": id,
        })
        return
    }

    res.status(400).json({
        message: "Data is not valid.",
        errors
    })


})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user || user.password !== password)
        return res
            .status(401)
            .json({ message: "Incorrect username and password combination." })

    const token = await insertSession(user._id)
    res.status(200).json({ token })
})


// app.post("/login", async (req, res) => {
//     const { username, password } = req.body
//     const id = await findUserByUsername(username)
//     if (!id || id.password !== password)
//         return res
//             .status(404)
//             .json({ errors: { username: "Incorrect username and password combination." } })

//     const token = await insertSession({ username: username })
//     res.status(200).json({ token })
// })


app.get("/user", verifyUser, (req, res) => {
    res
        .status(200)
        .json(req.user)
})

////////// ANALYTICS /////////

app.get('/user/analytics', verifyUser, (req, res) => {
    res.status(200).json({ pomodoro: req.user.pomodoro })
})

app.patch('/user/analytics', verifyUser, async (req, res) => {
    console.log(req.body.pomodoro)
    let updated = await updatePomodoro(req.user._id, req.body.pomodoro)
    let pomodoroUpdated = await findUserById(req.user._id)

    res.status(200).json(pomodoroUpdated)
})

//////// COMMENTS ////////

app.post('/comment', verifyUser, async (req, res) => {
    const { Text } = req.body
    console.log(Text)
    console.log("1")
    const user = await findUserById(req.user._id)
    console.log(user)
    console.log("2")
    if (!user) {
        res.sendStatus(404)
    } else {
        const newComment = await createComment(user, Text)
        console.log(Text)
        console.log("3")
        res.status(201).json(newComment)


    }
})

app.get('/comment', async (req, res) => {
    const comments = await readAllComments()
    res
        .status(200)
        .json(comments)
})

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))

/////////////////////////////////////////////////////

async function validateNewUser(data) {
    const errors = {}

    if (data.name.length < 3) {
        errors.name = "Your name should cannot have less than 3 characters."
    }
    else if (/[0123456789]/.test(data.name)) {
        errors.name = "Please insert a valid name."
    }

    if (data.email === undefined || data.email.length === 0) {
        errors.email = "Please insert your email."
    } else if (!validateEmail(data.email)) {
        errors.email = "Please insert a valid email."
    } else if (Boolean(await findUserByEmail(data.email))) {
        errors.email = "This email had already been registered."
    }

    if (data.password === undefined) {
        errors.password = "Please insert your password."
    } else {
        const passwordStrength = checkPasswordStrength(data.password)
        if (data.password.length === 0) {
            errors.password = "Please insert your password."
        } else if (passwordStrength === 0) {
            errors.password = " Password should contain at least 8 characters."
        } else if (passwordStrength < 4) {
            errors.password = "Your password must have at least a number, a lower case and an upper case."
        }
    }

    if (data.passwordConfirmation === undefined || data.passwordConfirmation.length === 0) {
        errors.passwordConfirmation = "Please insert your password again."
    } else if (data.password !== data.passwordConfirmation) {
        errors.passwordConfirmation = "Passwords do not match."
    }

    if (!data.acceptsTerms) {
        errors.acceptsTerms = "You have to accept terms to proceed."
    }

    return errors
}


function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

function checkPasswordStrength(password) {
    if (password.length < 8) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[~!@#$%^&*)(+=._-]/
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}
