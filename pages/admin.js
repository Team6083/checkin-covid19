import { Card, Badge, Table, Button } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'
import * as jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'

import Router from 'next/router'

import { toast } from 'react-toastify'

const fetchTokens = async (userName, token, setTokens) => {
    const tokens = await fetch(`/api/admin/tokens?userName=${userName}`, { headers: { token } }).then((res) => res.json());
    if (tokens.ok) {
        setTokens(tokens.tokens);
    }
}

const Admin = props => {
    const [adminUser, setAdminUser] = useState({});
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const jwt = jwt_decode(token);
            if (new Date(jwt.exp * 1000) < new Date()) {
                localStorage.removeItem('token');
                Router.push("/login");
            } else {
                setAdminUser(jwt);
            }
        } else {
            Router.push("/login");
        }
    }, []);

    useEffect(() => {
        if (adminUser) {
            fetchTokens(adminUser.userName, localStorage.getItem('token'), setTokens);
        }
    }, [adminUser]);

    return (
        <div className="mt-5">
            <div className="container">
                <div className="row my-2">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h3>Login as <Badge variant="info">{adminUser.userName}</Badge></h3>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h3>Your tokens</h3>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>jti</th>
                                            <th>iat</th>
                                            <th>exp</th>
                                            <th>scopes</th>
                                            <th>actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tokens.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{v.jti}</td>
                                                        <td>{new Date(v.iat).toLocaleString()}</td>
                                                        <td>{new Date(v.exp).toLocaleString()}</td>
                                                        <td>{v.scopes}</td>
                                                        <td>
                                                            <Button variant="warning" size="sm" onClick={() => {
                                                                const toastId = toast(`revoke token: ${v.jti}`);

                                                                fetch(`/api/admin/revokeToken?jti=${v.jti}`, { headers: { token: localStorage.getItem("token") } }).then((r) => r.json())
                                                                    .then((response) => {
                                                                        if (response.ok) {
                                                                            toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "token revoke successful" });
                                                                            fetchTokens(adminUser.userName, localStorage.getItem("token"), setTokens);
                                                                        } else {
                                                                            toast.update(toastId, { type: toast.TYPE.ERROR, render: `error: ${response.error}` });
                                                                        }
                                                                    })
                                                            }}>revoke token</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin