import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Router from 'next/router'

function sterilizeForm() {

    const [studentId, setStudentId] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/sterilizeLocation/list').then(r => r.json())
            .then((res) => {
                setLoaded(true);
                setLocations(res.result);

                let selected = {};
                res.result.forEach((v) => {
                    selected[v.id] = false;
                })

                setSelectedLocations(selected);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        let selectedLocation = [];

        for (let i = 0; i < Object.keys(selectedLocations).length; i++) {
            let k = Object.keys(selectedLocations)[i];
            if (selectedLocations[k]) selectedLocation.push(parseInt(k));
        }

        const data = {
            studentId,
            locationIds: selectedLocation
        };

        const toastId = toast("Processing...");

        fetch('/api/sterilizeLog/create', {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((r) => r.json()).then((res) => {
            console.log(res);

            if (res.ok) {
                toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "紀錄成功" });
                Router.push("/sterilizeRecord");
            } else {
                if (res.error === "user_not_found") {
                    toast.update(toastId, { type: toast.TYPE.WARNING, render: <span>你是第一次使用，<Link href={`/newUser?studentId=${studentId}`}>按此填寫個人資料</Link></span> });
                } else {
                    toast.update(toastId, { type: toast.TYPE.ERROR, render: `Error: ${res.error}` });
                }
            }
        })
    };

    return loaded ? (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>StudentId / 學號</Form.Label>
                <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                <Form.Text className="text-muted">
                    學生請輸入學號 / 老師請輸入學校的email / 其他來賓請點此
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>消毒地點</Form.Label>
                <Form.Control as="select" multiple onChange={function (e) {
                    const options = e.target.options;
                    const value = {};
                    for (let i = 0, l = options.length; i < l; i++) {
                        value[options[i].value] = options[i].selected;
                    }
                    setSelectedLocations(value);
                }}>
                    {
                        locations.map((v, i) => {
                            return <option selected={selectedLocations[v.id]} value={v.id} key={i}>{v.name}</option>
                        })
                    }
                </Form.Control>
            </Form.Group>

            <Button className="mx-1" variant="primary" type="submit">
                Submit / 送出
            </Button>
            <Button className="mx-1" variant="secondary" type="button" onClick={() => Router.push("/sterilizeRecord")}>
                Back / 返回
            </Button>
        </Form >
    ) : (
            <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
            </div>
        )
}

export default sterilizeForm
