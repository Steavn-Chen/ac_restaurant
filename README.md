# Restaurant List 餐廳清單

使用 Node.js hdr Express 制作一個餐廳美食網站，這專案能夠使用搜索功能來尋找餐廳
並且點擊餐廳圖片能看到各餐廳的詳細資訊。

![restaurant-image](https://github.com/Steavn-Chen/AC_Restaurant/blob/main/%E9%A4%90%E5%BB%B3%E6%B8%85%E5%96%AEA1.PNG)
&emsp;
&emsp;
![restaurant-image](https://github.com/Steavn-Chen/AC_Restaurant/blob/main/%E9%80%B2%E5%85%A5%E9%A0%81%E9%9D%A2.PNG)

## 功能表單

  ### <1.0 版>

- 透過餐廳名稱或類別搜尋
- 顥示餐廳詳細資料包括類別、地址、電話、評、分圖片等資訊。

  ### <2.0 版>

- 針對 CRUD 的功能，可以新增一筆資料，也可以刪除、修改。

## 啓動方式

- 將專案 clone 到本地端

https://github.com/Steavn-Chen/test_retaurant

- 進入到專案資料夾

- 安裝 npm

npm install

- 透過 nodemon 啓動專案

nodemon app.js

- 若終端機出顥示出以下字串，表示成功。

Express is running on http://locahost:3000

出現 mongodb is connected! ，代表 mongodb 資料庫連接成功

- 在終端機輸入 npm run seed
  看到 mongodb is connected! done! 種子資料建立成功

## 開發環境

- Node.js -v10.15.0
- Express -4.17.1
- Express-Handlebars-5.3.3
- mongoose 5.12.9
