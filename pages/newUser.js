import { Card } from 'react-bootstrap'
import { useRouter } from 'next/router'

import NewUserForm from '../components/newUserForm'

const newUser = () => {
    const router = useRouter();

    return (
        <div className="mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card style={{ backgroundColor: "rgba(255,255,255,0.8)" }}>
                            <Card.Body>
                                <h1>簽到系統資料填寫</h1>
                                <p>請填寫完成以下資料</p>
                                <hr />
                                <NewUserForm studentId={router.query.studentId} />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default newUser