//发表文章
$(function () {
  /* //文件预览
  $("#inputCover").on("change", function () {
    let myfile = $(this)[0].files[0];
    if (myfile == null) {
      return;
    }
    let url = URL.createObjectURL(myfile);
    $(".article_cover").attr("src", url);
  });
  //文章类别
  $.ajax({
    url: BigNew.category_list,
    dataType: "json",
    success: function (result) {
      console.log(result);
      if (result.code == 200) {
        $(".category").html(template("cateTemp", result));
      }
    },
  });
  //初始化jedate
  jeDate("#artcileDate", {
    trigger: "click",
    theme: { bgcolor: "orange", color: "#ffffff", pnColor: "#00CCFF" },
    format: "YYYY-MM-DD hh:mm:ss",
    isinitVal: true,
  });
  //初始化富文本框
  tinymce.init({
    selector: "#artcilecontent",
    height: "350px",
    language: "zh_CN",
    directionality: "ltl",
    browser_spellcheck: true,
    contextmenu: false,
    branding: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table contextmenu paste imagetools wordcount",
      "code",
    ],
    toolbar:
      "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
  }); */
  //封装发布文章的 请求的函数
  function publish(state) {
    let formdata = new FormData($("#form")[0]);
    formdata.append("content", tinymce.activeEditor.getContent());
    formdata.append("state", state);
    console.log(...formdata);
    //获取tinymce编辑器文本。得到的数据是一个网页结构
    console.log(tinymce.activeEditor.getContent());
    $.ajax({
      type: "post",
      url: BigNew.article_publish,
      data: formdata,
      dataType: "json",
      processData: false, //告诉ajax不要进行数据的处理
      contentType: false, //告诉ajax不要对数据进行编码处理
      success: function (result) {
        console.log(result);
        if (result.code == 200) {
          alert(result.msg);
          location.href = "./article_list.html";
          $('.level02>li:eq(0)',window.parent.document).addClass('active').siblings().removeClass('active');
        }
      },
      error: function (err) {
        // console.log(err);
        alert(err.responseJSON.msg);
      },
    });
  }
  //已发布
  $(".btn-release").on("click", function (e) {
    e.preventDefault();
    publish("已发布");
  });
  //存为草稿
  $(".btn-draft").on("click", function (e) {
    e.preventDefault();
    publish("草稿");
  });
});
