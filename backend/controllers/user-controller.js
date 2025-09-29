export const postSignup = (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "User signed up successfully!" })
}

export const postLogin = (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "User logged in successfully!" })
}

export const postLogout = (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "User logged out successfully!" })
}