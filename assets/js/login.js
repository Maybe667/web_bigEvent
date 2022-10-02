(function () {
    let link_reg = document.querySelector('#link_reg')
    let link_login = document.querySelector('#link_login')
    // 点击“去注册账号”的链接
    link_reg.addEventListener('click', function () {
        document.querySelector('.reg-box').classList.remove('active')
        document.querySelector('.login-box').classList.add('active')
    })
    // 点击“去登录”的链接
    link_login.addEventListener('click', function () {
        document.querySelector('.login-box').classList.remove('active')
        document.querySelector('.reg-box').classList.add('active')
    })

    let form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            let pwd = document.querySelector('.reg-box [name="password"]')
            if (pwd.value !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // id="form_reg"
    // axios.defaults.baseURL = 'http://www.liulongbin.top:3007';
    // axios({
    //     url: '/api/reguser',
    //     method: 'POST',
    //     data: { 'post请求参数'},
    // }).then(res => {
    //     //成功回调
    //     console.log(res)
    // })

    let layer = layui.layer
    axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
    // 注册事件 
    document.querySelector('#form_reg').addEventListener('submit', function (e) {
        e.preventDefault()
        data = {
            username: document.querySelector('#form_reg [name="username"]').value,
            password: document.querySelector('#form_reg [name="password"]').value
        }
        axios({
            url: '/api/reguser',
            method: 'post',
            data: Qs.stringify(data)
        }).then(res => {
            //成功回调
            console.log(res)
            if (res.data.status !== 0) {
                return layer.msg('注册失败')
            }
            layer.msg('注册成功，正在跳转到登录页面')
            // location.href = '/index.html'
            document.querySelector('#link_login').click()
        })
    })

    // 登录事件
    document.querySelector('#form_login').addEventListener('submit', function (e) {
        e.preventDefault()
        data = {
            username: document.querySelector('#form_login [name="username"]').value,
            password: document.querySelector('#form_login [name="password"]').value
        }
        axios({
            url: '/api/login',
            method: 'POST',
            data: Qs.stringify(data)
        }).then(res => {
            //成功回调
            console.log(res)
            if (res.data.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.data.token)
            location.href = '/index.html'
        })
    })
})();