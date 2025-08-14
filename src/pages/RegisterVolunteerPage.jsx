import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterVolunteerPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
        email: '',
        phone: '',
        occupation: '',
        dateOfBirth: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            authService.registerVolunteer(formData);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register as a Volunteer</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <Input name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    <Input name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
                    <Input name="dateOfBirth" type="date" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} />
                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </Card>
        </div>
    );
};

export default RegisterVolunteerPage;