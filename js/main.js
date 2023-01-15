const navAddBtn = document.querySelector('.nav__menu-buttons-add')
const navDeleteAllBtn = document.querySelector('.nav__menu-buttons-deleteall')
const noteArea = document.querySelector('.note-area')
const popup = document.querySelector('.popup-shadow')
const popupCategoryInput = document.querySelector('#category')
const popupTextInput = document.querySelector('#text')
const popupErrorMsg = document.querySelector('.popup__error')
const popupSaveBtn = document.querySelector('.popup__buttons-save')
const popupCancelBtn = document.querySelector('.popup__buttons-close')
const noteDeleteBtn = document.getElementsByClassName('notecard__icon')
const returnArrow = document.querySelector('.return__arrow')

const textLength = 400

let cardID = 0
let selectedCategory

const showPopup = () => {
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	clearPopup()
}

const checkInputs = () => {
	if (popupTextInput.value !== '' && popupCategoryInput.options[popupCategoryInput.selectedIndex].value !== '0') {
		createNote()
	} else {
		popupErrorMsg.style.visibility = 'visible'
	}
}

const clearPopup = () => {
	popupCategoryInput.selectedIndex = 0
	popupTextInput.value = ''
	popupErrorMsg.style.visibility = 'hidden'
}

const createNote = () => {
	const newNote = document.createElement('div')
	newNote.classList.add('notecard')
	newNote.setAttribute('id', cardID)
	newNote.innerHTML = `
                    <div class="notecard__header">
                        <h3 class="notecard__title">${selectedCategory}</h3>
                        <button class="notecard__icon" onclick="deleteNote(${cardID})">
                            <i class="fas fa-times icon"></i>
                        </button>
                    </div>
                    <div class="notecard__body">
                        ${popupTextInput.value}
                    </div>`
	noteArea.appendChild(newNote)
	checkCategory(newNote)
	cardID++
	closePopup()
}

const selectCategory = () => {
	selectedCategory = popupCategoryInput.options[popupCategoryInput.selectedIndex].text
}

const checkCategory = note => {
	switch (selectedCategory) {
		case 'Work':
			note.style.backgroundColor = '#df2b20'
			break
		case 'School':
			note.style.backgroundColor = '#d8b127'
			break
		case 'Home':
			note.style.backgroundColor = '#6abc43'
			break
		case 'Shop':
			note.style.backgroundColor = '#4e8ab1'
			break
		case 'Other':
			note.style.backgroundColor = '#718e8b'
			break
	}
}

const deleteNote = id => {
	const noteToDelete = document.getElementById(id)
	noteArea.removeChild(noteToDelete)
}

const deleteAllNotes = () => {
	noteArea.textContent = ''
}

const showArrow = () => {
    if(window.scrollY > 100) {
        returnArrow.style.display = 'block'
    } else {
        returnArrow.style.display = 'none'
    }

    returnArrow.classList.toggle('arrow-up-animation')
}

window.addEventListener('scroll', showArrow)
navAddBtn.addEventListener('click', showPopup)
navDeleteAllBtn.addEventListener('click', deleteAllNotes)
popupSaveBtn.addEventListener('click', checkInputs)
popupCancelBtn.addEventListener('click', closePopup)
