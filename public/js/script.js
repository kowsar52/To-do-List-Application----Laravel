$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //get all data
    function getData(status=3){
       
        $.ajax({
                url: "{{ route('todo.getData') }}",
                type: "POST",
                dataType: 'json',
                data:{status:status},
                success: function (data) {
                    if(data.length != 0 ){
                        $('.to-do-list').css('display','block');
                        $('.to-do-footer').css('display','block');
                    }
                    var i;
                   var listArray = [];
                    for (i = 0; i < data.length; i++) {
                        if(data[i].status == 2){ //
                            var list = '<li><input type="checkbox" class="checkTodo" data-id="'+data[i].id+'" checked/><label for="checkbox" style="text-decoration: line-through;" class="editTodo" data-id="'+data[i].id+'">'+data[i].title+'</label ><button style="float:right;border:none;display:none" class="deleteBtn" data-id="'+data[i].id+'"><i class="fa fa-times"></i></button></li>';
                        } else{
                             var list = '<li><input type="checkbox" class="checkTodo" data-id="'+data[i].id+'"/><label for="checkbox" class="editTodo" data-id="'+data[i].id+'">'+data[i].title+'</label ><button style="float: right;border:none;display:none" class="deleteBtn" data-id="'+data[i].id+'"><i class="fa fa-times"></i></button></li>';
                        }
                       
                        listArray.push(list);
                    }
                    $('.to-do-list').html(listArray);
                    $('#totalData').html(data.length+' Item Left');
                
                }
            });
    }
    
  
    $('#to-do-input').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
           var inputData= $(this).val(); 
           $(this).val(''); //for clear input field

           $.ajax({
                data: {title:inputData},
                url: "{{ route('todo.store') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    getData(); //call function
                
                }
            });

        }
        //Stop the event from propogation to other handlers
        event.stopPropagation();
    });

    // completed todo 
    $(".to-do-list").on('change','.checkTodo', function(){
        var id=$(this).data('id');
        if( $(this).is(':checked') ){
            var status= 2;
        }else{
            var status= 1;
        }
        $.ajax({
                data: {status:status,id:id},
                url: "{{ route('todo.update') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    getData(); //call function
                
                }
            });
        });
        //delete todo 
    $(".to-do-list").on('click','.deleteBtn', function(){
        var id=$(this).data('id');
        var status = 3;

        $.ajax({
                data: {status:status,id:id},
                url: "{{ route('todo.update') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    getData(); //call function
                
                }
            });
        });
    //edit todo 
    $(".to-do-list").on('click','.editTodo', function(){
        var id= $(this).data('id');
        var title = $(this).html();
        $(this).replaceWith('<input style=" width: 87%;" class="editInput" data-id="'+id+'" type="text" value="'+title+'"/>');
        //save edited data
        $(document).mouseup(function (e) { 
        if ($(e.target).closest(".editTodo").length === 0) { 
            if ($(e.target).closest(".editInput").length === 0) { 
            
            var id= $('.editInput').data('id');
            var title = $('.editInput').val();
            $.ajax({
                    data: {title:title,id:id},
                    url: "{{ route('todo.edit') }}",
                    type: "POST",
                    dataType: 'json',
                    success: function (data) {
                        getData(); //call function
                    
                    }
                    });
                }
            }
        });

    });
    


    getData(); //call function
 
    //tab data
    $('#ALL').on('click',function(){
        var status=3;
         $('#ACTIVE').removeClass('active');
        $('#COMPLETE').removeClass('active');
        $(this).addClass('active');
        getData(status); //call function

    });
    $('#ACTIVE').on('click',function(){
        var status=1;
         $('#ALL').removeClass('active');
        $('#COMPLETE').removeClass('active');
        $(this).addClass('active');
        getData(status); //call function

    });
    $('#COMPLETE').on('click',function(){
        var status=2;
         $('#ALL').removeClass('active');
        $('#ACTIVE').removeClass('active');
        $(this).addClass('active');
        getData(status); //call function

    });
    $('#CLEAR_COMPLETE').on('click',function(){
        
        $.ajax({
                data: {status:3},
                url: "{{ route('todo.clear') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    var status = $('.active').data('status');
                    console.log(status);
                    getData(status); //call function
                
                }
            });

    });

    $('.to-do-list').on('mouseover','li',function(){
        $(".deleteBtn").css('display','none');
        $(this).find(".deleteBtn").css('display','block');
    });
    $('.to-do-list').on('mouseout','li',function(){
        $(".deleteBtn").css('display','none');
    });

    

});