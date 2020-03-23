import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'
import Link from 'next/link';

function checkinForm() {

    const [studentId, setStudentId] = useState("");
    const [temperature, setTemperature] = useState(-1);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            studentId,
            temperature
        };

        const toastId = toast("Processing...");

        fetch('/api/checkinLog/create', {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((r) => r.json()).then((res) => {
            console.log(res);

            if (res.ok) {
                toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "簽到成功" });
                setStudentId("");
            } else {
                if (res.error === "user_not_found") {
                    toast.update(toastId, { type: toast.TYPE.WARNING, render: <span>你是第一次登入，<Link href={`/newUser?studentId=${studentId}`}>按此填寫個人資料</Link></span> });
                } else {
                    toast.update(toastId, { type: toast.TYPE.ERROR, render: `Error: ${res.error}` });
                }
            }
        })
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>StudentId / 學號</Form.Label>
                <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                <Form.Text className="text-muted">
                    學生請輸入學號 / 老師請輸入學校的email / 其他來賓請點此
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Body Temperature / 體溫</Form.Label>
                <Form.Control type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                <Form.Text className="text-muted">
                    若沒有辦法量測體溫，請填寫-1
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit / 送出
            </Button>
        </Form>
    )
}

export default checkinForm
