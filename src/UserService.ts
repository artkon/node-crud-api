import { randomUUID } from 'node:crypto';

import { UUID_REGEXP } from './constants.ts';


interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

interface UserDB {
    users: User[];
}

interface UserServiceClass {
    db: UserDB;
}

const userDB: UserDB = {
    users: [],
};

class UserServiceClass {
    constructor(userDb: UserDB) {
        this.db = userDb;
    }
    getUsers() {
        return this.db.users;
    }
    getUser(uuid) {
        return this.db.users.find(({ id }) => (id === uuid));
    }
    createUser({ username, age, hobbies }) {
        const newUser = { id: randomUUID(), username, age, hobbies: (hobbies || [])  };
        this.db.users.push(newUser);

        return newUser;
    }
    deleteUser(uuid) {
        const userIndex = this.db.users.findIndex(({ id }) => (id === uuid));
        this.db.users.splice(userIndex, 1);
    }
    getIsValidUUID(uuid) {
        return UUID_REGEXP.test(uuid)
    }
    getIsValidUserData({ username, age, hobbies }) {
        const isUsernameValid = (typeof username === 'string') && username.length;
        const isAgeValid = (typeof age === 'number') && (age > 0);
        const isValidHobbies = Array.isArray(hobbies) &&
            hobbies.every(hobby => (typeof hobby === 'string'));

        return isUsernameValid && isAgeValid && (!hobbies || isValidHobbies);
    }
}
const UserService: UserServiceClass = new UserServiceClass(userDB);

export { UserService };
