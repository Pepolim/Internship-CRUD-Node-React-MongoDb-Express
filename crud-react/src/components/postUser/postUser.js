import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./postUser.css";
import { useNavigate } from "react-router-dom";


const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        role: "", // Should be one of 'Intern', 'Tutor', or 'Admin'
        email: "",
        password: "",
        birthdate: "" // You might need to handle this as a Date type
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        //Prevents the default form submission behavior, which would cause the page to reload.
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json(response);
            console.log(data);
            navigate("/");
        }
        catch (error) {
            console.error(error.message);
        }

    }

    return (
        <>
            <div className="center-form">
                <h1>Post New User</h1>
                <Form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    {/* Role Field (Dropdown) */}
                    <Form.Group controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Intern">Intern</option>
                            <option value="Tutor">Tutor</option>
                            <option value="Admin">Admin</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    {/* Birthdate Field */}
                    <Form.Group controlId="formBasicBirthdate">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="dark" type="submit" className="w-100">
                        Post User
                    </Button>
                </Form>
            </div>


        </>
    )
}

export default PostUser;