const USERS_KEY = 'schoolhelp_users';
const CURRENT_USER_KEY = 'schoolhelp_currentUser';

// Helper function to get users from localStorage
const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
    registerVolunteer: (userData) => {
        const users = getUsers();
        const existingUser = users.find(user => user.username === userData.username || user.email === userData.email);

        if (existingUser) {
            throw new Error('Username or email already exists.');
        }

        // In a real app, hash the password here. For now, we store it as is.
        const newUser = { ...userData, role: 'Volunteer' };
        users.push(newUser);
        saveUsers(users);
        return newUser;
    },

    login: (username, password) => {
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password.');
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    }
};