// page/component/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    cardData:'' ,
    isshow:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    
  },
  getMyCardInfo(){
    var that = this
    
    var data = {
      url: '/miniappapi/getCardInfo',
      data: {
        id: 1
      }
    }
    var d='';
    app.postData(data, function (res) {
      if(res.status==0){
        that.setData({
          a: '123456'
        })
        d = '123';  
         
      }
    })
    
  },
  /**
   * 创建名片
   */
  navToCreatecard: function () {
    wx.navigateTo({
      url: '../createcard/createcard?id=0'
    })
  },
  navToCard: function () {
    wx.navigateTo({
      url: '../card/card?id=6'
    })
  },
  navToEditCard:function(){
    wx.navigateTo({
      url: '../createcard/createcard?id=1'
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                success: function (res) {
                  wx.setStorageSync('userInfo', res.userInfo);
                }
              })
            }
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    var that = this
    var cardDataInfo = wx.getStorageSync('cardDataInfo');
    
    if (cardDataInfo) {

      that.setData({
        isshow: 1,
        cardData: cardDataInfo
      })
    } else {

      app.getOpenid('', function (result) {
        wx.request({
          url: 'https://www.fangjinsuo.com/miniappapi/getcardinfobyopenid',
          method: 'POST',
          data: {
            openid: result
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          success: function (result) {
            
            if (result.data.status == 0) {

              wx.setStorageSync('cardDataInfo', result.data.data);
              that.setData({
                isshow: 1,
                cardData: result.data.data
              })
            } else {
              that.setData({
                isshow: 2,

              })
            }

          }
        })
      })
    }
  },

  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let cardDataInfo = wx.getStorageSync('cardDataInfo');
    console.log(cardDataInfo);
    if(cardDataInfo){
      console.log(cardDataInfo.id);
      return {
        title: '您好，这是我的名片，请惠存',
        path: '/page/card/card?id=' + cardDataInfo.id,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    
  }
})