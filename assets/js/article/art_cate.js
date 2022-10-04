axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
function initArtCateList() {
    axios({
        url: '/my/article/cates',
        method: 'GET',
    }).then(res => {
        //成功回调
        console.log(res)
        let htmlStr = template('tpl-table', res.data)
        document.querySelector('tbody').innerHTML = htmlStr
    })
}
initArtCateList()

let indexAdd = null
let layer = layui.layer
document.querySelector('#btnAddCate').addEventListener('click', function () {
    indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: document.querySelector('#dialog-add').innerHTML
    })
})

// 通过代理的形式，为 form-add 表单绑定 submit 事件
$('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('新增分类失败！')
            }
            initArtCateList()
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
        }
    })
})

let indexEdit = null
$('tbody').on('click', '.btn-edit', function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
    })
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3007/my/article/cates/' + id,
        success: function (res) {
            form.val('form-edit', res.data)
        }
    })
})

