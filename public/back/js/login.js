/**
 * Created by Administrator on 2018/4/6.
 */

$(function(){

  //1、进行表单校验，用户名不能为空，密码不能为空，且必须为6-12位
  $("#form").bootstrapValidator({
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    },

    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须在6-30之间'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度在6-12之间'
          },
          callback:{
            message:"密码错误"
          }
        }
      }

    }

  });
   //2./登录请求
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      datatype:"json",
      success:function(info){
        if(info.success){
          location.href="index.html"
        }
        if(info.error==1000){
          $("#form").data("bootstrapValidator").
          updateStatus("username","INVALID","callback")
        };
        if(info.error==1001){
          $("#form").data("bootstrapValidator").
          updateStatus("password","INVALID","callback")
        }
      }
    })

  })

  $('[type="reset"]').click(function(){
    //console.log(77)
    $("#form").data("bootstrapValidator").resetForm();
  })

})