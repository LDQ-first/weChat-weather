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
    console.log('load')
    console.log('app.globalData: ', app.globalData)

    if(app.globalData.weather) {
      _this.setData({weather: app.globalData.weather})
      return
    }

    API.getLocation()
       .then(API.getCityId)
       .then(API.getNowWeather)
       .then(weather => {
            weather.format_last_update = Util.formatTime(weather.last_update)
            weather.bg = Util.getBackground(weather.now.code)
            _this.setData({weather})
            app.globalData.weather = weather
            console.log('weather: ', weather)
       }).catch(_this.onError)

  },
  onError (err) {
    wx.showToast({
      title: err.msg + '',
      duration: 2000
    })
  }



})