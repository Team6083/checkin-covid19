import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'
import Router from 'next/router'

function checkinForm({ studentId: defaultStudentId }) {

    const [studentId, setStudentId] = useState(defaultStudentId || "");
    const [name, setName] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            studentId,
            name
        };

        const toastId = toast("Processing...");

        fetch('/api/user/create', {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((r) => r.json()).then((res) => {
            console.log(res);

            if (res.ok) {
                toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "資料建立成功，請重新簽到一次" });
                setStudentId("");
                setName("");
                Router.push("/");
            } else {
                toast.update(toastId, { type: toast.TYPE.ERROR, render: `Error: ${res.error}` });
            }
        })
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>StudentId / 學號</Form.Label>
                <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                <Form.Text className="text-muted">
                    學生請輸入學號 / 老師請輸入學校的email
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Name / 姓名</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit / 送出
            </Button>
        </Form>
    )
}

export default checkinForm
