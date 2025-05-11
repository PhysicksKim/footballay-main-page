class AppConfig {
  static readonly DOWNLOAD_LATEST_YML = import.meta.env.VITE_APP_DOWNLOAD_LATEST_YML as string;
  static readonly DOWNLOAD_LATEST_BASE = import.meta.env.VITE_APP_DOWNLOAD_LATEST_BASE as string;
}

export default AppConfig;
