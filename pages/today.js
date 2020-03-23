import { Card, Table } from 'react-bootstrap'

import fetch from 'isomorphic-unfetch'

function Today({ today }) {
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
                                        {
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

const fetchTodayCHeckinLogs = () => {
    return fetch('http://localhost:3000/api/checkinLog/today').then((r) => r.json())
}

Today.getInitialProps = async ctx => {
    const data = await fetchTodayCHeckinLogs();
    
    return { today: data }
}

export default Today