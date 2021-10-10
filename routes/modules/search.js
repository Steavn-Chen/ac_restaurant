const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  let keyword = req.query.keyword.trim()
  if (!keyword) { keyword = null }
  console.log(keyword, typeof keyword, typeof Restaurant)
  // 第一種方法
  // const regex = new RegExp( keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi')
  // console.log(regex,typeof regex)
  // Restaurant.find({$or:[{name: regex},{category: regex}]})
  // .lean()
  // .then(restaurants => { if (restaurants.length) return res.render('index', { restaurants, keyword})
  //   return res.render('searchOut',{ keyword})
  // })
  // .catch(error => console.log(error))
// 第二種mongoose語法
   Restaurant.find({ $or: [{ name: { $regex: `${keyword}`, $options: 'i' } }, { category: { $regex: `${keyword}`, $options: 'i' } }] })
  .lean()
  .then(restaurants => { console.log(restaurants.length)
    if (restaurants.length) return res.render('index', { restaurants, keyword }) 
    return res.render('searchOut', { keyword })
  })
  .catch(error => console.log(error))
  // const restaurants = restaurantList.results.filter(function (item) {
  //   return item.name.toLowerCase().includes(keyword.toLowerCase()) ||
  //     item.category.toLowerCase().includes(keyword.toLowerCase())
  // });
  // res.render("index", { restaurants: restaurants, keyword: keyword });
})

module.exports = router