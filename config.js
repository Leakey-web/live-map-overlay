/*
 * 車掃小地圖設定檔
 *
 * 注意：GitHub Pages 上的檔案任何人都看得到，包含這個 config.js。
 * RealtimeIRL Pull Key 請留空，改用 admin.html 產生 OBS 網址。
 * Pull Key 外洩等於任何人都能即時追蹤宣傳車位置。
 */
window.OVERLAY_CONFIG = {
  // 請留空，用 admin.html 產生含 Pull Key 的 OBS 網址
  rtirlPullKey: '',

  // Q 版頭像路徑，建議 256x256 透明背景 PNG
  avatar: './avatar.png',

  // 地圖設定（單位 px，以 1920x1080 畫面計算）
  map: {
    zoom: 15, // 政府開放圖資最大為 15
    right: 50, // 與右側 QR Code 對齊
    bottom: 270, // 放在 QR Code 上方。若要貼齊右下角，改成 40
    tileUrl: 'https://wmts.nlsc.gov.tw/wmts/EMAP6_OPENDATA/default/GoogleMapsCompatible/{z}/{y}/{x}',
  },

  // 預設 GPS 延遲（毫秒），用來對齊 4G 背包的畫面延遲
  gpsDelayMs: 3000,

  // 外框顏色。預設為藍色主視覺
  theme: {
    ring: '#2453E6',
  },

  // 政府開放資料的顯名聲明，每場直播都要貼到直播說明欄。
  // 版本取自地圖上的 NLSC 浮水印，浮水印日期改變時請一併更新。
  mapCredit: [
    '內政部國土測繪中心 2025 臺灣通用電子地圖(不含等高線，比例尺小於一萬八千分之一) 202511版',
    '此開放資料依政府資料開放授權條款 (Open Government Data License) 進行公眾釋出，使用者於遵守本條款各項規定之前提下，得利用之。',
    '政府資料開放授權條款：https://data.gov.tw/license',
  ].join('\n'),
};
