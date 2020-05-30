$(function () {
  // 最新评论
  $.ajax({
    url: "http://localhost:8080/api/v1/index/latest_comment",
    dataType: "json",
    success: function (result) {
      console.log(result);
      $(".comment_list").html(template("commentList", result));
    },
  });
  // 分类列表
  $.ajax({
    type: "get",
    url: "http://localhost:8080/api/v1/index/category",
    success: function (result) {
      console.log(result);
      $(".level_two").html(template("cat_list", result));
    },
  });
  // 文章热门排行
  $.ajax({
    url: "http://127.0.0.1:8080/api/v1/index/rank",
    dataType: "json",
    success: function (result) {
      console.log(result);
      if (result.code == 200) {
        $(".hotrank_list").html(template("hotorderTemp", result));
      }
    },
  });
    //焦点关注
  $.ajax({
    url: "http://localhost:8080/api/v1/index/attention",
    dataType: "json",
    success: function (result) {
      console.log(result);
      $(".guanzhu_list").html(template("follow", result));
    },
  });
});
