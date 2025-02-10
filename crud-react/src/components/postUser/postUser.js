import React, { useState } from "react";
import {Form, Button } from "react-bootstrap";
import "./postUser.css";
import { useNavigate } from "react-router-dom";


const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        /*
        console.log(formData.name);
        console.log(formData.email);
        console.log(formData.phone);
        */
        try{
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
        catch(error){
            console.error(error.message);
        }
        
    }

    return (
        <>
            <div className="center-form">
                <h1>Post new User</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            type="phone" 
                            placeholder="Enter phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Post User
                    </Button>

                </Form>
            </div>

        </>
    )
}

export default PostUser;