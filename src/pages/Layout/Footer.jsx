import { Link } from "react-router-dom";
import fb from "../../assets/image/ic-social-fb.png";
import ig from "../../assets/image/ic_social_ig.png";
import line from "../../assets/image/ic_social_line.png";
// import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";

function Footer() {
  return (
    <>
      <footer className="bg-subColor ">
        <Container>
          {/* block1 */}
          <Row className="border-bottom border-white pb-4 mb-3 ">
            {/* 左側：menu + contact */}
            <Col md={9}>
              {/* menu（md 以上才顯示） */}
              <ul className="d-none d-md-flex justify-content-between w-75 mb-4 list-unstyled">
                <li>
                  <a
                    href="./index.html"
                    className="text-white text-decoration-none"
                  >
                    首頁
                  </a>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-white text-decoration-none"
                  >
                    系列鏡框
                  </Link>
                </li>
                <li>
                  <Link to="/store" className="text-white text-decoration-none">
                    門市據點
                  </Link>
                </li>
                <li>
                  <a
                    href="./index.html"
                    className="text-white text-decoration-none"
                  >
                    部落格
                  </a>
                </li>
                <li>
                  <Link to="/qa" className="text-white ">
                    常見問題
                  </Link>
                </li>
              </ul>

              {/*  手機版：電話 + social icons（同一列） */}
              <div className="d-flex d-md-none justify-content-between align-items-center text-white mb-2">
                <div className="d-flex align-items-center">
                  <span className="material-icons-outlined me-2">call</span>
                  0800-000-000
                </div>

                <div className="d-flex gap-2">
                  <a href="#">
                    <img src={fb} alt="fb" className="footer-icon" />
                  </a>
                  <a href="#">
                    <img src={ig} alt="ig" className="footer-icon" />
                  </a>
                  <a href="#">
                    <img src={line} alt="line" className="footer-icon" />
                  </a>
                </div>
              </div>

              {/*  手機版：第二列 email */}
              <div className="d-flex d-md-none align-items-center text-white">
                <span className="material-icons-outlined me-2">email</span>
                glasses@business.com
              </div>

              {/* md 以上：contact info */}
              <div className="text-white d-none d-md-block">
                <p className="d-flex align-items-center mb-2 fs-3">
                  <span className="material-icons-outlined me-3">call</span>
                  0800-000-000
                </p>
                <p className="d-flex align-items-center mb-0 fs-3">
                  <span className="material-icons-outlined me-3">email</span>
                  glasses@business.com
                </p>
              </div>
            </Col>

            {/* md 以上：右側 social icons */}
            <Col
              md={3}
              className="d-none d-md-flex justify-content-end align-items-start gap-3"
            >
              <a href="#">
                <img src={fb} alt="fb" className="footer-icon" />
              </a>
              <a href="#">
                <img src={ig} alt="ig" className="footer-icon" />
              </a>
              <a href="#">
                <img src={line} alt="line" className="footer-icon" />
              </a>
            </Col>
          </Row>

          {/* block2 */}
          <Row className="flex-column flex-md-row justify-content-between text-white fs-6">
            <Col md="auto" className="mb-2 mb-md-0">
              Copyright © 2020 Glasses. All rights reserved.
            </Col>

            <Col md="auto">
              <ul className="list-unstyled d-flex flex-column flex-md-row gap-2 gap-md-4 mb-0">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    隱私權政策
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    服務條款
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
export default Footer;
