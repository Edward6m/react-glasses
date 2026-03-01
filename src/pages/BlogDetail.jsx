import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { blogData } from "./blogData";
import { Container, Nav, Form, Row, Col, Breadcrumb } from "react-bootstrap";
import { FaSearch, FaFacebookF, FaInstagram } from "react-icons/fa";
import icon1 from "../assets/image/logo-facebook.png";
import icon2 from "../assets/image/logo-instagram.png";
const BlogDetail = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [category, setCategory] = useState("全部");

  //  分離 input 與真正搜尋條件
  const [keyword, setKeyword] = useState(""); // input 內容
  const [searchText, setSearchText] = useState(""); // 真正搜尋用

  /* =============================
    用setTimeout延遲, 避免同步setState
      頁面初始化 → 顯示全部文章
  ==============================*/
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategory("全部");
      setSearchText("");
      setKeyword("");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  /* =============================
      展開後自動 focus
  ==============================*/
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  /* =============================
      分類 + 搜尋篩選
  ==============================*/
  useMemo(() => {
    return blogData.filter((item) => {
      // 分類篩選
      const matchCategory = category === "全部" || item.category === category;

      // 搜尋所有欄位（排除 img）
      const matchKeyword = Object.entries(item)
        .filter(([key]) => !key.startsWith("img"))
        .some(([, val]) =>
          String(val).toLowerCase().includes(searchText.toLowerCase()),
        );

      return matchCategory && matchKeyword;
    });
  }, [category, searchText]);

  /* =============================
      分類處理
  ==============================*/
  // const handleCategory = (cat) => {
  //   setCategory(cat);
  //   setSearchText("");
  //   setKeyword("");
  // };
  const handleCategory = (cat) => {
    navigate(`/blog?category=${encodeURIComponent(cat)}`);
  };
  // 取得 URL 上的 id 值
  const { id } = useParams();
  const blogId = Number(id);

  //找東西
  const blog = blogData.find((item) => item.id === blogId);

  if (!blog) return <div>文章不存在</div>;

  //找位置
  const currentIndex = blogData.findIndex((item) => item.id === blogId);
  const prevBlog = blogData[currentIndex - 1];
  const nextBlog = blogData[currentIndex + 1];

  // 將圖片與內容組成陣列
  const sections = [
    { img: blog.img, content: blog.content },
    { img: blog.img1, content: blog.content1 },
    { img: blog.img2, content: blog.content2 },
    { img: blog.img3, content: blog.content3 },
  ];

  return (
    <div className="bg-white">
      {/* =============================
          分類 + 搜尋列
      ==============================*/}
      <div className="second-menu-bg py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            {/* 分類 */}
            <Nav className="d-flex gap-2 gap-sm-3 gap-md-10 ">
              <Nav.Link
                active={blogData[currentIndex].category === "最新消息"}
                onClick={() => handleCategory("最新消息")}
                className="text-white ms-0 px-0 align-items-center my-navlink"
              >
                最新消息
              </Nav.Link>

              <Nav.Link
                active={blogData[currentIndex].category === "特別企劃"}
                onClick={() => handleCategory("特別企劃")}
                className="text-white ms-0 px-0  my-navlink"
              >
                特別企劃
              </Nav.Link>

              <Nav.Link
                active={blogData[currentIndex].category === "新品上市"}
                onClick={() => handleCategory("新品上市")}
                className="text-white ms-0 px-0   my-navlink"
              >
                新品上市
              </Nav.Link>

              <Nav.Link
                active={blogData[currentIndex].category === "鏡框小知識"}
                onClick={() => handleCategory("鏡框小知識")}
                className="text-white ms-0 ps-0 my-navlink"
              >
                鏡框小知識
              </Nav.Link>
            </Nav>

            {/* 搜尋區 */}
            <div className="d-none d-sm-block">
              <div className=" d-flex align-items-center position-relative ">
                <Form.Control
                  ref={inputRef}
                  type="text"
                  value={keyword}
                  placeholder="搜尋文章..."
                  className={`search-input ${open ? "open" : ""}`}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && keyword.trim() !== "") {
                      navigate(`/blog?keyword=${encodeURIComponent(keyword)}`);
                      setOpen(false);
                    }
                  }}
                  onBlur={() => setOpen(false)}
                />

                <FaSearch
                  className="search-icon text-white"
                  onClick={() => setOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-5 blog-detail">
        {/* ======= 麵包屑 ======= */}
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            首頁
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/blog" }}>
            部落格
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleCategory(blog.category)}>
            {blog.category}
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-danger">
            {blog.title}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mb-20">
          <Col md={8}>
            {/* 標題區 */}
            <h1 className="fw-bold ">{blog.title}</h1>
            <p className="fs-5">{blog.subtitle}</p>

            {/* 內容區塊 */}
            {sections.map((section, index) => (
              <div key={index} className="mb-5">
                <img src={section.img} alt="" className="img-fluid mb-3" />
                <p>{section.content}</p>
              </div>
            ))}

            {/* 空一行 */}
            <div className="mb-4"></div>

            {/* Share 區 */}
            <div
              className="
            d-none d-md-flex align-items-center gap-4 mb-3
            "
            >
              <span className="fw-bold fs-6">Share</span>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <i class="bi bi-facebook rounded"></i> */}
                <img
                  src={icon1}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                ></img>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <FaInstagram style={{ cursor: "pointer" }} /> */}
                <img
                  src={icon2}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                ></img>
              </a>
            </div>

            {/* 灰色實線 */}
            <hr style={{ borderTop: "1px solid #ccc" }} />

            {/* 上下篇 */}
            <div className="d-flex justify-content-between mt-3">
              <div>
                {prevBlog && (
                  <Link
                    to={`/blog/${prevBlog.id}`}
                    className="text-dark text-decoration-none d-flex"
                  >
                    ←{"  "}
                    <p className="d-none d-md-block">
                      上一篇：{prevBlog.title}
                    </p>
                  </Link>
                )}
              </div>

              <div>
                {nextBlog && (
                  <Link
                    to={`/blog/${nextBlog.id}`}
                    className="text-dark text-decoration-none d-flex"
                  >
                    <p className="d-none d-md-block">
                      下一篇：{nextBlog.title}
                    </p>
                    {"  "}→
                  </Link>
                )}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="ps-md-4 mt-4 mt-md-0 d-none d-md-block">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-tag me-3 tag-font"
                  style={{ fontSize: "24px" }}
                ></i>

                <p className="fw-bold fs-2 tag-font">TAGS</p>
              </div>
              {blog.tag?.map((tag, index) => (
                <span
                  key={index}
                  className=" bg-light me-3 tag-font fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/blog?keyword=${encodeURIComponent(tag)}`)
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogDetail;
