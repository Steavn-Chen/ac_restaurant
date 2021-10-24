# Restaurant List 餐廳清單

使用 Node.js hdr Express 制作一個餐廳美食網站，這專案能夠使用搜索功能來尋找餐廳
並且點擊餐廳圖片能看到各餐廳的詳細資訊。

![restaurant-image](https://github.com/Steavn-Chen/AC_Restaurant/blob/main/%E9%A4%90%E5%BB%B3%E6%B8%85%E5%96%AEA1.PNG)

## 功能表單

### <1.0 版>

- 透過餐廳名稱或類別搜尋
- 顥示餐廳詳細資料包括類別、地址、電話、評、分圖片等資訊。

  ### <2.0 版>

- 針對 CRUD 的功能，可以新增一筆資料，也可以刪除、修改。

  ### <3.0 版>

- 網站設為會員制，使用者必需先註冊才可以使用。

- 使用者可以透過第三方 FB 註冊。

- 增加按紐換餐廳資料為卡片或者為清單模式。

- 使用者透過排序按紐，將資料用類別，評分，名稱來排序所有的資料。

## 啓動方式

- 將專案 clone 到本地端

https://github.com/Steavn-Chen/test_retaurant

- 進入到專案資料夾

- 安裝 npm

  npm install

- 啓動專案

npm run dev

- 若終端機出顥示出以下字串，表示成功。

Express is running on Express is running on http://locahost:3000

出現 mongodb is connected! ，代表 mongodb 資料庫連接成功

- 在終端機輸入 npm run seed
  看到 mongodb is connected! done! 種子資料建立成功

## 開發環境

- Node.js -v10.15.0
- Express -4.17.1
- Express-Handlebars-5.3.3
- mongoose 5.12.9

## 使用的套件

- passport
- passport-facebook
- passport-local
- bcryptjs
- express-session
- express-handlebars