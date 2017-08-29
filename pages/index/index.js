//index.js
//获取应用实例
/*var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})*/

const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {

  },
  onUpper () {
    console.log('upper')
  },


  onShow () {
    console.log('show')
  },

  onLoad (options) {
    const _this = this
    console.log('_this: ', _this)
    console.log('load')
    
    API.getLocation()
       .then(API.getCityId)
       .then(cityId => {
           API.getNowWeather(cityId)
              .then( weather => {
                weather.format_last_update = Util.formatTime(weather.last_update)
                weather.bg = Util.getBackground(weather.now.code)
                _this.setData({weather})
                app.globalData.weather = weather
              }).catch(_this.onError)
            API.get24hWeather(cityId)
               .then( hourly => {
                 hourly.forEach(hour => {
                   hourly.forEach(hour => {
                     hour.img = `../../images/weather/${hour.code}.png`
                     hour.format_time = Util.formatHour(hour.time)
                   })
                   _this.setData({hourly})
                   app.globalData.hourly = hourly
                 })
               }).catch(_this.onError)
       }).catch(_this.onError)
  },
  onError (err) {
    wx.showToast({
      title: err.msg + '',
      duration: 2000
    })
  }



})
