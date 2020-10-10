var visible = false;
var important = false;
var UI ={}; //INICIALIZADOR OBJETO

var hide="fas fa-eye-slash";
var visi="fas fa-eye";


var taskList = [];

function showDetails(){
    //console.log("btn clicked!!!");
    var vh = "";

    if(!visible){
        vh =  `<i id="eyes" class="${hide}" ></i>`;
        visible=true;
        UI.btnShow.html(vh+" Hide details");
        UI.secForm.removeClass("invisible");

    }
    else{
        vh =  `<i id="eyes" class="${visi}" ></i>`;
        visible=false;
        UI.btnShow.html(vh+" Show details");
        UI.secForm.addClass("invisible");

    }

}

function toogleImportant(){
    if(!important){
        UI.btnImportant.removeClass("far").addClass("fas active");
        //UI.btnImportant.removeClass("btn-light");
        //UI.btnImportant.addClass("btn-danger");       
        important=true;
    }else{
        UI.btnImportant.removeClass("fas active").addClass("far");
        //UI.btnImportant.removeClass("btn-danger");
        //UI.btnImportant.addClass("btn-light").addClass("active");
        important=false;
    }

}

function clearInputs(){
        $(".control").val("");
}

function SaveTask(){
    var Title = UI.txtTitle.val();
    var Date = UI.txtDate.val();
    var Description = UI.txtDescription.val();
    var Alert = UI.txtAlert.val();
    var Location = UI.txtLocation.val();  

    var task = new Task(Title,important, Date, Description, Alert, Location);

    taskList.push(task);

   

    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'POST',
        data:  JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            displayTask(response);
            //console.log("Pass:",response);
            UI.boxAlert.removeClass("hide");
            setTimeout(function(){
                UI.boxAlert.addClass("hide");
            },3000);
        },
        error: function(details){
            console.log("error:", details);
        }

    });

    clearInputs();

    testGet();

}

function testGet(){
    $.ajax({
       

        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'GET',
        success: function(response){
            console.log("Pass:",response);

            var text = ""; 
            response.forEach((dato) =>{
                /*text+=`<div class="container containerData"> 
                Id:${dato.id} | Title:${dato.title} | Description:${dato.description}
                | Important:${dato.important}  | User:${dato.user} 
                </div>`;*/
                var important="";
                if(dato.important){
                    important=`<i class="fas fa-star active"></i>`;
                }else{
                    important=`<i class="far fa-star"></i>`;
                }
                
                var dueDate = new Date(dato.dueDate);

                text+=`<div id="List-${dato.id}" class="container containerData"> 
                <div>
                    <i class="far fa-circle check"></i>
                </div>
                <div>
                    <h4>${dato.title} </h4>
                    <label class="task-title">${dato.description}</label>
                </div>
                <div>   
                    <label class="task-title">${dueDate.toLocaleDateString() } </label>
                    <label class="task-title">${dato.location}</label>
                </div>
                <div>
                    ${important}
                </div>
                </div>`;

            });

            document.getElementById("listData").innerHTML=text;


        },
        error: function(details){
            console.log("error:", details);
        }

    });
}


function test(a){

    a={}
    console.log("Modifica", a);
}

//function ClearForm()

function loadTasks(){
// creat an GET ajax req, console log the response
// url: 'http://fsdi.azurewebsites.net/api/tasks'

$.ajax({
  url: 'http://fsdi.azurewebsites.net/api/tasks', 
   Type: 'GET',
   seccess: list => {
      // console.log(res);

       let myTasks = list.filter(task => task.user === 'Roberto'); 
          // return task.user === 'Roberto';
             //  return true;
           // });
          /* else {
               return false;
           }
           });*/
          // console.log(myTasks);

          for (let  i=0; i< myTasks.lenght; i++){
              myTasks[i].dueDate = Date(myTasks[i].dueDate);
              myTasks[i].createdOn = Date(myTasks[i].createdOn);
              displayTask(mytasks[i]);
          }
   },
   error: function(details){
       console.log('Error',details);
   }
});

}


function displayTask(task){
    var syntax =
    `<div class='task'> 
    <i class="far fa-circle check"></i>
     

    <label class='task-title'>${task.title}</label>
    <label class='task-desc'>${task.description}</label>
    
    
    <label class='task-tittle'>${task.dueDate.toLocaleDateString()+''+ task.dueDate.toLocaleTimeString()}</label>
    
    </div>`;

   
    $("#pendingTasks").append(syntax);
}


function init(){
    var Title = "this is a main page!!";
    //console.log(Title);
    
loadTasks();
    
    UI = {
        btnShow: $("#btnShow"),
        btnImportant: $("#btnImportant"),
        secForm: $("#section-Form"),
        btnSave: $("#btnSave"),
        txtTitle: $("#txtTitle"),
        btnImportant: $("#btnImportant"),
        txtDate: $("#txtDate"),
        txtDescription: $("#txtDescription"),
        txtAlert: $("#txtAlert"),
        txtLocation: $("#txtLocation"),
        boxAlert: $("#alert")

    }

    
    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toogleImportant);

    UI.btnSave.click(SaveTask);
    
    testGet();

      
}


window.onload = init;

