import { useState, useCallback, memo, useEffect } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushToast } from "../slice/toastSlice";

// ── Assets ──────────────────────────────────────────────
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

// ── Types ────────────────────────────────────────────────
interface Service {
  title: string;
  desc:  string;
  icon:  string;
}

interface Category {
  label: string;
  img:   string;
}

interface CoBrand {
  name: string;
  img:  string;
}

interface Testimonial {
  name: string;
  date: string;
  text: string;
  pic:  string;
}

interface ContactFormState {
  name:    string;
  phone:   string;
  email:   string;
  message: string;
  agree:   boolean;
}

// ── Static Data ──────────────────────────────────────────
const SERVICES: Service[] = [
  { title: "單一價格",       desc: "無論任何度數皆不需追加費用即可擁有適合自己的薄型球面鏡片。",                                icon: icon1 },
  { title: "20分鐘即可取件", desc: "為了您的寶貴時間著想，以豐富專業知識與技術將結帳到交件的時間縮減至最快 20 分鐘即可完成。", icon: icon2 },
  { title: "安心售後服務",   desc: "我們提供長達 120 天的保固售後服務，不限會員資格皆享有免費深層保養及專業維修服務。",       icon: icon3 },
  { title: "關於鏡片",       desc: "使用世界知名頂級品牌，抗UV、防汙鍍膜薄型非球面鏡片。",                                    icon: icon4 },
];

const CATEGORIES: Category[] = [
  { label: "OPTICAL",    img: catg1 },
  { label: "SUNGLASSES", img: catg2 },
  { label: "FUNCTIONAL", img: catg3 },
];

const CO_BRANDS: CoBrand[] = [
  { name: "DOUBLE A+", img: cobrand1 },
  { name: "YOUTH",     img: cobrand2 },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Jessy", date: "2021/06/20", text: "眼鏡品質優良，下次還會想來這邊購買！",                         pic: test1 },
  { name: "凱倫",  date: "2021/04/18", text: "做工細緻、鏡架很輕盈，待久也不會覺得有負擔，推薦給大家！",     pic: test2 },
  { name: "悠悠",  date: "2020/12/25", text: "謝謝客服人員的詳細回答，成功買到了喜歡的眼鏡，下次會再回購！", pic: test3 },
  { name: "Kyuan", date: "2020/10/31", text: "服務很好，品質沒有任何問題，非常喜歡。",                       pic: test4 },
];

const INITIAL_FORM: ContactFormState = {
  name: "", phone: "", email: "", message: "", agree: false,
};

const FORM_FIELDS = [
  { id: "name",  label: "姓名",     type: "text",  placeholder: "陳小明"          },
  { id: "phone", label: "聯絡電話", type: "tel",   placeholder: "0912-345-678"    },
  { id: "email", label: "電子郵件", type: "email", placeholder: "you@example.com" },
] as const;

// ── Sub Components ───────────────────────────────────────
const ServiceCard = memo(({ title, desc, icon }: Service) => (
  <Card className="border-0 w-100 feature-card">
    <Card.Body className="feature-list">
      <img className="feature-icon" src={icon} alt={`${title} icon`} width={64} height={64} />
      <Card.Title as="h3" className="feature-item">{title}</Card.Title>
      <Card.Text className="feature-desc mb-20">{desc}</Card.Text>
    </Card.Body>
  </Card>
));
ServiceCard.displayName = "ServiceCard";

const CategoryCard = memo(({ label, img }: Category) => (
  <Card className="classic border-0 text-center">
    <Card.Img src={img} alt={`${label} 系列鏡框`} loading="lazy" />
    <Card.Title as="h3" className="classic-text fw-bold fst-italic text-center p-2">
      {label}
    </Card.Title>
  </Card>
));
CategoryCard.displayName = "CategoryCard";

const TestimonialCard = memo(({ name, date, text, pic }: Testimonial) => (
  <Card className="h-100 w-100 d-flex flex-column custom-card-shadow">
    <Card.Img
      variant="top"
      src={pic}
      alt={`顧客 ${name} 推薦`}
      loading="lazy"
      style={{ maxHeight: "306px", objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column justify-content-between">
      <div>
        <Card.Title className="test_name mt-4">{name}</Card.Title>
        <Card.Text className="test_name mt-2 mb-8 test_mb">{text}</Card.Text>
      </div>
      <Card.Subtitle
        as="time"
        dateTime={date.replace(/\//g, "-")}
        className="test_date text-muted"
      >
        {date}
      </Card.Subtitle>
    </Card.Body>
  </Card>
));
TestimonialCard.displayName = "TestimonialCard";

// ── Contact Form ─────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm]           = useState<ContactFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setForm((prev) => ({ ...prev, [id]: value }));
    }, []
  );

  const handleCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, agree: e.target.checked }));
    }, []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("送出表單：", form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }, [form]
  );

  if (submitted) {
    return (
      <p className="text-center text-success fw-bold py-5" role="alert">
        感謝您的留言，我們將盡快與您聯繫！
      </p>
    );
  }

  return (
    <Form className="contact-form" onSubmit={handleSubmit} aria-label="聯絡我們表單" noValidate>
      <p>我們相當重視您的意見，若您有任何疑問，可先參考「常見問題」，若仍有任何問題，請填妥以下資料，我們會在近期與您聯繫。</p>

      {FORM_FIELDS.map(({ id, label, type, placeholder }) => (
        <Form.Group controlId={id} key={id} className="mb-3">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={form[id]}
            onChange={handleChange}
            className="contact-border rounded-0 contact-bg"
            aria-label={label}
            required
          />
        </Form.Group>
      ))}

      <Form.Group controlId="message" className="mb-3">
        <Form.Label>意見反應</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="請輸入您的意見"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="contact-border rounded-0 contact-bg"
          aria-label="意見反應"
          required
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="我同意隱私權政策，並同意依隱私權政策中所述的方式處理自己的資料。"
        checked={form.agree}
        onChange={handleCheckbox}
        className="mb-4 custom-checkbox"
        aria-required="true"
      />

      <Button
        variant="danger"
        size="lg"
        type="submit"
        disabled={!form.agree}
        className="mt-12 mb-20 btn-custom fw-bold rounded-0 d-block mx-auto"
        aria-disabled={!form.agree}
      >
        確認送出
      </Button>
    </Form>
  );
};

// ── Main Component ───────────────────────────────────────
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      pushToast({
        type: "success",
        message: "歡迎進入眼鏡官網",
      })
    );
  }, [dispatch]);

  return (
    <main>
      {/* Hero */}
      <section className="hero py-5" aria-label="首頁橫幅">
        <Container className="hero-content">
          <p className="mb-3 hero-title1 ft-color">Promise-Desert 2020 早春系列</p>
          <h1 className="hero-title ft-color fw-bold mb-4">看得清，才能看得遠</h1>
          <Link to="/products/" aria-label="前往產品頁面立即購買">
            <Button className="btn rounded-0">立即購買</Button>
          </Link>
        </Container>
      </section>

      {/* Feature */}
      <section className="feature py-5" aria-labelledby="feature-title">
        <Container className="px-0">
          <h2 id="feature-title" className="text-center mb-4 fw-bold mt-20 class-title">
            用專業的心，做專業的事
          </h2>
          <Row className="g-4 justify-content-center">
            {SERVICES.map((s) => (
              <Col lg={3} md={6} xs={12} key={s.title} className="d-flex justify-content-center">
                <ServiceCard {...s} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Classic */}
      <section className="bg-white py-30" aria-labelledby="classic-title">
        <Container>
          <h2 id="classic-title" className="class-title text-center fw-bold mb-12">
            經典系列鏡框
          </h2>
          <Row className="justify-content-center">
            {CATEGORIES.map((cat) => (
              <Col lg={4} xs={12} key={cat.label} className="d-flex justify-content-center mb-4">
                <CategoryCard {...cat} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Co-brand */}
      <section className="cobrand" aria-labelledby="cobrand-title">
        <div className="container">
          <h2 id="cobrand-title" className="d-block class-title text-white fw-bold mb-6 text-center">
            聯名設計鏡框
          </h2>
          <div className="d-flex cobrand-list">
            {CO_BRANDS.map(({ name, img }) => (
              <div className="cobrand-item" key={name}>
                <img src={img} className="cobrand-img" alt={`${name} 聯名設計鏡框`} loading="lazy" />
                <div className="classic-text fw-bold fst-italic text-center bg-white">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-white" aria-labelledby="testimonial-title">
        <Container>
          <h2 id="testimonial-title" className="class-title fw-bold text-center mb-12 mt-20">
            顧客推薦
          </h2>
          <Row className="mb-20">
            {TESTIMONIALS.map((t) => (
              <Col md={3} sm={6} key={t.name} className="mb-4 d-flex">
                <TestimonialCard {...t} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact */}
      <section className="contact-bg" aria-labelledby="contact-title">
        <Container className="py-5 d-flex flex-column align-items-center">
          <h2 id="contact-title" className="class-title fw-bold text-center mb-12 mt-20">
            聯絡我們
          </h2>
          <ContactForm />
        </Container>
      </section>
    </main>
  );
};

export default Home;