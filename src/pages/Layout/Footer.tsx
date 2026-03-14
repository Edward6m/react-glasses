import React, { memo } from "react";
import { Link } from "react-router-dom";
import fb   from "../../assets/image/ic-social-fb.png";
import ig   from "../../assets/image/ic_social_ig.png";
import line from "../../assets/image/ic_social_line.png";
import { Container, Row, Col } from "react-bootstrap";

// ── Types ────────────────────────────────────────────────
interface NavItem {
  label: string;
  to:    string;
}

interface SocialLink {
  href: string;
  src:  string;
  alt:  string;
}

interface ContactItem {
  href:  string;
  icon:  string;
  label: string;
}

// ── Static Data ──────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "首頁",   to: "/"        },
  { label: "系列鏡框", to: "/products" },
  { label: "門市據點", to: "/store"    },
  { label: "部落格",  to: "/blog"     },
  { label: "常見問題", to: "/qa"       },
];

const SOCIAL_LINKS: SocialLink[] = [
  { href: "http://www.facebook.com",    src: fb,   alt: "Facebook"  },
  { href: "https://www.instagram.com/", src: ig,   alt: "Instagram" },
  { href: "https://www.line.me/tw/",    src: line, alt: "Line"      },
];

const CONTACT_ITEMS: ContactItem[] = [
  { href: "tel:0800000000",               icon: "call",  label: "0800-000-000"          },
  { href: "mailto:glasses@business.com",  icon: "email", label: "glasses@business.com"  },
];

// ── Sub Components ───────────────────────────────────────
const ScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

interface SocialIconsProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = memo(({ className }) => (
  <div className={`d-flex gap-2 ${className ?? ""}`}>
    {SOCIAL_LINKS.map(({ href, src, alt }) => (
      <a
        key={alt}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`前往 ${alt}`}
      >
        <img src={src} alt={alt} className="footer-icon" width={24} height={24} loading="lazy" />
      </a>
    ))}
  </div>
));
SocialIcons.displayName = "SocialIcons";

const ContactInfo: React.FC = memo(() => (
  <>
    {CONTACT_ITEMS.map(({ href, icon, label }) => (
      <a
        key={href}
        href={href}
        className="d-flex align-items-center mb-2 text-white text-decoration-none footer-contact"
        aria-label={label}
      >
        <span className="material-icons-outlined me-3" aria-hidden="true">{icon}</span>
        {label}
      </a>
    ))}
  </>
));
ContactInfo.displayName = "ContactInfo";

const DesktopNav: React.FC = memo(() => (
  <ul className="d-none d-md-flex justify-content-between w-75 mb-4 list-unstyled">
    {NAV_ITEMS.map(({ label, to }) => (
      <li key={to}>
        <Link
          to={to}
          className="text-white text-decoration-none my-navlink"
          onClick={ScrollToTop}
          aria-label={label}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
));
DesktopNav.displayName = "DesktopNav";

// ── Mobile Contact Row ───────────────────────────────────
const MobileContact: React.FC = memo(() => (
  <>
    <div className="d-flex d-md-none justify-content-between align-items-center text-white mb-2">
      <a href="tel:0800000000" className="d-inline-flex align-items-center text-decoration-none text-reset">
        <span className="material-icons-outlined me-2" aria-hidden="true">call</span>
        0800-000-000
      </a>
      <SocialIcons />
    </div>
    <a href="mailto:glasses@business.com" className="d-md-none d-inline-flex align-items-center text-white">
      <span className="material-icons-outlined me-2" aria-hidden="true">email</span>
      glasses@business.com
    </a>
  </>
));
MobileContact.displayName = "MobileContact";

// ── Main Component ───────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="bg-subColor">
    <Container>
      {/* Block 1 : border-bottom 白線*/}
      <Row className="border-bottom border-white pb-4 mb-4">
        <Col md={9}>
          <DesktopNav />
          <MobileContact />
          <div className="text-white d-none d-md-block">
            <ContactInfo />
          </div>
        </Col>

        <Col md={3} className="d-none d-md-flex justify-content-end align-items-start gap-3">
          <SocialIcons />
        </Col>
      </Row>

<br/>
      {/* Block 2 */}
      <Row className="flex-column flex-md-row justify-content-between text-white fs-6">
        <Col md="auto" className=" mb-md-0">
          Copyright © 2020 Glasses. All rights reserved.
        </Col>
        <Col md="auto">
          <ul className="list-unstyled d-flex flex-column flex-md-row gap-2 gap-md-4 mb-0">
            {[
              { label: "隱私權政策", href: "#" },
              { label: "服務條款",   href: "#" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-white text-decoration-none">{label}</a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;