import { Card, Alert } from 'react-bootstrap'

import CheckinForm from '../components/checkinForm'

const Index = props => {
    return (
        <div className="mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card style={{ backgroundColor: "rgba(255,255,255,0.8)" }}>
                            <Card.Body>
                                <h1>Checkin System for CMS Robotics Lab</h1>
                                <p>CMS Robotics 實驗室簽到系統</p>
                                <Alert variant="warning">
                                    在疫情嚴重期間，為了能確實掌握出入實驗室相關人員名單，請於進入實驗室前於此簽到
                                    <br />
                                    <strong>FRC 隊員請直接使用團隊的簽到系統</strong>
                                </Alert>
                                <hr />
                                <CheckinForm />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index