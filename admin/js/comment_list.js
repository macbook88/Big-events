$(function () {
    let page = 1, perpage = 10
    function init() {
        $.ajax({
            url: BigNew.comment_search,
            data: { page: page, perpage: perpage },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result.code == 200) {
                    $('tbody').html(template('commentTemp',result.data))
                    setPage(result.data.totalPage)
                }
            }
        })
    } 
    init()
    /**
     *
     * @param page 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    function setPage( pageSum ) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,pageindex) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                // currentPage = page
                // callback && callback()
                if (page != pageindex) {
                    page = pageindex
                    init()
                }
            }
        })
    }

    function commentopt(url,id) {
        $.ajax({
            type: 'post',
            url: url,
            data: { id,id },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result.code == 200) {
                    alert(result.msg)
                    init()
                }
            }
        })
    }
    $('tbody').on('click','.btnaccept' ,function () {
        commentopt(BigNew.comment_pass,this.dataset.id)
    })
    $('tbody').on('click','.btnreject' ,function () {
        commentopt(BigNew.comment_reject,this.dataset.id)
    })
    $('tbody').on('click','.btndel' ,function () {
        commentopt(BigNew.comment_delete,this.dataset.id)
    })
})