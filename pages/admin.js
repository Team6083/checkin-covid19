import { Card, Badge, Table, Button } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'
import * as jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

const fetchTokens = async (userName, setTokens) => {
    const tokens = await fetch(`/api/admin/tokens?userName=${userName}`).then((res) => res.json());
    setTokens(tokens);
}

const Admin = props => {
    const [adminUser, setAdminUser] = useState({});
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAdminUser(jwt_decode(token));
        }
    }, []);

    useEffect(() => {
        if (adminUser) {
            fetchTokens(adminUser.userName, setTokens);
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

                                                                fetch(`/api/admin/revokeToken?jti=${v.jti}`).then((r) => r.json())
                                                                    .then((response) => {
                                                                        if (response.ok) {
                                                                            toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "token revoke successful" });
                                                                            fetchTokens(adminUser.userName, setTokens);
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