import React, { useState } from 'react';

function RegisterComponent() {
    const [userType, setUserType] = useState('user');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // event.preventDefault();
        // handle form submission here
        console.log(handleSubmit);
    };

    return (
        <div className="register-hero">
            <div className="register-form-box">
                <div className="title">
                    <h1>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="email" placeholder="Email" />
                    <input type='number' placeholder="Phone Number" />
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterComponent;