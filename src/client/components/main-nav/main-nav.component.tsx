import React, { useState, useCallback } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

export const MainNav: React.FC = () => {
    const [expanded, setExpanded] = useState(true);
    const onToggle = useCallback(() => setExpanded(!expanded), []);

    return (
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Todos</NavbarBrand>
                <NavbarToggler onClick={onToggle} />
                <Collapse isOpen={expanded} navbar>
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink href="https://github.com/coroki/todo-mern">Github</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};
