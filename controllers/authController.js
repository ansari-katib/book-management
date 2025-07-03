import jwt from 'jsonwebtoken';
import { registerUser, validateUser } from '../models/userModel.js';

export async function register(req, res) {
    const { email, password } = req.body;
    try {
        await registerUser(email, password);
        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        await validateUser(email, password);
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}
