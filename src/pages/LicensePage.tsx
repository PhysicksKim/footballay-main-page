import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { fetchLicenseText } from "@src/store/licenseSlice";
import "./LicensePage.scss";

function LicensePage() {
  const dispatch = useAppDispatch();
  const { licenseText, status, error } = useAppSelector(
    (state) => state.license,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLicenseText());
    }
  }, [dispatch, status]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <main className="license-page-main">
      <section>
        <h2>이미지/데이터 저작권 안내</h2>
        <p>
          팀 로고, 선수 프로필 사진 등 일부 이미지는 data provider의 저작권
          정책에 따릅니다.
          <br />
          footballay-desktop은 해당 이미지의 저작권을 보장하지 않습니다.
          <br />
          정확한 저작권 정책은 아래의 라이선스 전문을 참고해 주세요.
          <br />
          문의 : physickskim@gmail.com
        </p>
      </section>
      <h1>라이선스 안내</h1>
      <section className="license-full-text">
        <h2>footballay-desktop 라이선스</h2>
        {status === "loading" && <p>라이센스 정보를 불러오는 중...</p>}
        {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
        {status === "succeeded" && licenseText && <pre>{licenseText}</pre>}
      </section>

      {/* 최상단 및 최하단 이동 버튼 */}
      <div className="scroll-buttons">
        <button onClick={scrollToTop} className="scroll-button">
          ↑
        </button>
        <button onClick={scrollToBottom} className="scroll-button">
          ↓
        </button>
      </div>
    </main>
  );
}

export default LicensePage;
