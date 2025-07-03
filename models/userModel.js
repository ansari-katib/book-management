import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(_dirname, '../data/users.json');

async function readUsers() {
    try {
        const data = await fs.readFile(usersFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

async function writeUsers(users) {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}


export async function registerUser(email, password) {
    const users = await readUsers();
    if (users[email]) throw new Error('email already exist');
    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 hash password
    users[email] = { password : hashedPassword}
    await writeUsers(users);
}

export async function validateUser(email, password) {
    const users = await readUsers();
    const user = users[email];

    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password); 
    if (!isValid) throw new Error('Invalid credentials');

    return { email };
}