$(function () {
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
      });
})
//添加项目中需要的功能函数
let itcast = {
    // es6新语法在对象中封装函数可以不写function
    getAutting(str) {
        let obj = {}
        str = str.substr(1) //从一开始截取是为了去除问号
        let arr = str.split('&') //切割字符串为一个数组
        arr.forEach(function (value) {
            let temp = value.split('=')
            obj[temp[0]] = temp[1]
        })
        return obj
    }
}