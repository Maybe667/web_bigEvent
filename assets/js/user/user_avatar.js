// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

document.querySelector('#btnChooseImage').addEventListener('click', function () {
    document.querySelector('#file').click()
})

document.querySelector('#file').addEventListener('change', function (e) {
    let filelist = e.target.files
    if (filelist.length === 0) {
        return layer.msg('请选择照片！')
    }

    // 1. 拿到用户选择的文件
    let file = e.target.files[0]
    // 2. 将文件，转化为路径
    let imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
document.querySelector('#btnUpload').addEventListener('click', function () {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    let data = {
        avatar: dataURL
    }

    // 2. 调用接口，把头像上传到服务器  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    axios({
        url: '/my/update/avatar',
        method: 'post',
        data: Qs.stringify(data)
    }).then(res => {
        //成功回调
        console.log(res)
        if (res.data.status !== 0) {
            return layui.layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
    })
})