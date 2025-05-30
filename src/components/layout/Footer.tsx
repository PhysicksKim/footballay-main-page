import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'physickskim@gmail.com';
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <footer className="main-footer">
      <div className="footer-license">
        <div className="footer-license-row">
          <span>MIT License</span>
          <span
            className="footer-license-btn"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/license')}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="상세 라이선스 안내"
          >
            라이선스 안내
          </span>
        </div>
        <div className="footer-license-desc">
          본 소프트웨어는 상업적 이용이 가능합니다. 데이터 제공자에 의해 지원되는 팀 로고 이미지,
          선수별 프로필 사진 등은 저작권을 책임지지 않습니다.
        </div>
        <div className="footer-license-desc">
          본 프로젝트는 오픈소스이며, 코드를 자유롭게 복제하고 원하는 대로 사용하실 수 있습니다.
        </div>
      </div>
      <div className="footer-contact">
        <span className="footer-contact-row">
          <div className="footer-contact-item">
            문의: <span className="footer-email">{email}</span>
            <button
              className="footer-copy-btn"
              onClick={handleCopy}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="이메일 복사"
              tabIndex={0}
            >
              <FontAwesomeIcon icon={faCopy} style={{ fontSize: '1em' }} />
            </button>
            <span className="footer-copy-toast" style={{ opacity: copied ? 1 : 0 }}>
              복사됨!
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-sep">|</span>
            GitHub:{' '}
            <a
              href="https://github.com/PhysicksKim"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-link"
            >
              PhysicksKim <FontAwesomeIcon icon={faUpRightFromSquare} style={{ fontSize: '1em' }} />
            </a>
          </div>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
