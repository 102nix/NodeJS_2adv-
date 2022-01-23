document.addEventListener('click', event => {
  const id = event.target.dataset.id
  if (event.target.dataset.type === 'remove') {
  remove(id).then(() => {
  event.target.closest('li').remove()
  })
  } else if (event.target.dataset.type === 'edit') {
  const title = event.target.dataset.title
  const result = prompt(title, title)
  const currentLi = event.target.closest('li')
  const delBtn = event.target.previousElementSibling
  const editBtn = event.target
  edit(id, result).then(() => {
  event.target.closest('li').innerHTML = ''
  currentLi.innerText = result ? result : title
  editBtn.dataset.title = result ? result : title
  currentLi.appendChild(delBtn)
  currentLi.appendChild(editBtn)
  })
  } else if (event.target.dataset.type === 'update') {
    console.log(event.target.closest('button'))
    toUpdate(event, event.target.closest('button'), id)
  } 
  })

  function toUpdate(event, btnUpdate, id) {
    const currentLi = event.target.closest('li')
    const spanText = event.target.previousElementSibling.innerText
    const delBtn = event.target.nextElementSibling
    const saveBtn = document.createElement('button')
    saveBtn.dataset.type = 'save'
    saveBtn.dataset.id = id
    saveBtn.classList.add('btn', 'btn-success')
    saveBtn.innerText = 'Сохранить'
    saveBtn.addEventListener('click', (e) => toSaveUpdate (e.target.previousElementSibling.value, currentLi, btnUpdate, delBtn, e.target.dataset.id))
    const cancelBtn = document.createElement('button')
    cancelBtn.dataset.type = 'cancel'
    cancelBtn.classList.add('btn', 'btn-primary')
    cancelBtn.innerText = 'Отмена'
    cancelBtn.addEventListener('click', () => toCancelUpdate (currentLi, spanText, delBtn))
    event.target.closest('li').innerHTML = `<input value="${event.target.previousElementSibling.innerText}" />`
    currentLi.appendChild(saveBtn)
    currentLi.appendChild(cancelBtn)
  }

  function toCancelUpdate (li, spanText, delBtn) {
    li.innerHTML = `<span>${spanText}</span>`
    const btnUpdate = document.createElement('button')
    btnUpdate.dataset.type = 'update'
    btnUpdate.innerText = 'Обновить'
    btnUpdate.classList.add('btn', 'btn-primary')
    li.appendChild(btnUpdate)
    li.appendChild(delBtn)
  }

  function toSaveUpdate (value, li, btnUpdate, delBtn, id) {
    li.innerHTML = ''
    edit(id, value).then(() => {
      li.innerHTML = `<span>${value}</span>`
      li.appendChild(btnUpdate)
      li.appendChild(delBtn)
    })
  }
  
  async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
  }
  
  async function edit(id, result) {
    const params = {
      param: result
    }
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify( params ) 
    }
    await fetch(`/${id}`, options)
  }
  