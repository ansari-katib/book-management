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

    // Check if email already exists
    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) throw new Error('email already exist');

    const id = Date.now().toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    users[id] = { email, password: hashedPassword };

    await writeUsers(users);
}

export async function validateUser(email, password) {
    const users = await readUsers();

    // Find the user by email
    const userEntry = Object.entries(users).find(([id, user]) => user.email === email);
    if (!userEntry) throw new Error('Invalid credentials');

    const [id, user] = userEntry;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return { id, email: user.email }; // Return more if needed
}
