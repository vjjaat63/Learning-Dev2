let p1 = performance.now()
const button = document.getElementById("addTask")
const pendinglist = document.getElementById("todolist")
const donelist = document.getElementById('donelist')
const inputTask = document.getElementById('task')
const remove = document.getElementById('cleardone')
const removep = document.getElementById('clearpending')


button.addEventListener('click',()=>{
    let task  = inputTask.value.trim()
    if(task === "")
        return
    
    let listItem = document.createElement('li')
    listItem.innerText = task
    pendinglist.insertAdjacentElement('beforeend',listItem)
    
})

pendinglist.addEventListener('click', function(event) {
    let taskdone
    
    if (event.target && event.target.parentElement === pendinglist){
        taskdone = event.target.innerText
        event.target.remove();
    }
    
    let item = document.createElement('li')
    item.innerText = taskdone
    donelist.insertAdjacentElement('beforeend',item)
    
});

remove.addEventListener('click',()=>{
    let list = document.querySelectorAll('#donelist li')
    let userResponse = confirm("Are you sure you want to clear the 'Tasks Done' list")
    if(userResponse){
        for(let li of list)
            li.remove()
    }    
})

inputTask.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        button.click()
    }
})

removep.addEventListener('click',()=>{
    let list = document.querySelectorAll("#todolist li")
    let userResponse = confirm("Are you sure you want to clear the 'Tasks Pending' list")
    if(userResponse){
        for(let li of list)
            li.remove()
    }   
})
let p2 = performance.now()
console.log(p2-p1)