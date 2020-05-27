$(function () {
    $.ajax({
        url: window.BigNew.user_detail,
        dataType: 'json',
        success: function (result) {
            console.log(result);
            $('[name="username"]').val(result.data.username)
            $('[name="nickname"]').val(result.data.nickname)
            $('[name="email"]').val(result.data.email)
            $('[name="password"]').val(result.data.password)
            $('.user_pic').attr('src',result.data.userPic)
        }
    })
    $('#exampleInputFile').on('change', function () {
        //获取file文件元素对象的文件数据
        let myfile = this.files[0]
        if (myfile == null) {
            return
        }
        let url = URL.createObjectURL(myfile)
        console.log(url);
        $('.user_pic').attr('src',url)
    })
    $('.btn-edit').on('click', function () {
        console.log(new FormData($('#form')[0]));
        $.ajax({
            type: 'post',
            url: window.BigNew.user_edit,
            data: new FormData($('#form')[0]),
            dataType: 'json',
            processData: false, //告诉ajax不要进行数据的处理
            contentType: false, //告诉ajax不要对数据进行编码处理
            success: function (result) {
                console.log(result);
                if (result.code == 200) {
                    alert(result.msg)
                    //下边代码需要用live-server方式打开，用磁盘打开会有同源策略的问题
                    //为了刷新页面
                    window.parent.location.reload()
                    // window.top.location.reload()
                }
            }
        })
    })
})