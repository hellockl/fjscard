function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    slider: [
      {
        id: 11160,
        linkUrl: "http://y.qq.com/w/taoge.html?id=0",
        picUrl: "http://img.fangjinsuo.com/banner/2016/0429/banner_1461875185_3212.jpg"
      },
      {
        id: 11160,
        linkUrl: "http://y.qq.com/w/taoge.html?id=0",
        picUrl: "http://img.fangjinsuo.com/banner/2016/0429/banner_1461875124_8671.png"
      }
    ],
    playingId: 0,
    id: 1,
    src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  makephonecall: function () {
    
    wx.makePhoneCall({
      phoneNumber: '4008102999'
    })
  },
  videoPlay(e) {
    let id = e.currentTarget.dataset.imgid;
    if (id == 1) {
      this.setData({
        playingId: id,
        id: 0
      });
    } else {
      this.setData({
        playingId: id,
        id: 1
      });
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})