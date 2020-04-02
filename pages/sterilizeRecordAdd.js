import { Card } from 'react-bootstrap'

import SterilizeForm from '../components/sterilizeForm'

function sterilizeRecordAdd() {
    return (
        <div className="mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h1>新增消毒紀錄</h1>
                                <hr />
                                <SterilizeForm />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default sterilizeRecordAdd