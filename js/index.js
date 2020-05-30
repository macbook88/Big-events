$(function () {
  // 热点图
  $.ajax({
    url: "http://127.0.0.1:8080/api/v1/index/hotpic",
    dataType: "json",
    success: function (result) {
      console.log(result);
      if (result.code == 200) {
        $(".focus_list").html(template("hotTemp", result));
      }
    },
  });
  //最新资讯
  $.ajax({
    url: "http://127.0.0.1:8080/api/v1/index/latest",
    dataType: "json",
    success: function (result) {
      console.log(result);
      if (result.code == 200) {
        $(".common_news").html(template("lestNewsTemp", result));
      }
    },
  });
 
});
