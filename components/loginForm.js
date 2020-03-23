import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import Router from 'next/router'

import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'

function checkinForm() {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/api/admin/login", {
            method: "post",
            body: JSON.stringify({
                userName,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((r) => r.json())
            .then((response) => {
                if (!response.ok) {
                    toast.error(`Error: ${response.error}`);
                } else {
                    localStorage.setItem("token", response.token);
                    toast.success("Login successful!!");
                    Router.push("/admin");
                }
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default checkinForm
