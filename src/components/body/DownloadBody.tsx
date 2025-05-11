import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLatestYml } from "../../store/downloadSlice";
import DownloadStateButton from "./DownloadStateButton";
import "./DownloadBody.scss";
import { UAParser } from "ua-parser-js";
import Beta from "@asset/warnbeta.png";
import ServerDown from "@asset/serverdown.png";
import Available from "@asset/available.png";

function DownloadBody() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.download);
  const [isWindowsDesktop, setIsWindowsDesktop] = useState(false);

  useEffect(() => {
    // 1) Client Hints 우선
    const uaData = (navigator as any).userAgentData;
    if (uaData) {
      const mobile = uaData.mobile;
      const platform = uaData.platform;
      setIsWindowsDesktop(!mobile && platform === "Windows");
    } else {
      // 2) 폴백: UAParser 사용
      const uap = new UAParser();
      const os = uap.getOS();
      const device = uap.getDevice();
      const isWindowsDesktop =
        os.name === "Windows" && device.type === undefined; // 데스크탑은 undefined
      setIsWindowsDesktop(isWindowsDesktop);
    }
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLatestYml());
    }
  }, [dispatch, status]);

  return (
    <main className="download-page">
      <h1>다운로드 안내</h1>
      <div
        className="download-license"
        style={{
          fontSize: "0.93em",
          color: "#8ea1e1",
          margin: "8px 0 18px 0",
          textAlign: "center",
        }}
      >
        상업적 이용 가능. 포함된 이미지(팀 로고, 선수 사진 등)의 저작권을
        책임지지 않습니다.
        <br />본 서비스는 공식 리그나 클럽과 제휴 및 후원 관계가 없습니다.
      </div>
      <section className="download-warning">
        <div className="warning-list">
          <div className="warning-item">
            <div className="icon beta">
              <img src={Beta} alt="베타 버전 경고" />
            </div>
            <div>
              <strong className="highlight">
                풋볼레이는 현재
                <br />
                베타(0.x) 버전입니다.
              </strong>
              <div>서비스가 일시 중단될 수 있습니다.</div>
            </div>
          </div>
          <div className="warning-item">
            <div className="icon server">
              <img src={ServerDown} alt="서버 다운 경고" />
            </div>
            <div>
              <strong className="highlight">
                베타 버전이므로 불안정할 수 있습니다.
              </strong>
              <div>문제 발생 시 언제든 문의해 주세요.</div>
            </div>
          </div>
          <div className="warning-item">
            <div className="icon league">
              <img src={Available} alt="지원 리그 안내" />
            </div>
            <div>
              <strong className="highlight">
                지원 리그/경기가 제한적입니다.
              </strong>
              <div>EPL 지원. 기타 리그/경기는 별도 문의 바랍니다.</div>
            </div>
          </div>
        </div>
      </section>
      <DownloadStateButton
        isWindowsDesktop={isWindowsDesktop}
        // debugState="loading" // 로딩 상태
        // debugState="failed" // 실패 상태
        // debugState="succeeded" // 성공 상태
        // debugState="unsupported" // 지원하지 않는 상태
      />

      <div className="divider"></div>
      <section className="available-fixture-info">
        <h2># 지원 리그/경기(Available Fixture) 안내</h2>
        <p>
          <span className="sub-title">모든 경기/리그를 지원하지 않습니다.</span>
          <br />
          데이터 제공사의 API 커버리지와 요청 제한(Request Limit)으로 인해{" "}
          <b>주요 리그 및 경기만 지원</b>
          합니다.
          <br />
          <b>EPL(잉글랜드 프리미어리그)</b> 전 경기를 기본으로 지원하며, 이외
          리그/경기(예: FA컵, 챔피언스리그 등)는 별도 문의가 필요합니다.
          <br />
          <br />
          <span className="sub-title">
            원하는 리그/경기가 있다면 언제든 문의해 주세요.
          </span>
          <br />
          데이터 제공사의 API 커버리지에 포함된 경우 지원 가능합니다.
        </p>
      </section>
    </main>
  );
}

export default DownloadBody;
