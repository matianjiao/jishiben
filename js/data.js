$(function(){

//    按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    var formclose=$(".close");

//    输入框的动画
    var flag=true;
    add.click(function(){
        //alert(1);
        if(flag){
            form.attr("data-ani","animate-slidedown").css({display:"block"});
            flag=false;
        }else{
            form.attr("data-ani","animate-slideup");
            flag=true;
        }
    });
    //关闭输入框
    formclose.click(function(){
        form.css({display:"none"});
        flag=true;
    })

//    表单验证
    var obj,oldv,str;
    $(".submit").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();
        if(textv==""){
            alert("标题不能为空");
            return;
        }
        if(conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("未选择时间");
            return;
        }
    //存储信息
        console.log(localStorage.message);
        oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        str=JSON.stringify(oldv);//对象---字符串
        localStorage.message=str;

        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

    //    显示信息
        var copy=$(".con").eq(0).clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random()
        }).attr("data-ani","animate-sd").attr("id",obj.id);
        //copy是最新的那一个con
        copy.find(".biaoti").html(obj.title);
        copy.find(".neirong").html(obj.con);
        copy.find(".shijian").html(obj.time);

    })

//    刷新页面的时候将保存的备忘录显示在页面
    var newv=localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<newv.length;i++){
        if(newv[i].title!="" && newv[i].con!="" && newv[i].time!=""){
            //console.log(newv);
            var copy1=$(".con").eq(0).clone().appendTo("body").fadeIn(100).css({
                left:($(window).width()-$(".con").outerWidth())*Math.random(),
                top:($(window).height()-$(".con").outerHeight())*Math.random()
            }).attr("id",newv[i].id);//
            copy1.find(".biaoti").html(newv[i].title);
            copy1.find(".neirong").html(newv[i].con);
            copy1.find(".shijian").html(newv[i].time);
        }
    }

//删除备忘录
//    老师---id:date时间
    $(document).delegate(".del","click",function(){
        var id=$(this).parent().attr("id");
        console.log(id);
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })
//    自己
//    $(".del").click(function(){
//        //$("#body").remove($(this).parent(".con"));
//        $(this).parent(".con").css({display:"none"});
//        //删除localStorage.message即newv里面保存的相对应的数据
//        var currentTitle=$(this).siblings(".biaoti").html();
//        var currentContent=$(this).siblings(".neirong").html();
//        var currentTime=$(this).siblings(".shijian").html();
//        for(var i=0;i<newv.length;i++){
//            if(newv[i].title==currentTitle &&newv[i].con==currentContent &&newv[i].time==currentTime){
//                newv.splice(i,1);
//                var string=JSON.stringify(newv);
//                localStorage.message=string;
//            }
//        }
//    })

//拖拽
    $(document).on("mousedown",function(e){
        e.preventDefault;
        var target= e.target;
        var ox= e.offsetX;//layerX
        var oy= e.offsetY;
        $(document).on("mousemove",function(e){
            var cx= e.clientX;//e.pageX
            var cy= e.clientY;
            var bix=$(window).width()-$(".con").width();
            var biy=$(window).height()-$(".con").height();
            if(cx-ox<0 ||cy-oy<0||cy-oy>biy||cx-ox>bix){
                return;
            }
            $(target).trigger("drag",{ox:ox,oy:oy,cx:cx,cy:cy});
        });
        $(document).on("mouseup",function(e){
            $(document).off("mousemove");
            $(document).off("mouseup");
        });
    });
    var flag=false;
    $(".con").on("drag",function(e,data){
        $(this).css({
            left:data.cx-data.ox,
            top:data.cy-data.oy
        })
    });
    //让新添加的可拖拽----事件委托 委托给.con
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            left:data.cx-data.ox,
            top:data.cy-data.oy
        })
    })
    $(document).delegate(".con","mousedown",function(){
        $(".con").css({
            zIndex:0
        })
        $(this).css({
            zIndex:1
        })
    })





})