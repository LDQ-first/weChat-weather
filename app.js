App({
  onLaunch () {
    console.log('launch')
  },
  onShow () {
    console.log('show')
  },
  onHide () {
    console.log('hide')
  },
  onError () {
    console.log('error')
  },
  globalData: {
    weather: null,
    hourly: null
  }
})