$(function () {
    let page=1,perpage=10
    //获取文章数据，用模板引擎实现页面渲染,
    //页码的展示
    function init() {
        $.ajax({
            url: BigNew.article_query,
            data:{page:page,perpage:perpage,type:$('#selCategory').val(),state:$('#selStatus').val()},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result.code == 200) {
                    /* $('tbody').html(template('article', result.data))
                    //解决没有数据的情况下，页码的展示
                    if(result.data.totalPage>1){
                        setPage(result.data.totalPage)
                    } else {
                        setPage(1)
                    } */
                    totalcount = result.data.totalCount
                    if (result.data.data.length > 0) {
                        $('tbody').html(template('article', result.data))
                        setPage(result.data.totalPage)
                    } else {   
                        $('tbody').html('<tr><td colspan="6" style="text-align:center">暂无数据</td></tr>')
                        setPage(0)
                    }
                }
            }
        })    
    } 
    init()
    //分页
    /**
     *
     * @param page 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    function setPage(pageSum) {
        if (pageSum == 0) {
            $(".pagination").html('');
            return
        }
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, pageindex) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                /* currentPage = page
                callback && callback() */
                // console.log(pageindex);
                if (page != pageindex) {
                    page = pageindex
                    init()
                }
            }
        })
    }
    //获取分类数据，用模板引擎实现分类下拉列表的数据渲染
    $.ajax({
        url: BigNew.category_list,
        dataType: 'json',
        success: function (result) {
            console.log(result);
            $('#selCategory').html(template('sortTemp',result))
        }
    })
    //筛选
    $('#btnSearch').on('click', function () {
        // e.preventDefault()
        /* let type = $('#selCategory').val()
        let state = $('#selStatus').val() */
        // console.log(type,state);
        page = 1
        init()
    })
    //删除当前数据
    $('tbody').on('click', '.delete', function () {
        $.ajax({
            type:'post',
            url: BigNew.article_delete,
            data:{id:$(this).data('id')}, 
            dataType: 'json',
            success: function (result) {
                // console.log(result);
                alert(result.msg)
               /*  if ($('tbody tr').length == 1 && page>1) {
                    page--
                } */
                if (Math.ceil((totalcount - 1) / perpage) < page){
                    page--
                }
                init()
            }
        })
    })
    //设置，点击发表文章按钮后，让侧边栏的发表文章高亮，还有一种方式就是点击按钮后让左边的发表文章触发点击事件 
   /*  $('#release_btn').click(function(){
      // 第二个参数：document，默认是当前窗口document
      $('.level02>li:eq(1)',window.parent.document).addClass('active').siblings().removeClass('active');
    }); */
})