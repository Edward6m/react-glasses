import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
export default function QA() {
  return (
    <div className="bg-white">
      <br className="mt-4" />
      <Container className="py-5">
        {/* 標題 */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "8px",
              height: "72px",
              backgroundColor: "#b30000",
              marginRight: "12px",
            }}
          />
          <p className="fw-bold m-0 title48">常見問題</p>
        </div>
        <p className="title24">我想詢問配鏡問題</p>
        <p className="fw-bold title20">Q1.請問可否自備鏡框單配鏡片？</p>
        <p className="mb-8 title16" style={{ maxWidth: "856px" }}>
          A1.我牌鏡框搭配薄型非球面鏡片 1480
          元，搭配功能型鏡片則依鏡片種類加價購買。
          <br />
          當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480
          元），搭配功能型鏡片則依鏡片種類加價購買。
          他牌鏡框，搭配薄型非球面鏡片 1980
          元，搭配功能型鏡片則依鏡片種類加價購買。
        </p>

        <p className="fw-bold title20">Q2.眼鏡都可以20分鐘取件嗎？</p>
        <p className="mb-8 title16" style={{ maxWidth: "856px" }}>
          A2.一般單光鏡片在門市現有庫存度數範圍內，可提供約20分鐘快速取件服務。
          <br />
          若為特殊度數、散光較深、多焦點鏡片或客製化鏡片，製作時間則會依鏡片種類而有所不同，實際時間請以門市現場評估為準。
        </p>

        <p className="fw-bold title20">Q3.散光鏡片需要額外加價嗎？</p>
        <p className="mb-8 title16" style={{ maxWidth: "856px" }}>
          A3.一般常規範圍內的散光度數通常不需額外加價；若散光度數較高或需特殊訂製鏡片，則可能會產生額外費用，詳細價格建議由門市人員為您確認說明。
        </p>

        <p className="fw-bold title20">Q4.我可以使用舊眼鏡的度數配鏡片嗎？</p>
        <p className="mb-8 title16" style={{ maxWidth: "856px" }}>
          A4.可以的。如您有舊眼鏡，我們可協助檢測目前鏡片度數後依該數據製作。不過仍建議定期驗光，以確保度數符合您目前的視力狀況。
        </p>

        <p className="fw-bold title20">Q5.請問可以單購買鏡框嗎？</p>
        <p className="mb-8 title16" style={{ maxWidth: "856px" }}>
          A5.可以單購買鏡框。若日後需要配鏡片，也歡迎隨時攜帶鏡框至門市由專人為您服務。
        </p>
      </Container>
    </div>
  );
}
