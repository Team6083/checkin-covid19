import { Card, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

function Today() {

    const [today, setToday] = useState([]);
    const [load, setLoad] = useState(false);

    const fetchToday = () => fetch('/api/checkinLog/today').then((r) => r.json());
    useEffect(() => {
        fetchToday().then((response) => {
            if (response.ok) {
                setLoad(true);
                setToday(response.today);
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
                                <h1>今日簽到人員</h1>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Checkin Time</th>
                                            <th>Temperature</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {today.length == 0 ?
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
                                            today.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{v.user.name}</td>
                                                        <td>{new Date(v.checkinAt).toLocaleString()}</td>
                                                        <td>{v.temperature === -1 ? "n/a" : v.temperature}</td>
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

export default Today