const input = document.querySelector('input[data-input]')
const list = document.querySelector('ul[data-list]')
const addBtn = document.querySelector('button[data-add]')

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
        task.classList.add('animateTask')
        list.prepend(task)
        input.value = ''
        input.focus()
    } else {
        input.style.animation = 'wiggle 150ms 3'
        setTimeout(()=>{input.style.animation = ''}, 500)
    }
}
addBtn.addEventListener('click', addTask)
input.addEventListener('keyup', (e) => e.key == 'Enter' ? addTask() : '' )

// Event delagation for editing and removing task
list.addEventListener('click', (e) => {

    // to remove task
    if(e.target.matches('button[data-remove]')){
        let list = e.target.parentElement.parentElement
        list.classList.add('remove')
        setTimeout(()=>{list.remove()}, 700)
    }

    // to edit task
    if(e.target.matches('button[data-edit]')){
        let task = e.target.parentElement.previousElementSibling
        if(task.classList.contains('completed'))  return
        if(task.readOnly){     
            let previousValue = task.value
            task.contentEditable = true
            task.readOnly = false
            task.focus()
            task.value = ""
            task.value = previousValue      
            task.classList.add('editing')
            task.nextElementSibling.children[0].classList.add('edit')
        } else {
            task.nextElementSibling.children[0].classList.remove('edit')
            task.classList.remove('editing')
            task.blur()
            task.readOnly = true
            task.contentEditable = false
        }

        // task listening to enter key
        task.addEventListener('keyup', (e)=>{
            if(e.key == 'Enter'){
                if(!task.readOnly){
                    task.nextElementSibling.children[0].classList.remove('edit')
                    task.classList.remove('editing')
                    task.readOnly = 'true'
                }
            }
        })
    }
})

// to mark task as complete
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
