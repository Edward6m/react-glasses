import React, { useState } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon1 from "../assets/image/home-section2-1.png";
import icon2 from "../assets/image/home-section2-2.png";
import icon3 from "../assets/image/home-section2-3.png";
import icon4 from "../assets/image/home-section2-4.png";
import catg1 from "../assets/image/home-section3-1.png";
import catg2 from "../assets/image/home-section3-2.png";
import catg3 from "../assets/image/home-section3-3.png";
import cobrand1 from "../assets/image/home-section4-1.png";
import cobrand2 from "../assets/image/home-section4-2.png";
import test1 from "../assets/image/home-section5-1.png";
import test2 from "../assets/image/home-section5-2.png";
import test3 from "../assets/image/home-section5-3.png";
import test4 from "../assets/image/home-section5-4.png";

function Home() {
  const services = [
    {
      title: "單一價格",
      desc: "無論任何度數皆不需追加費用即可擁有適合自己的薄型球面鏡片。",
      icon: icon1,
    },
    {
      title: "20分鐘即可取件",
      desc: "為了您的寶貴時間著想，以豐富專業知識與技術將結帳到交件的時間縮減至最快 20 分鐘即可完成。",
      icon: icon2,
    },
    {
      title: "安心售後服務",
      desc: "我們提供長達 120 天的保固售後服務，不限會員資格皆享有免費深層保養及專業維修服務。",
      icon: icon3,
    },
    {
      title: "關於鏡片",
      desc: "使用世界知名頂級品牌，抗UV、防汙鍍膜薄型非球面鏡片。",
      icon: icon4,
    },
  ];

  const categories = [
    { label: "OPTICAL", img: catg1 },
    { label: "SUNGLASSES", img: catg2 },
    { label: "FUNCTIONAL", img: catg3 },
  ];

  const testimonials = [
    {
      name: "Jessy",
      date: "2021/06/20",
      text: "眼鏡品質優良，下次還會想來這邊購買！",
      pic: test1,
    },
    {
      name: "凱倫",
      date: "2021/04/18",
      text: "做工細緻、鏡架很輕盈，待久也不會覺得有負擔，推薦給大家！",
      pic: test2,
    },
    {
      name: "悠悠",
      date: "2020/12/25",
      text: "謝謝客服人員的詳細回答，成功買到了喜歡的眼鏡，下次會再回購！",
      pic: test3,
    },
    {
      name: "Kyuan",
      date: "2020/10/31",
      text: "服務很好，品質沒有任何問題，非常喜歡。",
      pic: test4,
    },
  ];
  const [agree, setAgree] = useState(false);

  return (
    <div className="">
      {/*  Hero  */}

      <div className="hero py-5">
        <Container className="hero-content">
          <p className="mb-3 hero-title1 ft-color">
            Promise-Desert 2020 早春系列
          </p>
          <p className="hero-title ft-color fw-bold mb-4">看得清，才能看得遠</p>
          <Button className="btn rounded-0" as={Link} to={`/products/`}>
            立即購買
          </Button>
        </Container>
      </div>

      {/*  feature  */}

      <section className="feature py-5">
        <Container className="px-0">
          <h2 className="text-center mb-4 fw-bold mt-20 class-title">
            用專業的心，做專業的事
          </h2>
          <Row className="g-4 justify-content-center">
            {services.map((s, idx) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={idx}
                className="d-flex justify-content-center"
              >
                <Card className="border-0 w-100 feature-card">
                  <Card.Body className="feature-list">
                    <img
                      className="feature-icon"
                      src={s.icon}
                      alt={`${s.title} icon`}
                    />
                    <Card.Title className="feature-item">{s.title}</Card.Title>
                    <Card.Text className="feature-desc mb-20">
                      {s.desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/*  classic  */}
      <section>
        <div className="bg-white py-30">
          <Container>
            <h3 className="class-title text-center fw-bold mb-12">
              經典系列鏡框
            </h3>
            <Row className="justify-content-center">
              {categories.map((cat, idx) => (
                <Col
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  key={idx}
                  className="d-flex justify-content-center mb-4"
                >
                  <Card className="classic border-0 text-center">
                    <Card.Img src={cat.img} alt={cat.label} />
                    <Card.Title className="classic-text fw-bold fst-italic text-center p-2">
                      {cat.label}
                    </Card.Title>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </section>

      {/*  Collaboration   */}
      <section className="cobrand" aria-label="聯名設計鏡框">
        <div className="container">
          {/* 確保 Container 類別名稱正確 */}
          <h2 className="d-block class-title text-white fw-bold mb-6 text-center">
            聯名設計鏡框
          </h2>
          {/* 增加 cobrand-list 類別 */}
          <div className="d-flex cobrand-list">
            {/* 增加 cobrand-item 類別包裹每一組 */}
            <div className="cobrand-item">
              <img src={cobrand1} className="cobrand-img" alt="DOUBLE A+" />
              <div className="classic-text fw-bold fst-italic text-center bg-white">
                DOUBLE A+
              </div>
            </div>
            <div className="cobrand-item">
              <img src={cobrand2} className="cobrand-img" alt="YOUTH" />
              <div className="classic-text fw-bold fst-italic text-center bg-white">
                YOUTH
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Testimonials    */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-20">
            <h2 className="class-title fw-bold text-center mb-12 mt-20">
              顧客推薦
            </h2>
            {testimonials.map((t, idx) => (
              <Col md={3} sm={6} key={idx} className="mb-4 d-flex">
                <Card className="h-100 w-100 d-flex flex-column  custom-card-shadow">
                  {/* 圖片貼齊卡片左右邊線 */}
                  <Card.Img
                    variant="top"
                    src={t.pic}
                    alt={t.name}
                    style={{
                      maxHeight: "306px",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Card.Body 撐滿剩餘高度，底部文字切齊 */}
                  <Card.Body className="d-flex flex-column justify-content-between ">
                    <div>
                      <Card.Title className="test_name mt-4">
                        {t.name}
                      </Card.Title>
                      <Card.Text className="test_name mt-2 mb-8 test_mb">
                        {t.text}
                      </Card.Text>
                    </div>
                    <Card.Subtitle className="test_date  text-muted ">
                      {t.date}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/*  Contact     */}
      <section className="contact-bg">
        <Container className="py-5 d-flex flex-column align-items-center ">
          <h2 className="class-title fw-bold text-center mb-12 mt-20">
            聯絡我們
          </h2>

          <Form className="contact-form ">
            <p>
              我們相當重視您的意見，若您有任何疑問，可先參考「常見問題」，若仍有任何問題，請填妥以下資料，我們會在近期與您聯繫。
            </p>
            <Form.Group controlId="formName">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="text"
                placeholder="陳小明"
                className="contact-border rounded-0 contact-bg"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>聯絡電話</Form.Label>
              <Form.Control
                type="tel"
                placeholder="0912-345-678"
                className="contact-border rounded-0 contact-bg"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                className="contact-border rounded-0 contact-bg"
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>意見反應</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="請輸入您的意見"
                rows={4}
                className="contact-border rounded-0 contact-bg"
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="我同意隱私權政策，並同意依隱私權政策中所述的方式處理自己的資料。"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mb-4 custom-checkbox"
            />

            <Button
              variant="danger"
              size="lg"
              type="submit"
              disabled={!agree}
              className="mt-12 mb-20 btn-custom fw-bold rounded-0 d-block mx-auto"
            >
              確認送出
            </Button>
          </Form>
        </Container>
      </section>
    </div>
  );
}
export default Home;
