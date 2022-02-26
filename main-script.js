const input = document.querySelector('input[data-input]')
const list = document.querySelector('ul[data-list]')
const addBtn = document.querySelector('button[data-add]')
const removeBtn = document.querySelector('button[data-remove]')

// Adding task
let addTask = (e) => {
    input.value = input.value.trim()
    if(input.value.length > 0){
        let task = document.createElement('li')
        let template = 
        `
        <input readonly data-task contenteditable ='false' value="${input.value}"> 
        <span>
            <button data-edit></button><button data-remove></button>
        </span>`

        task.innerHTML = template
        list.prepend(task)
        input.value = ''
        input.focus()
    } else {
        input.style.animation = 'editAnimation .2s 3'
        setTimeout(()=>{input.style.animation = ''}, 1000)
    }
}
addBtn.addEventListener('click', addTask)
input.addEventListener('keyup', (e) => e.key == 'Enter' ? addTask() : '' )

// Event delagation for editing and removing task
list.addEventListener('click', (e) => {

    // to remove task
    if(e.target.matches('button[data-remove]')) e.target.parentElement.parentElement.remove()

    // to edit task
    if(e.target.matches('button[data-edit]')){
        let task = e.target.parentElement.previousElementSibling
        if(task.readOnly){     
            let prevValue = task.value
            task.contentEditable = true
            task.focus()
            task.value = ""
            task.value = prevValue
            task.readOnly = false
            task.style.background = "#fff"
            task.style.color = "#ff7756"
            task.style.animation = "editAnimation .4s"
            setTimeout(()=>{task.style.animation = ""}, 1000)
        } else {
            task.blur()
            task.readOnly = true
            task.contentEditable = false
            task.style.color = "#777"
        }

        task.addEventListener('keyup', (e)=>{
            if(e.key == 'Enter'){
                if(!task.readOnly){
                    task.style.color = "#777"
                    task.style.fontWeight = '400'
                    task.contentEditable = false
                    task.readOnly = 'true'
                    task.blur()
                }
            }
        })
    }
})

list.addEventListener('dblclick', (e)=>{
    let task = e.target
    if(task.matches('input[data-task]')){
        if(task.contentEditable == 'false'){
            task.classList.toggle('completed')
            task.readOnly = 'true'
            task.contentEditable = 'false'
        }
    }
})
