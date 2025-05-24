import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { useEnvironment } from '../../hooks/useEnvironment';
import './DownloadStateButton.scss';

type ButtonState = 'loading' | 'failed' | 'succeeded' | 'unsupported';

interface DownloadStateButtonProps {
  isWindowsDesktop: boolean;
  debugState?: ButtonState; // 디버그용 강제 상태
}

const DownloadStateButton: React.FC<DownloadStateButtonProps> = ({
  isWindowsDesktop,
  debugState,
}) => {
  const { downloadUrl, version, status } = useAppSelector((state) => state.download);
  const { isDevelopment } = useEnvironment();

  // 프로덕션 환경에서는 디버그 상태가 동작하지 않도록 함
  const effectiveState = isDevelopment ? debugState : undefined;

  const getButtonStyle = () => {
    if (effectiveState) {
      switch (effectiveState) {
        case 'loading':
          return 'loading-button-style';
        case 'failed':
          return 'failed-button-style';
        case 'succeeded':
          return 'success-button-style';
        case 'unsupported':
          return 'unsupported-button-style';
        default:
          return 'failed-button-style';
      }
    }

    if (!isWindowsDesktop) return 'unsupported-button-style';
    switch (status) {
      case 'loading':
        return 'loading-button-style';
      case 'failed':
        return 'failed-button-style';
      case 'succeeded':
        return 'success-button-style';
      default:
        return 'failed-button-style';
    }
  };

  const getButtonText = () => {
    if (effectiveState) {
      switch (effectiveState) {
        case 'loading':
          return '다운로드 준비 중...';
        case 'failed':
          return '알 수 없는 에러가 발생했습니다';
        case 'succeeded':
          return `최신버전(${version || '1.0.0'}) 다운로드`;
        case 'unsupported':
          return 'Windows 데스크탑만 지원합니다';
        default:
          return '알 수 없는 에러가 발생했습니다';
      }
    }

    if (!isWindowsDesktop) return 'Windows 데스크탑만 지원합니다';
    switch (status) {
      case 'loading':
        return '다운로드 준비 중...';
      case 'failed':
        return '알 수 없는 에러가 발생했습니다';
      case 'succeeded':
        return `최신버전(${version}) 다운로드`;
      default:
        return '알 수 없는 에러가 발생했습니다';
    }
  };

  const handleClick = () => {
    if (
      downloadUrl &&
      (effectiveState === 'succeeded' || (isWindowsDesktop && status === 'succeeded'))
    ) {
      window.location.href = downloadUrl;
    }
  };

  const isDisabled = () => {
    if (effectiveState) {
      return (
        effectiveState === 'loading' ||
        effectiveState === 'failed' ||
        effectiveState === 'unsupported'
      );
    }
    return !isWindowsDesktop || status === 'loading' || status === 'failed';
  };

  return (
    <button
      className={`download-btn ${getButtonStyle()}`}
      disabled={isDisabled()}
      onClick={handleClick}
    >
      {getButtonText()}
    </button>
  );
};

export default DownloadStateButton;
