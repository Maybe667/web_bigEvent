(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    function initUserInfo() {
        axios({
            url: '/my/userinfo',
            method: 'GET',
        }).then(res => {
            //成功回调
            // console.log(res.data.data)
            form.val('formUserInfo', res.data.data)
        })
    }
    initUserInfo()

    document.querySelector('[type="reset"]').addEventListener('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    document.querySelector('.layui-form').addEventListener('submit', function (e) {
        e.preventDefault()
        data = {
            id: document.querySelector('[name="id"]').value,
            nickname: document.querySelector('[name="nickname"]').value,
            email: document.querySelector('[name="email"]').value
        }

        axios({
            url: '/my/userinfo',
            method: 'POST',
            data: Qs.stringify(data),
        }).then(res => {
            //成功回调
            console.log(res)
            if (res.data.status !== 0) {
                return layui.layer.msg('更新用户信息失败！')
            }
            layui.layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
        })
    })
})()