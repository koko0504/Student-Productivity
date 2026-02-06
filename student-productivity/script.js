// const addBtn=document.getElementById("addtask");
// const taskInput=document.getElementById("task");
// const taskList=document.getElementById("tasks");
// const allBtn=document.getElementById("all");
// const completeBtn=document.getElementById("completed");
// const pendingBtn=document.getElementById("pending");
// addBtn.addEventListener("click",()=>{
//     if(taskInput.value==="")return;
//     // const li=document.createElement("li");
//     // li.innerHTML=`
//     //   <span>${taskInput.value}</span>
//     //   <button class="completed-btn">✔️<button>
//     //   <button class="delete-btn">❌</button>`;
//     // taskList.appendChild(li);
//     // const deleteBtn=li.querySelector(".delete-btn");
//     // deleteBtn.addEventListener("click",()=>{
//     //     li.remove();
//     //     savetask();
//     // });
//     // const completeBtn=li.querySelector(".completed-btn");
//     // completeBtn.addEventListener("click",()=>{
//     //     li.classList.toggle("done");
//     //     savetask();
//     // });
//     createTaskElement(taskInput.value);
//     taskInput.value="";
//     savetask();

// });
// function createTaskElement(text,isDone=false){
//     const li=document.createElement("li");
//     if(isDone){
//         li.classList.add("done");
//     }
//     li.innerHTML=`
//       <span>${text}</span>
//       <button class="completed-btn">✔️</button>
//       <button class="delete-btn">❌</button>
//       <button class="edit-btn">✏</button>`;
//     const deleteBtn=li.querySelector(".delete-btn");
//     deleteBtn.addEventListener("click",()=>{
//         li.remove();
//         savetask();
//     });
//     const completeBtn=li.querySelector(".completed-btn");
//     completeBtn.addEventListener("click",()=>{
//         li.classList.toggle("done");
//         savetask();
//     });
//     const editBtn=li.querySelector(".edit-btn");
//     editBtn.addEventListener("click",()=>{
//         const span=li.querySelector("span");
//         const newText=prompt("Edit your task here",span.textContent);
//         if(newText !==null && newText.trim()!==""){
//             span.textContent=newText;
//             savetask();
//         }
//     });
//     taskList.appendChild(li);
// }
// function savetask(){
//         const tasks=[];
//         document.querySelectorAll("li").forEach((li)=>{
//             tasks.push({
//                 text:li.querySelector("span").textContent,
//                 done:li.classList.contains("done"),
//             });
//         });
//         localStorage.setItem("tasks",JSON.stringify(tasks));
//     }
// document.addEventListener("DOMContentLoaded",loadTask);
// function loadTask(){
//     const savedTasks=JSON.parse(localStorage.getItem("tasks")) || [];
//     savedTasks.forEach((task)=>{
//         createTaskElement(task.text,task.done);
//     });
// }
// allBtn.addEventListener("click",()=>filtertype("all"));
// completeBtn.addEventListener("click",()=>filtertype("completed"))
// pendingBtn.addEventListener("click",()=>filtertype("pending"))

// function filtertype(type){
//     const tasks=taskList.querySelectorAll("li");
//     tasks.forEach(task=>{
//         switch(type){
//             case "all":
//                 task.style.display="flex";
//                 break;
//             case "complete":
//                 if(li.classList.contain("done")){
//                    task.style.display="flex";
//                 }else{
//                     task.style.display="none";
//                 }
//                 break;
//             case "pending":
//                 if(!li.classList.contain("done")){
//                    task.style.display="flex";
//                 }else{
//                     task.style.display="none";
//                 }
//                 break;
//         }
//     });
// }      
/* Base Styles */
const addTaskBtn = document.getElementById("addtask");
const taskInput = document.getElementById("task");
const taskList = document.getElementById("tasks");
const allBtn = document.getElementById("all");
const completeBtn = document.getElementById("completed");
const pendingBtn = document.getElementById("pending");

// Create Task with modern icons
function createTaskElement(text, isDone = false) {
    const li = document.createElement("li");
    li.className = `list-group-item shadow-sm ${isDone ? 'done' : ''}`;
    
    li.innerHTML = `
        <div class="d-flex align-items-center flex-grow-1">
            <i class="bi ${isDone ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'} me-3 status-icon fs-5" style="cursor:pointer;"></i>
            <span class="fw-semibold">${text}</span>
        </div>
        <div class="btn-group">
            <button class="btn btn-link text-primary edit-btn p-1 me-2"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-link text-danger delete-btn p-1"><i class="bi bi-trash3"></i></button>
        </div>
    `;

    // Complete Action (Clicking Icon)
    const icon = li.querySelector(".status-icon");
    icon.addEventListener("click", () => {
        li.classList.toggle("done");
        icon.classList.toggle("bi-check-circle-fill");
        icon.classList.toggle("bi-circle");
        icon.classList.toggle("text-success");
        icon.classList.toggle("text-muted");
        savetask();
    });

    // Delete Action
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        setTimeout(() => {
            li.remove();
            savetask();
        }, 300);
    });

    // Edit Action
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const span = li.querySelector("span");
        const newText = prompt("Update your goal:", span.textContent);
        if (newText && newText.trim() !== "") {
            span.textContent = newText;
            savetask();
        }
    });

    taskList.appendChild(li);
}

// Add New Task
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
    createTaskElement(taskInput.value);
    taskInput.value = "";
    savetask();
});

// Save to LocalStorage
function savetask() {
    const tasks = [];
    document.querySelectorAll("#tasks li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from LocalStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.done));
});

// Filtering Logic
function filterType(type, activeBtn) {
    // UI Update for buttons
    [allBtn, completeBtn, pendingBtn].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');

    const tasks = document.querySelectorAll("#tasks li");
    tasks.forEach(task => {
        const isDone = task.classList.contains("done");
        if (type === "all") task.style.display = "flex";
        else if (type === "completed") task.style.display = isDone ? "flex" : "none";
        else if (type === "pending") task.style.display = !isDone ? "flex" : "none";
    });
}

allBtn.addEventListener("click", () => filterType("all", allBtn));
completeBtn.addEventListener("click", () => filterType("completed", completeBtn));
pendingBtn.addEventListener("click", () => filterType("pending", pendingBtn));