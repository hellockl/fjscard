// page/card/card.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var id = options.id;
    
    var data = {
      'url': '/miniappapi/getCardInfo',
      'data': {
        'id': id,
      }
    }
    app.postData(data, function (res) {
      if (res.status == 0) {
        wx.setStorageSync('hisCard', res.data);
        that.setData({
          cardData: res.data
        })
      }
    })
  },
  navToCall: function (options){
    //console.log(wx.getStorageSync('hisCard'));
    let hisCardInfo = wx.getStorageSync('hisCard');
    wx.addPhoneContact({
      firstName: hisCardInfo.name,
      mobilePhoneNumber:hisCardInfo.phoneNum,
      organization:hisCardInfo.company,
      success:function(res){
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000,
          
        });
      }
    })
  },
  navToIndex:function(options){
    wx.switchTab({
      url: '../index/index'
    })
  },
  navToComponent: function (options) {
    wx.switchTab({
      url: '../component/index'
    })
  },
  makephonecall: function () {
    var info = wx.getStorageSync('hisCard');
    wx.makePhoneCall({
      phoneNumber: info.phoneNum
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
  onShow: function (options) {
    
    
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