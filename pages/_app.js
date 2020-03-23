import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar, Nav } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import dynamic from 'next/dynamic';

import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import withGA from "next-ga";

const Background = dynamic(
    () => import('particles-bg'),
    {
        ssr: false
    }
)

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">CMS Robotics</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Link href="/" passHref>
                                <a className={"nav-link" + (router.pathname === "/" ? " active" : "")}>Home</a>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
            <Component {...pageProps} />
            <div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: "-1",
                top: "0px",
                left: "0px",
                opacity: "0.5"
            }}>
                <Background type="cobweb" />
            </div>
        </div >
    )
}

export default withGA("UA-161629179-1", Router)(App);