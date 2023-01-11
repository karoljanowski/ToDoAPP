let tasks = []
const ulEl = document.getElementById('tasks')
const liEl = document.getElementsByClassName('li-el')
const button = document.getElementById('button-el')
const inputEl = document.getElementById('input-el')
const taskLocalStorage = JSON.parse(localStorage.getItem("tasks"))

if (taskLocalStorage) {
    tasks = taskLocalStorage
    appearTasks(tasks)
}

function appearTasks(taskArray) {
    ulEl.innerHTML = ""
    for (let i = 0; i < taskArray.length; i++) {
        ulEl.innerHTML += `<li class='li-el'><span class='left-span'></span><span class='mid-span'>${taskArray[i].text}</span><span class='right-span'>❌</span></li>`
        if (tasks[i].done) {
            let spanDone = document.getElementsByClassName('left-span')
            document.getElementsByClassName('mid-span')[i].style.textDecoration = 'line-through'
            spanDone[i].style.background = '#3B3B71'
        }
    }
    deleteElement()
    doneTask()
}

function addTask() {
    tasks.push({
        text: inputEl.value,
        done: false
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
    appearTasks(tasks)
    inputEl.value = ""
}


function deleteElement() {
    let spanClose = document.getElementsByClassName('right-span')
    for (let i in spanClose) {
        spanClose[i].onclick = function () {
            tasks.splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            appearTasks(tasks)
        }
    }
}
button.addEventListener('click', function () {
    addTask()
})
inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask()
    }
});

function doneTask() {
    let spanDone = document.getElementsByClassName('left-span')
    for (let i in spanDone) {
        spanDone[i].onclick = function () {

            if (tasks[i].done == false) {
                tasks[i].done = true
                localStorage.setItem("tasks", JSON.stringify(tasks))
            } else {
                tasks[i].done = false
                localStorage.setItem("tasks", JSON.stringify(tasks))
            }
            appearTasks(tasks)
        }
    }
}