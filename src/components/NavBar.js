import React, {useContext} from 'react';
import {Context} from "../index";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const NavBar = observer( () => {
    const history = useNavigate();
    const {user} = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand to={SHOP_ROUTE}>Купи Девайс</Navbar.Brand>
                { user.isAuth ?
                    <Nav className="mr-auto">
                        <Button
                            className="me-sm-2"
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
