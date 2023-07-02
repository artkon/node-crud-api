import { randomUUID } from 'node:crypto';


export const UUID_REGEXP = /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

export const UserDB = {
    users: [],
    getUsers() {
        return this.users;
    },
    getUser(uuid) {
        return this.users.find(({ id }) => (id === uuid));
    },
    createUser({ username, age, hobbies }) {
        const newUser = { id: randomUUID(), username, age, hobbies: (hobbies || [])  };
        this.users.push(newUser);

        return newUser;
    },
    deleteUser(uuid) {
        const userIndex = this.users.findIndex(({ id }) => (id === uuid));
        this.users.splice(userIndex, 1);
    },
    getIsValidUUID(uuid) {
        return UUID_REGEXP.test(uuid)
    },
    getIsValidUserData({ username, age, hobbies }) {
        const isUsernameValid = (typeof username === 'string') && username?.length;
        const isAgeValid = (typeof age === 'number') && (age > 0);
        const isValidHobbies = Array.isArray(hobbies) &&
            !hobbies.some((hobby) => (typeof hobby !== 'string'));

        return isUsernameValid && isAgeValid && (!hobbies || isValidHobbies);
    }
}
