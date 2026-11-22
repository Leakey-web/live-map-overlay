/*
 * 車掃直播圖層設定檔
 *
 * 注意：GitHub Pages 上的檔案任何人都看得到，包含這個 config.js。
 * - Google Maps Key：可以放這裡，但一定要設定網址限制（見 README）。
 * - RealtimeIRL Pull Key：建議留空，改放在 OBS 網址裡。
 *   外洩等於任何人都能即時追蹤宣傳車位置。
 */
window.OVERLAY_CONFIG = {
  // Google Maps JavaScript API 金鑰
  googleMapsApiKey: '',

  // 建議留空，用 admin.html 的「連結設定」產生含 Pull Key 的 OBS 網址
  rtirlPullKey: '',

  // Firebase 設定。只用小地圖時可以全部留空
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '', // 例：https://你的專案-default-rtdb.asia-southeast1.firebasedatabase.app
    projectId: '',
    appId: '',
  },

  // admin.html 的簡易密碼。只能防路人誤觸，不是真正的資安防護
  adminPassword: 'c6ubb3md7s',

  // Q 版頭像路徑，建議 256x256 透明背景 PNG
  avatar: './avatar.png',

  // 功能開關。你們已有字卡與跑馬燈，所以預設只開地圖
  features: {
    map: true,
    nextStop: false,
    marquee: false,
  },

  // 地圖設定（單位 px，以 1920x1080 畫面計算）
  map: {
    zoom: 17,
    right: 50, // 與右側 QR Code 對齊
    bottom: 270, // 放在 QR Code 上方。若要貼齊右下角，改成 40
    hidePoi: true, // 隱藏店家與景點，只留道路與路名
  },

  // GPS 延遲（毫秒），用來對齊 4G 背包的畫面延遲。可在 OBS 網址用 delay= 覆蓋
  gpsDelayMs: 3000,

  // 顏色。預設為藍色主視覺
  // 若要改成參考圖的粉色：ring '#FF85A1'、cardFrom 'rgba(255,133,161,.94)'、cardTo 'rgba(214,71,116,.94)'
  theme: {
    ring: '#2453E6',
    cardFrom: 'rgba(36,83,230,.94)',
    cardTo: 'rgba(22,48,150,.94)',
  },

  // 字卡位置，只有開啟 nextStop / marquee 時才會用到
  cards: {
    nextStopLeft: 240,
    marqueeLeft: 860,
    marqueeTop: 44,
    marqueeMaxWidth: 680,
  },
};
