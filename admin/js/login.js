$(function () {
  $(".input_sub").on("click", function () {
    let username = $(".input_txt").val().trim();
    let password = $(".input_pass").val().trim();
    if (username == "" || password == "") {
      $(".modal-body>p").text("用户名或密码不能为空");
      $("#myModal").modal({
        //keyboard: true,
        //show:true
      });
      return;
    }
    $.ajax({
      type: "post",
      url: window.BigNew.user_login,
      data: { username: username, password: password },
      dataType: "json",
      success: function (result) {
        console.log(result);
        if (result.code == 200) {
          //设置模态框提示后消失
          $(".modal-body>p").text(result.msg);
          $("#myModal").modal({
            /* keyboard: true,show:true */
          });
          //登录成功后点击确定按钮，跳转页面并存储token
          $(".define").on("click", function () {
            $("#myModal").modal("hide");
            $("#myModal").on("hidden.bs.modal", function (e) {
              localStorage.setItem("linbai", result.token);
              location.href = "./index.html";
            });
          });
        } else {
          //设置模态框提示后消失
          $(".modal-body>p").text(result.msg);
          $("#myModal").modal({
            /* keyboard: true,show:true */
          });
        }
      },
    });
  });
  $("input").keydown(function (e) {
    e = window.event || e;
    // 获得键盘对应的键位
    let keyNum = e.keyCode || e.charCode || e.which;
    if (keyNum == 13) {
      // 此刻用户点击了回车
      $(".input_sub").click();
    }
  });
});
