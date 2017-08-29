


const getLocation = () => {
    return Promise.resolve({
        then: (resolve, reject) => {
            wx.getLocation({
                type: 'wgs84',
                success: res => {
                    const latitude = res.latitude
                    const longitude = res.longitude
                    resolve(`${latitude} : ${longitude}`)
                },
                fail () {
                    resolve({status: 'Error', msg: '不！获取位置失败 o(TωT)o '})
                }
            })
        }
    })
}



const getCityId = location => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://weixin.jirengu.com/weather/cityid',
            data: {
                location
            },
            success (res) {
                if(res.data && res.data.results && res.data.results.length > 0) {
                    resolve(res.data.results[0]['id'])
                } else {
                    resolve({status: 'Error', msg: '不！获取城市ID失败 o(TωT)o '})
                }
            },
            fail () {
                resolve({status: 'Error', msg: '不！获取城市ID失败 o(TωT)o '})
            }
        })
    })
}




const getNowWeather = cityid => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://weixin.jirengu.com/weather/now',
            data: {
                cityid
            },
            success (res) {
                if(res.data && res.data.status && 
                   res.data.status === 'OK' && res.data.weather[0]) {
                       resolve(res.data.weather[0])
                   } else {
                       reject({status: 'Error', msg: '不！获取天气失败o(╥﹏╥)o'})
                   }
            },
            fail () {
                reject({status: 'Error', msg: '不！获取天气失败o(╥﹏╥)o'})
            }
        })
    })
}

const get24hWeather = cityid => {
    return Promise.resolve({
        then: (resolve, reject) => {
            wx.request({
                url: 'https://weixin.jirengu.com/weather/future24h',
                data: {
                    cityid
                },
                success (res) {
                    if(res.data && res.data.status && 
                   res.data.status === 'OK' && res.data.hourly ) {
                       resolve(res.data.hourly)
                   } else {
                       reject({status: 'Error', msg: '不！获取当天24小时的天气失败o(╥﹏╥)o'})
                   }
                },
                fail () {
                    reject({status: 'Error', msg: '不！获取当天24小时的天气失败o(╥﹏╥)o'})
                }
            })
        }
    })
}

module.exports = {
    getNowWeather,
    get24hWeather,
    getCityId,
    getLocation
}