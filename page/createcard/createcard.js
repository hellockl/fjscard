// page/createcard/createcard.js
var app = getApp();
var maxTime = 2
var currentTime = maxTime //倒计时的事件（单位：s）  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardData: {
      'id': '',
      'name': '',
      'position': '',
      'mobile': '',
      'companyName': '',
      'email': '',
      'more': '', 
      'position':'',
      'avatarUrl':''        
    },
    a:'',
    time:-1
  },
  cardDataName: function (e) {
    this.setData({
      'cardData.name': e.detail.value
    })
  },
  cardDataPosition: function (e) {
    this.setData({
      'cardData.position': e.detail.value
    })
  },
  cardDataMobile: function (e) {
    this.setData({
      'cardData.mobile': e.detail.value
    })
  },
  cardDataCompanyName: function (e) {
    this.setData({
      'cardData.companyName': e.detail.value
    })
  },
  cardDataMore: function (e) {
    this.setData({
      'cardData.more': e.detail.value
    })
  },
  cardDataEmail: function (e) {
    this.setData({
      'cardData.email': e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    if (options.id === "0") {
      var userInfo = wx.getStorageSync('userInfo');
      that.setData({
        'cardData.avatarUrl': userInfo.avatarUrl,
        'cardData.name': userInfo.nickName
      })
      wx.setNavigationBarTitle({
        title: '创建名片'
      })
    } else {
      var cardDataInfo = wx.getStorageSync('cardDataInfo');
      that.setData({
        'cardData.avatarUrl': cardDataInfo.avatarUrl,
        'cardData.name': cardDataInfo.name,
        'cardData.mobile': cardDataInfo.phoneNum,
        'cardData.companyName': cardDataInfo.company,
        'cardData.position': cardDataInfo.position,
        'cardData.email': cardDataInfo.email,
        'cardData.more': cardDataInfo.more,
        'cardData.id':cardDataInfo.id
      })
      wx.setNavigationBarTitle({
        title: '编辑名片'
      })
    }
  },
  /**
   * 创建片信息
   * 
   */
  formSubmit: function (e) {  
    var that = this  
    if (e.detail.value.name === '') {
      wx.showToast({
        title: '请填写姓名',
        image: '../../image/error.png',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.mobile === '') {
      wx.showToast({
        title: '请输入手机号',
        image: '../../image/error.png',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.companyName === '') {
      wx.showToast({
        title: '请输入公司名称',
        image: '../../image/error.png',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.email !== '') {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(e.detail.value.email)) {
        wx.showToast({
          title: '邮箱错误',
          image: '../../image/error.png',
          duration: 2000
        })
        return false;
      }
    }
    var data = {
      'url': '/miniappapi/createCard',
      'data': {
        'id': that.data.cardData.id,
        'name': e.detail.value.name,
        'position': e.detail.value.position,
        'phoneNum': e.detail.value.mobile,
        'company': e.detail.value.companyName,
        'more': e.detail.value.more,
        'email': e.detail.value.email,
        'avatarUrl': that.data.cardData.avatarUrl,
        'openid':wx.getStorageSync('openid')
      }
    }
    app.postData(data, function (res) {
      wx.setStorageSync('cardDataInfo', data.data);
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 3000,
        success:function(res){
          var interval = setInterval(function () {
            currentTime--
            that.setData({
              time: currentTime
            })
            if (currentTime <= 0) {
              currentTime = -1
              clearInterval(interval)
              that.setData({
                time: -1
              });
              wx.navigateBack({
                delta: 1
              })
            }
          }, 1000)
          
        }
      });
      
    })
      
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  }
})