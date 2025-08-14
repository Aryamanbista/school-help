import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = authService.login(formData.username, formData.password);
            // This reload is a simple way to update the app state.
            // We'll replace this with a better state management solution later.
            window.location.href = '/'; // Redirect to home and reload
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;```
Now, you should be able to go to the `/register-volunteer` page, create a user, and then log in with those credentials on the `/login` page. The user data will be saved in your browser's Local Storage. The "hard refresh" in the login function is a temporary measure that we will improve upon.

In the next phase, we will introduce a global context for state management to avoid the page reload, make the navigation bar dynamic based on login status, and start building out the dashboard for volunteers.```