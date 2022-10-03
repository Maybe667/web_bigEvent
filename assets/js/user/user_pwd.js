var form = layui.form

form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
        if (value === document.querySelector('[name=oldPwd]').value) {
            return '新旧密码不能相同！'
        }
    },
    rePwd: function (value) {
        if (value !== document.querySelector('[name=newPwd]').value) {
            return '两次密码不一致！'
        }
    }
})

axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
document.querySelector('.layui-form').addEventListener('submit', function (e) {
    e.preventDefault()
    data = {
        oldPwd: document.querySelector('[name="oldPwd"]').value,
        newPwd: document.querySelector('[name="newPwd"]').value
    }
    axios({
        url: '/my/updatepwd',
        method: 'POST',
        data: Qs.stringify(data),
    }).then(res => {
        //成功回调
        console.log(res)
        if (res.data.status !== 0) {
            return layui.layer.msg(res.data.message)
        }
        layui.layer.msg('更新密码成功！')
        document.querySelector('.layui-form').reset()

    })
})