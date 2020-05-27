$(function () {
    let temp = {}
    //获取数据，使用模板引擎渲染页面
    function init() {
        $.ajax({
            url: BigNew.category_list,
            dataType:'json',
            success: function (result) {
                console.log(result);
                $('tbody').html(template('tbody_content',result))
            }
        })
    }
    init()
    //点击按钮，新增或编辑数据
    $('.btn_add').on('click', function () {
        let name = $('#name').val().trim()
        let slug = $('#slug').val().trim()
        if (name == '' || slug == '') {
            alert('请输入名称和别名')
            return
        }
        if ($(this).text().includes('新增')) {
            addEdit(BigNew.category_add,{name:name,slug:slug},)
        } else {
            if (temp.name == name && temp.slug == slug) {
                alert('请修改内容，否则取消当前的操作')
            } else {
                addEdit(BigNew.category_edit,{name:name,slug:slug,id:$('[name="id"]').val()})
            }
        }
    })
    function addEdit(url,data) {
        $.ajax({
            type: 'post',
            url: url,
            data:data,
            dataType:'json',
            success: function (result) {
                console.log(result);
                if (result.code == 200 || result.code == 201) {
                    alert(result.msg)
                    $('#myModal').modal('hide')
                    init()
                }
            },
            error: function (err) {
              console.log(err); 
              alert(err.responseJSON.msg)  
            }
        })
    }

    //模态框消失，就清空表单元素所有的值
    $('#myModal').on('hidden.bs.modal', function (e) {
        //reset dom方法可以,可以清空表单元素所有的值
        $('form')[0].reset()
    })
    //使用事件委派，给动态生成的按钮添加点击事件 
    $('tbody').on('click','.btn_edit', function () {
        $('.modal-title').text('编辑分类')
        $('.btn_add').text('编辑')
        //data方法可以拿到选中元素以data开头的自定义属性和属性的值
        let {name,slug,id}= $(this).data()
        $('#name').val(name)
        $('#slug').val(slug)
        $('[name="id"]').val(id)
        temp={name,slug}//记录数据在编辑前的值
        // console.log($('form').serialize());
        /* $.ajax({
            url: BigNew.category_search,
            data: {id : $(this).data('id') },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#name').val(result.data[0].name)
                $('#slug').val(result.data[0].slug)
                $('[name="id"]').val(result.data[0].id)
            }
        }) */
    })
    $('#xinzengfenlei').on('click', function () {
        $('.modal-title').text('新增分类')
        $('.btn_add').text('新增')
    })
    $('.table tbody').on('click','.btn_del', function () {
        if (confirm('确定要删除吗')) {
            $.ajax({
                type:'post',
                url: BigNew.category_delete,
                data:{id : $(this).data('id') },
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (result.code == 204) {
                        alert(result.msg)
                        init()
                    }
                }
            })
        }
    })
})
