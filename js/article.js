$(function(){
    let id = location.search.split('=')[1]
    //文章详情
    $.ajax({
        url:'http://127.0.0.1:8080/api/v1/index/article',
        data:{id},
        dataType:'json',
        success:function(result){
            if(result.code == 200){
                $('.articleTEMPLATE').html(template('articleTemp',result.data))
            }
        }
    })
    //发表评论
    $('.comment_sub').click(function (e) {
        //禁止默认行为
        e.preventDefault();
        if ($('.comment_name').val().trim() == '' || $('.comment_input').val().trim() == '') {
            alert('请输入用户名和评论内容');
            return;
        };
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/post_comment',
            type: 'post',
            dataType: 'json',
            data: {
                author: $('.comment_name').val(),
                content: $('.comment_input').val(),
                articleId: id
            },
            success: function (result) {
                console.log(result);
                if (result.code == 201) {
                    alert('发表成功');
                    location.reload();
                }
            }
        });
    });
    // 评论列表
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/get_comment',
        dataType: 'json',
        data: {
            articleId: id
        },
        success: function (result) {
            console.log(result);
            $('.comment_list_con').html(template('comment', result));
            //根据数组长度显示评论条数
            $('.comment_count').text(result.data.length + '条评论');
        }
    });
})