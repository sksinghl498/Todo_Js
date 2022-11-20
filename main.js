let form = document.getElementById("form");
let textInput= document.getElementById("textInput");
let dateInput= document.getElementById("dateInput");
let textArea= document.getElementById("textArea");
let msg= document.getElementById("msg");
let tasks= document.getElementById("tasks");
let add= document.getElementById("add");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
})

let formValidation =()=>{
    if(textInput.value===""){
        console.log("failure")
        msg.innerHTML="Text cannot be blank";
    }else{
        console.log("success");
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss","");
        })();
    }
}

let data= [];

let acceptData= ()=>{
    data.push({
    text :textInput.value,
    date: dateInput.value,
    Description: textArea.value,
    })
    
    localStorage.setItem("data",JSON.stringify(data));
    createTasks();
    resetForm();
}

let createTasks= ()=>{
    tasks.innerHTML+= "";
    data.map((x,y)=>{
        return ( tasks.innerHTML+= 
            ` <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.Description}</p>
       
            <span class="options">
                <svg data-bs-toggle="modal" data-bs-target="#form"
                onClick="editTask()" 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                  <svg onClick="deleteTask()" 
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
            </span>
        </div>
            `
        )
    })
    
}

let resetForm= ()=>{
    textInput.value="";
    dateInput.value="";
    textArea.value="";
}

let deleteTask= (e)=>{
    e.parentElement.parentElement.remove();
}


let editTask= (e)=>{
    let selectedTask= e.parentElement.parentElement;

    textInput.value= selectedTask.children[0].innerHTML;
    dateInput.value= selectedTask.children[1].innerHTML;
    textArea.value= selectedTask.children[2].innerHTML;
    e.parentElement.parentElement.remove();
}

(()=>{
    data= JSON.parse(localStorage.getItem("data"));
    createTasks();
})();