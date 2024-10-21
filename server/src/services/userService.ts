import db from '../config/database/connection';
import { users } from '../config/database/schema';

export const getAllUsers = async () => {
    const allUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: ''
        },
    ];
    return allUsers;
}