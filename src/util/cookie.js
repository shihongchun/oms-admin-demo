function getCookie (name) {
  var cookieArr = document.cookie.split('; ')
  for (var item of cookieArr) {
    let arr = item.split('=')
    if (arr === name) {
      return arr[1]
    }
  }
  return -1
}
function setCookie (name, val, iDay) {
  if (iDay) {
    var date = new Date()
    date.setDate(date.getDate() + iDay)
    window.document.cookie = name + '=' + val + '; PATH=/; EXPIRES=' + date.toGMTString()
  } else {
    window.document.cookie = name + '=' + val + '; PATH=/'
  }
}
function delCookie (name) {
  setCookie(name, 1, -1)
}
export default {
  setCookie,
  getCookie,
  delCookie
}
