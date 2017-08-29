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
   _this.setData({weather: {}, hidden: false})
    if(app.globalData.weather) {
      app.globalData.weather.future = app.globalData.weather.future.slice(1,8)
      _this.setData({weather: app.globalData.weather})
      return new Promise((resolve, reject) => {
        this.setData({hidden: true})
        resolve()
      }) 
   }

    return API.getLocation()
              .then(API.getCityId)
              .then(API.getNowWeather)
              .then(weather => {
                    weather.format_last_update = Util.formatTime(weather.last_update)
                    weather.bg = Util.getBackground(weather.now.code)
                    weather.future = weather.future.slice(1,8)
                    _this.setData({weather})
                    app.globalData.weather = weather
                    console.log('weather: ', weather)
              })
              .then(() => {
                console.log('this: ', this)
                this.setData({hidden: true})
              })
              .catch(_this.onError)

  },
  onPullDownRefresh () {
    console.log("下拉了")
    wx.showNavigationBarLoading()
    app.globalData.weather = null
    this.onLoad()
        .then(() => {
           wx.hideNavigationBarLoading()
           wx.stopPullDownRefresh()
        })
  },
  onError (err) {
    wx.showToast({
      icon: 'loading',
      title: err.msg + '',
      duration: 2000
    })
  }



})