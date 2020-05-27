$(function () {
    //这种方式不能获取多个参数
    // let id = location.search.split('=')[1]
    // console.log(id);
    //调用封装的函数功能来获取id
    let id = itcast.getAutting(location.search).id
    // console.log(itcast.getAutting(location.search));
    $.ajax({
        url: BigNew.article_search,
        data:{id:id},
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.code == 200) {
                $('.title').val(result.data.title)
                $('.article_cover').attr('src',result.data.cover)
                $('.category').val(result.data.categoryId)
                $('#artcileDate').val(result.data.date)
                //这里拿到的文章内容给textarea，原因是富文本框是可以读取textarea的内容的
                $('#artcilecontent').val(result.data.content)
                //因为tinymce比较大，加载需要时间,会造成数据回来，但是插件还没加载完，所以加个延时
                /* setTimeout(function () {
                    tinymce.activeEditor.setContent(result.data.content)
                }, 200); */ 
            }
        }
    })
    function editDraft(state) {
        let formdata = new FormData($('form')[0])
        formdata.append('content', tinymce.activeEditor.getContent())
        formdata.append('id', id)
        formdata.append('state', state)
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: formdata,
            processData: false, //告诉ajax不要进行数据的处理
            contentType: false, //告诉ajax不要对数据进行编码处理
            success: function (result) {
                console.log(result);
                if (result.code == 200) {
                    alert(result.msg)
                    location.href = './article_list.html'
                }
            }
        })
    }
    $('.btn-edit').on('click', function (e) {
        e.preventDefault()
        editDraft('已发布')
    })
    $('.btn-draft').on('click', function (e) {
        e.preventDefault()
        editDraft('草稿')
    })
})