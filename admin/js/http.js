//封装专门处理url的js文件
(function(w) {
    let baseURL = 'http://localhost:8080/api/v1'
    let BigNew = {
        baseURL:baseURL,//基地址
        user_login:      baseURL + '/admin/user/login',//用户登录
        user_info:       baseURL + '/admin/user/info',//用户信息
        user_detail:     baseURL + '/admin/user/detail',//用户详情
        user_edit:       baseURL + '/admin/user/edit',//用户编辑
        category_list:   baseURL + '/admin/category/list',//文章类别查询
        category_add:    baseURL + '/admin/category/add',//文章类别新增
        category_search: baseURL + '/admin/category/search',//文章类别搜索
        category_edit:   baseURL + '/admin/category/edit',//文章类别编辑
        category_delete: baseURL + '/admin/category/delete',//文章类别删除
        article_query:   baseURL + '/admin/article/query',//文章搜索
        article_publish: baseURL + '/admin/article/publish',//文章发布
        article_search:  baseURL + '/admin/article/search',//文章信息查询
        article_edit:    baseURL + '/admin/article/edit',//文章编辑
        article_delete:  baseURL + '/admin/article/delete',//文章删除
        comment_search:    baseURL + '/admin/comment/search',//文章评论列表
        comment_pass:    baseURL + '/admin/comment/pass',//文章评论通过
        comment_reject:  baseURL + '/admin/comment/reject',//文章评论不通过
        comment_delete:  baseURL + '/admin/comment/delete',//文章评论删除
    }
    w.BigNew = BigNew
})(window)

//ajaxSetup可以进行Ajax请求前的全局配置
//所有ajax请求都会经过这个配置
$.ajaxSetup({
    //在发送ajax之前，给所有的请求都设置请求头（从localStorage中读取token）
    beforeSend(xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem('linbai'));
    },
    error(xhr,status,error) {//请求错误的时候会进入这个方法进行拦截
        console.log(xhr.responseText);
        console.log(status);//错误状态
        console.log(error);//
        console.log(xhr);
        // error：就是之前的err.statusText
        if(error == 'Forbidden'){//用户未登录
            alert(xhr.responseJSON.msg)
            window.location = './login.html';//跳转登陆页面
        }; 
    }
});
