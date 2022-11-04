var isImportant = false;
var isAsideHide = false;

function toggleImportant(){
    let icon = $(".iImportant");
    if(isImportant){
        icon.removeClass("fas").addClass("far");
        isImportant = false;
    }
    else{
        icon.removeClass("far").addClass("fas");
        isImportant = true;

    }
    

}

function showTaskInfo(){
    let aisde = $("aside")
    if(isAsideHide){
        aisde.hide()
        isAsideHide = false;
    }
    else{
        aisde.show();
        isAsideHide = true;
    }

}
function clear(){
    $(".form input,textarea").val("");
    isImportant=true
    toggleImportant()

}



function saveTask(){
    let title = $("#txtTitle").val();
    let desc = $("#txtDescription").val();
    let priority = $("#selPriority").val();
    let dueDate = $("#selDueDate").val();
    let contact = $("#txtContact").val();
    let participants = $("#txtParticipants").val();
    let color = ("#selColor").val("#000000"); 



    let task = new Task(isImportant, title, desc, priority, dueDate, contact, participants, color);

    console.log(task);
    console.log(JSON.stringify(task));

    //save the task on the server
    //CREATE A POST REQUEST TO: http://fsdiapi.azurewebsites.net/api/tasks/
        $.ajax({
            type: "POST",
            url: "http://fsdiapi.azurewebsites.net/api/tasks/",
            data: task,
            contentType: "application/json",
            success: function(res){
                console.log(res);
            },
            error: function(error) {
                console.log(error);
            }
        });
}
        
function displayTask(task){
    let syntax =`<div class="task" style="border:2px solid${task.color}">
        <div class="task-title">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <div class="task-middle">
            <label><i class="fas fa-map-marker-alt"></i> ${task.location}</label>
            <label><i class="far fa-clock"></i> ${task.due}</label>
        </div>
     </div>`;

    $(".task-container").append(syntax)
}

function deleteTasks(){
    $.ajax({
        type: "DELETE",
        url:"https://fsdiapi.azurewebsites.net/api/tasks/clear/Frank",

        success: function(){
            $(".task-container").html("");
        }

    })
}




function testGet(){

        $.ajax({
                type: "GET",
                url: "http://fsdiapi.azurewebsites.net/",
                success: function(){
                    console.log(response);
                },
                error: function(error){
                    console.log(error);
                }
        });
    

}

function fetchTasks(){
    //load the tasks from the server and display
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azyrewebsites.net/api/taks",
        success: function(res){
            let list = JSON.parse(res);
            //travel the list with for loop
            for(let i=0; i< list.length; i++);{
                let task = list[i];
                if(task.developer === "Frank"){
                    display(task);
                }
                
            }
                
        },
        error: function(details){
            console.log(details);

        }
    });
}





function init(){
    console.log('Task manager');
    // Load data
    fetchTasks();

    // hook events
    $('#btnSave').click(saveTask)
    $('#iImportant').click(toggleImportant);
    $('#btnHideForm').click(toggleForm);
}

window.onload = init;
























            <div class="my-control">
                <label>Due Date</label>
            </div>












































