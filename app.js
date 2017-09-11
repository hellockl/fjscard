//app.js
App({
  onLaunch: function () {
    
    var openid = wx.getStorageSync('openid');
    var that = this;
    if(!openid){
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求         
            wx.request({
              url: 'https://www.fangjinsuo.com/miniappapi/getOpenid',
              method: 'POST',
              data: {
                code: res.code,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              success: function (result) {
                
                that.globalData.openid = result.data.data;
                wx.setStorageSync('openid', result.data.data)
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
    
    
  },
  
  globalData: {
    userInfo: null,
    openid:''
  },
  postData: function (data, callback) {
    var url = 'https://www.fangjinsuo.com' + data.url
    wx.request({
      url: url,
      method: 'POST',
      data: data.data,
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  getOpenid: function (val, callback)  {
    var openid = wx.getStorageSync('openid');
    
    if (openid) {
      callback(openid)
    } else {
      
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求         
            wx.request({
              url: 'https://www.fangjinsuo.com/miniappapi/getopenid',
              method: 'POST',
              data: {
                code: res.code,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              success: function (result) {
                callback(result.data.data);
                //that.globalData.openid = result.data.data;
                wx.setStorageSync('openid', result.data.data)
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }

  },
  
})