import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/image/logo_new_header.png";
// import React from 'react';
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState(null); // 紀錄目前點選的功能
  const handleClick = (item, path) => {
    setActiveItem(item); // 設定 active 狀態
    navigate(path); // 切換頁面
  };

  return (
    <>
      {/* Navbar（375px 以上顯示） */}
      <Navbar expand="md" className="header d-none d-sm-flex">
        <Container>
          <Navbar.Brand as={Link} to=".">
            <img className="logo" src={logo} alt="logo" />
          </Navbar.Brand>

          <Nav className="ms-auto nav">
            <Nav.Link as={Link} to="products">
              系列鏡框
            </Nav.Link>

            <Nav.Link as={Link} to="store">
              門市據點
            </Nav.Link>

            <Nav.Link as={Link} to="blog">
              部落格
            </Nav.Link>

            <Nav.Link as={Link} to="qa">
              常見問題
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Menu（375px 以下顯示） */}
      <Container fluid className="mobile-menu d-block d-sm-none">
        <Navbar.Brand href="/">
          <img className="logo py-3" src={logo} alt="logo" />
        </Navbar.Brand>
      </Container>
      <Row className="menu-grid g-0 d-sm-none">
        <Col
          xs={6}
          className={`menu-item text-center border py-2 ${
            activeItem === "products" ? "text-black" : "text-white"
          }`}
          onClick={() => handleClick("products", "/products")}
        >
          系列鏡框
        </Col>
        <Col
          xs={6}
          className={`menu-item text-center text-white border py-2 ${
            activeItem === "store" ? "text-black" : "text-white"
          }`}
          onClick={() => handleClick("store", "/store")}
          style={{ cursor: "pointer" }}
        >
          門市據點
        </Col>
        <Col
          xs={6}
          className={`menu-item text-center text-white border py-2 ${
            activeItem === "blog" ? "text-black" : "text-white"
          }`}
          onClick={() => handleClick("blog", "/blog")}
          style={{ cursor: "pointer" }}
        >
          部落格
        </Col>
        <Col
          xs={6}
          className={`menu-item text-center text-white border py-2  ${
            activeItem === "qa" ? "text-black" : "text-white"
          }`}
          onClick={() => handleClick("qa", "/qa")}
          style={{ cursor: "pointer" }}
        >
          常見問題
        </Col>
      </Row>
    </>
  );
}
export default Header;
