import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import lineupAndTeamStats from "@asset/lineup_and_teamstat.png";
import footballayCover from "@asset/footballay_cover.png";
import "./MainBody.scss";

function MainBody() {
  return (
    <main className="main-body">
      <section className="intro-section" id="intro">
        <div className="logo-intro-container">
          <img
            src={footballayCover}
            alt="Footballay Logo"
            className="logo-intro"
          />
        </div>
        <h1 className="main-title">풋볼레이</h1>
        <p className="intro-sub">
          축구 경기{" "}
          <strong style={{ fontSize: "1.4rem" }}>
            라인업 및 팀/선수 통계 정보를 제공
          </strong>
          하는 무료 소프트웨어입니다.
          <br />
          라이브 스트리밍을 고려하여 설계되었으며
          <br />
          스트리밍 화면에 자연스럽게 어울리는 UI를 제공합니다.
        </p>
        <Link className="download-btn" to="/download">
          <FontAwesomeIcon icon={faDownload} style={{ marginRight: "0.5em" }} />
          다운로드
        </Link>
      </section>
      <section className="features">
        <div className="features-image">
          <img src={lineupAndTeamStats} alt="Lineup" className="lineup-image" />
        </div>
        <div className="features-body">
          <h2 className="features-title">주요 특징</h2>
          <div className="features-content">
            <ul className="features-list">
              <li>광고 없는 무료 소프트웨어</li>
              <li>실시간 라인업과 팀/선수 통계 제공</li>
              <li>선수 교체 시 자동으로 라인업 갱신</li>
              <li>축구 입중계 스트리밍에 최적화된 디자인</li>
              <li>사용자 피드백 기반의 지속적인 개선</li>
              <li>오픈 소스</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="more-info" id="howto">
        <p>
          사용법이 궁금하다면{" "}
          <a
            href="https://footballay.gitbook.io/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>문서</strong>{" "}
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              style={{ fontSize: "0.95em" }}
            />
          </a>
          를 참고하세요
        </p>
      </section>
    </main>
  );
}

export default MainBody;
