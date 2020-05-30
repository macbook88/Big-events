//入口函数
$(function () {
  //搜索按钮点击事件
  $(".search_btn").click(function () {
    //获取搜索内容
    var text = $(".search_txt").val();
    //ajax请求
    $.ajax({
      url: "http://localhost:8080/api/v1/index/search",
      type: "get",
      dataType: "json",
      data: {
        page: 1,
        perpage: 10,
        key: text,
      },
      success: function (result) {
        console.log(result);
        $(".setfr").html(template("news", result));
      },
    });
  });

  //页面一加载：默认搜索全部
  $(".search_btn").trigger("click");
});
