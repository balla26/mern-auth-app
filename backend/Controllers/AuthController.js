const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const{name, email, password} = req.body;
        const user = await UserModel.findOne({ email})
        if (user) {
            return res.status(400).json({ message: 'User already exist, please login', success: false });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(200).json({ message: 'Signup successful', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const{email, password} = req.body;
        const user = await UserModel.findOne({ email})
        if (!user) {
            return res.status(400).json({ message: 'Email or Password is incorrect', success: false });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Email or Password is incorrect', success: false });
        }
        const jwtToken = jwt.sign(
            {_id : user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )
        res.status(200).json({ message: 'Login successful', success: true, jwtToken, email, name: user.name });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = {
    signup,
    login
}