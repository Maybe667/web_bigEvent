
// //(1).实例化ajax对象
// let xhr = new XMLHttpRequest()
// //(2).设置请求方法和地址
// xhr.open('get', 'http://api-breakingnews-web.itheima.net/my/userinfo')
// //(3).设置请求头(post请求才需要设置)
// xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`)
// xhr.send()
// //(5).注册回调函数
// xhr.onload = function () {
//     console.log(JSON.parse(xhr.responseText))
//     const res = JSON.parse(xhr.responseText)
//     if (res.status !== 0) {
//         return layui.layer.msg('获取用户信息失败')
//     }
//     //渲染用户头像
//     renderAvatar(res.data)
// }
axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
function getUserInfo() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    axios({
        url: '/my/userinfo',
        method: 'GET',
    }).then(res => {
        //成功回调
        console.log(res)
        if (res.data.status !== 0) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.msg('获取用户信息失败')
            return
        }
        //渲染用户头像
        renderAvatar(res.data.data)
    })
}
getUserInfo()

//封装一个渲染头像函数
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}

// 实现退出功能
document.querySelector('#btnLogout').addEventListener('click', function () {
    layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index)
    })
})
