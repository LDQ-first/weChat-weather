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
    _this.setData({weather: {}, hourly: {}, hidden: false})
    return API.getLocation()
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
              })
              .then(() => {
                  this.setData({hidden: true})
              })
              .catch(_this.onError)
  },
  onPullDownRefresh () {
    console.log("下拉了")
     wx.showNavigationBarLoading()
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
