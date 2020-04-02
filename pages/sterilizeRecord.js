import { Card, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import Link from 'next/link'

function sterilizeRecord() {

    const [sterilizeLogs, setSterilizeLogs] = useState([]);
    const [load, setLoad] = useState(false);

    const fetchToday = () => fetch('/api/sterilizeLog/list').then((r) => r.json());

    useEffect(() => {
        fetchToday().then((response) => {
            if (response.ok) {
                setLoad(true);

                const result = response.result.sort((a, b) => {
                    return a.timestamp > b.timestamp ? 1 : a.timestamp == b.timestamp ? 0 : -1;
                });

                setSterilizeLogs(result);
            }
        });
    }, []);

    return (
        <div className="mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h1>消毒紀錄</h1>
                                <Link href="/sterilizeRecordAdd" passHref>
                                    <a className="btn btn-primary">消毒紀錄登記</a>
                                </Link>
                                <Table striped hover className="mt-2">
                                    <thead>
                                        <tr>
                                            <th>Sterilize Time</th>
                                            <th>User</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sterilizeLogs.length == 0 ?
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    {
                                                        load ?
                                                            <h5>Empty</h5> :
                                                            <div className="spinner-border text-primary">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                    }
                                                </td>
                                            </tr>
                                            :
                                            sterilizeLogs.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{new Date(v.timestamp).toLocaleString()}</td>
                                                        <td>{v.user.name}</td>
                                                        <td>
                                                            {v.location.map((v, i) => {
                                                                return <span key={i} className="badge badge-primary mx-1">{v.name}</span>
                                                            })}
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

export default sterilizeRecord