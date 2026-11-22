# 車掃直播 GPS 小地圖

全靜態網頁，可直接部署到 GitHub Pages。手機用 RealtimeIRL 回傳定位，辦公室 OBS 疊上圓形即時地圖。

| 檔案 | 用途 |
| --- | --- |
| `overlay.html` | OBS 瀏覽器來源，透明背景，1920x1080 |
| `admin.html` | 產生 OBS 網址，以及隨車小編的手機遙控面板 |
| `config.js` | Google Maps Key、密碼、頭像、位置、顏色與功能開關 |
| `avatar.png` | Q 版頭像，請自行放入。沒有檔案時會顯示藍色定位點 |

**預設只開小地圖。** 你們已有字卡與跑馬燈，所以 Firebase 不必設定。少一個服務，直播當下就少一個故障點。需要時再到 `config.js` 打開 `nextStop` 和 `marquee`。

---

## 一、最快上線流程（只用小地圖）

1. 依第二節申請 Google Maps API Key，填入 `config.js` 的 `googleMapsApiKey`。
2. 修改 `config.js` 的 `adminPassword`，並放入 `avatar.png`。
3. 把所有檔案上傳到 GitHub，開啟 Pages（第三節）。
4. 手機安裝 RealtimeIRL，取得 Pull Key（第四節）。
5. 開啟 `https://你的帳號.github.io/專案名稱/admin.html`，輸入密碼，貼上 Pull Key，按「產生網址」。
6. 複製「OBS 網址」，貼到 OBS 瀏覽器來源（第五節）。

> **Pull Key 不要寫進 `config.js`。** GitHub Pages 上的檔案是公開的，Pull Key 外洩等於任何人都能即時追蹤宣傳車。用第 5 步產生的網址，Key 只會存在 OBS 裡。

### 沒有任何金鑰也能先看效果

開啟 `overlay.html?demo=1` 會用模擬 GPS 移動地圖。沒有 Key 時，Google 會顯示錯誤提示和「僅供開發使用」浮水印，這是正常的。正式模式下，地圖出錯會自動隱藏，不會把錯誤視窗播出去。

---

## 二、申請 Google Maps API Key（含防盜刷）

1. 到 [Google Cloud Console](https://console.cloud.google.com/) 建立專案，並綁定帳單帳戶。
2. 到「API 和服務 → 程式庫」，啟用 **Maps JavaScript API**。
3. 到「API 和服務 → 憑證 → 建立憑證 → API 金鑰」。
4. 編輯這把金鑰：
   - **應用程式限制**：選「網站」，新增 `https://你的帳號.github.io/*`。
   - **API 限制**：選「限制金鑰」，只勾 **Maps JavaScript API**。
5. 設定用量上限，這是真正能擋住盜刷的一步：
   - 到「API 和服務 → Maps JavaScript API → 配額」，把每日地圖載入次數調低，例如 `300`。
   - 到「帳單 → 預算與快訊」設定預算通知。預算通知只會提醒，不會自動停止扣款。

**費用：** Dynamic Maps 每月前 10,000 次載入免費，之後每 1,000 次 7 美元。計費單位是「地圖載入」，車掃一場通常只載入幾次。

**請勿遮掉地圖底部的 Google 標誌與版權文字。** Google 規定標示必須清楚可見，所以圓形地圖下方多了一條細底座來放它們。

---

## 三、部署到 GitHub Pages

1. 在 GitHub 建立新的 repository，上傳本資料夾所有檔案。
2. 到 **Settings → Pages**。
3. Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 約一分鐘後即可開啟 `https://你的帳號.github.io/專案名稱/admin.html`。

---

## 四、車上設定 RealtimeIRL

1. 在隨車手機安裝 **RealtimeIRL**（App Store / Google Play），並到 [rtirl.com](https://rtirl.com) 建立帳號。
2. 在 App 或帳號頁找到 **Pull Key**。
3. 定位權限設為「**永遠允許**」，並開啟「精確位置」。
4. 關閉這支手機的省電模式。Android 請把 RealtimeIRL 設為「不限制電池用量」。
5. 接上行動電源，手機放在看得到天空的位置，例如擋風玻璃旁。
6. 開播前按下開始回傳，收播後**一定要關閉**，避免持續回傳位置。
7. 檢查 RealtimeIRL 的隱私設定，確認位置沒有公開顯示在 rtirl.com 上。

建議用一支**專用手機**回傳定位，不要和直播背包或小編操作的手機共用。

---

## 五、OBS 設定

新增「瀏覽器」來源：

| 設定 | 值 |
| --- | --- |
| URL | `admin.html` 產生的 OBS 網址 |
| 寬度 / 高度 | `1920` / `1080` |
| 自訂影格率 | 開啟，`30` |
| 來源不顯示時關閉 | **不要勾** |
| 場景啟用時重新整理瀏覽器 | **不要勾** |

把這個來源放在場景最上層，位置 `0,0`，不要縮放。

### 對齊 4G 背包畫面延遲

**請用 OBS 網址裡的 `delay=`，不要靠「算圖延遲（Render Delay）」。** Render Delay 單一濾鏡上限通常只有 500 毫秒，而 4G 背包常見延遲是好幾秒；疊多個濾鏡也會吃顯示卡記憶體。

校正方式：

1. 開播前讓車子實際行駛，找一個明顯的路口。
2. 比對**畫面中車子過路口**和**地圖頭像過路口**的時間差。
3. 地圖比畫面早，就把 `delay` 調大；地圖比畫面晚，就調小。單位是毫秒：

```text
...overlay.html#pull=你的Key&room=xxx&delay=3500
```

4. 改完網址後按來源的「重新整理」。

要微調 0.5 秒以內，才考慮再加一個 Render Delay 濾鏡。

### 除錯

在網址的 `#` 前加上 `?debug=1`，畫面左上角會顯示 GPS、地圖與 Firebase 狀態。**正式開播前請移除。**

```text
...overlay.html?debug=1#pull=你的Key&room=xxx&delay=3500
```

---

## 六、調整位置與顏色

都在 `config.js`：

- **位置**：`map.right`、`map.bottom`。預設放在你們 QR Code 的正上方；若要貼齊右下角，把 `bottom` 改成 `40`，但會蓋住 QR Code。
- **縮放**：`map.zoom`，建議 `16` 或 `17`。
- **顏色**：`theme.ring`。預設是你們的藍色，檔案內附粉色數值。

---

## 七、（選用）開啟下一站字卡與跑馬燈

### 1. 建立 Firebase Realtime Database

1. 到 [Firebase Console](https://console.firebase.google.com/) 建立專案，使用免費的 Spark 方案即可。
2. 左側「建構 → Realtime Database → 建立資料庫」，地區選 **Singapore (asia-southeast1)**，離台灣最近。
3. 選「以鎖定模式啟動」。
4. 到「專案設定 → 一般 → 你的應用程式」，新增網頁應用程式，複製設定值到 `config.js` 的 `firebase`。**務必確認 `databaseURL` 有填。**

### 2. 貼上安全規則

到 Realtime Database 的「規則」分頁，貼上後發布：

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "rooms": {
      "$room": {
        ".read": "$room.matches(/^[A-Za-z0-9_-]{32,64}$/)",
        ".write": "$room.matches(/^[A-Za-z0-9_-]{32,64}$/)",
        "nextStop": { ".validate": "newData.isString() && newData.val().length <= 40" },
        "nextStopVisible": { ".validate": "newData.isBoolean()" },
        "marqueeText": { ".validate": "newData.isString() && newData.val().length <= 200" },
        "marqueeVisible": { ".validate": "newData.isBoolean()" },
        "updatedAt": { ".validate": "newData.isNumber()" },
        "$other": { ".validate": false }
      }
    }
  }
}
```

這組規則讓只有知道隨機房間碼的人才能改字卡。`config.js` 的密碼是公開可見的，只能防誤觸，**真正的保護是小編網址裡的 `room`**，所以這個網址不能外流。

### 3. 開啟功能

```js
features: { map: true, nextStop: true, marquee: true },
```

上傳後，到 `admin.html` 重新產生網址，把新的 OBS 網址貼回 OBS，小編網址傳給隨車小編。

---

## 八、緊急備援

如果自製圖層出問題，可以直接換成 RealtimeIRL 官方的 Google 地圖圖層。它沒有圓框、頭像和延遲對齊，但能立刻頂上：

```text
https://overlays.rtirl.com/googlemaps.html?key=你的PullKey&api_key=你的GoogleKey&style=W10%3D
```

請在開播前測試一次，並把它先放在 OBS 的隱藏來源裡。

---

## 九、開播前檢查

- [ ] 手機 GPS 已開始回傳，電源接好，省電模式關閉
- [ ] OBS 地圖有出現，頭像在圓心，路名清楚
- [ ] 地圖沒有蓋到 QR Code 與主視覺
- [ ] 實際行駛校正過 `delay`
- [ ] OBS 網址沒有 `?debug=1` 或 `?demo=1`
- [ ] 備援圖層已放在隱藏來源
- [ ] 收播後關閉 RealtimeIRL 回傳

### 常見問題

| 狀況 | 處理方式 |
| --- | --- |
| 地圖完全沒出現 | 加 `?debug=1` 看狀態。圖層在收到第一筆 GPS 前會保持隱藏 |
| 顯示金鑰錯誤 | 檢查 Google Key 的網站限制是否為 `https://你的帳號.github.io/*` |
| 地圖停住不動 | 通常是手機斷線或被系統休眠。地圖會停在最後位置，恢復後自動續跑 |
| 地圖比畫面早或晚 | 調整 OBS 網址的 `delay=` |
| 字卡沒更新 | 看 `admin.html` 燈號，確認 `features` 已開啟，且 OBS 與小編網址的 `room` 相同 |
