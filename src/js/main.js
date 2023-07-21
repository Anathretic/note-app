let BODY
let NAV_ADD_BTN
let NAV_DELETE_ALL_BTN
let NOTE_AREA
let POPUP
let POPUP_CATEGORY_INPUT
let POPUP_TEXT_INPUT
let POPUP_ERROR_MSG
let POPUP_SAVE_BTN
let POPUP_CANCEL_BTN
let NOTE_DELETE_BTN
let RETURN_ARROW
let CARD_ID
let SELECTED_CATEGORY

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	BODY = document.querySelector('body')
	NAV_ADD_BTN = document.querySelector('.nav__button-add')
	NAV_DELETE_ALL_BTN = document.querySelector('.nav__button-deleteall')
	NOTE_AREA = document.querySelector('.note-area')
	POPUP = document.querySelector('.popup-shadow')
	POPUP_CATEGORY_INPUT = document.querySelector('#category')
	POPUP_TEXT_INPUT = document.querySelector('#text')
	POPUP_ERROR_MSG = document.querySelector('.popup__error')
	POPUP_SAVE_BTN = document.querySelector('.popup__button-save')
	POPUP_CANCEL_BTN = document.querySelector('.popup__button-close')
	NOTE_DELETE_BTN = document.getElementsByClassName('notecard__icon')
	RETURN_ARROW = document.querySelector('.return__arrow')
	CARD_ID = Math.random()
	SELECTED_CATEGORY
}

const prepareDOMEvents = () => {
	oldNotes()
	window.addEventListener('scroll', showArrow)
	document.addEventListener('keyup', e => escapeCheck(e))
	NAV_ADD_BTN.addEventListener('click', showPopup)
	NAV_DELETE_ALL_BTN.addEventListener('click', deleteAllNotes)
	POPUP_SAVE_BTN.addEventListener('click', checkInputs)
	POPUP_CANCEL_BTN.addEventListener('click', closePopup)
}

const showPopup = () => {
	POPUP.style.display = 'flex'
	BODY.classList.add('scroll-block')
}

const closePopup = () => {
	POPUP.style.display = 'none'
	clearPopup()
}

const checkInputs = () => {
	if (POPUP_TEXT_INPUT.value !== '' && POPUP_CATEGORY_INPUT.options[POPUP_CATEGORY_INPUT.selectedIndex].value !== '0') {
		createNote()
	} else {
		POPUP_ERROR_MSG.style.visibility = 'visible'
	}
}

const clearPopup = () => {
	POPUP_CATEGORY_INPUT.selectedIndex = 0
	POPUP_TEXT_INPUT.value = ''
	POPUP_ERROR_MSG.style.visibility = 'hidden'
	BODY.classList.remove('scroll-block')
}

const createNote = () => {
	const newNote = document.createElement('li')
	newNote.classList.add('notecard')
	newNote.setAttribute('id', CARD_ID)
	newNote.setAttribute('category', SELECTED_CATEGORY)
	newNote.setAttribute('text', POPUP_TEXT_INPUT.value)
	newNote.innerHTML = `
                    <div class="notecard__header">
                        <h3 class="notecard__title">${SELECTED_CATEGORY}</h3>
                        <button class="notecard__icon" onclick="deleteNote(${CARD_ID})">
                            <i class="fas fa-times icon"></i>
                        </button>
                    </div>
                    <div class="notecard__body">
                        ${POPUP_TEXT_INPUT.value}
                    </div>`
	NOTE_AREA.appendChild(newNote)
	checkCategory(newNote)
	CARD_ID++
	closePopup()

	const localStorageData = {
		id: newNote.getAttribute('id'),
		category: newNote.getAttribute('category'),
		text: newNote.getAttribute('text'),
	}

	localStorage.setItem(`${localStorageData.id}`, JSON.stringify(localStorageData))
}

const oldNotes = () => {
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i)
		let value = JSON.parse(localStorage.getItem(key))

		const oldNote = document.createElement('li')
		oldNote.classList.add('notecard')
		oldNote.setAttribute('id', value.id)
		SELECTED_CATEGORY = value.category
		oldNote.innerHTML = `
						<div class="notecard__header">
							<h3 class="notecard__title">${SELECTED_CATEGORY}</h3>
							<button class="notecard__icon" onclick="deleteNote(${value.id})">
								<i class="fas fa-times icon"></i>
							</button>
						</div>
						<div class="notecard__body">
							${value.text}
						</div>`
		NOTE_AREA.appendChild(oldNote)
		checkCategory(oldNote)
	}
}

const selectCategory = () => {
	SELECTED_CATEGORY = POPUP_CATEGORY_INPUT.options[POPUP_CATEGORY_INPUT.selectedIndex].text
}

const checkCategory = note => {
	switch (SELECTED_CATEGORY) {
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
	localStorage.removeItem(id)
	NOTE_AREA.removeChild(noteToDelete)
}

const deleteAllNotes = () => {
	NOTE_AREA.textContent = ''
	localStorage.clear()
}

const showArrow = () => {
	if (window.scrollY > 100) {
		RETURN_ARROW.classList.add('active-arrow')
	} else {
		RETURN_ARROW.classList.remove('active-arrow')
	}
}

const escapeCheck = e => {
	if (e.key === 'Escape') {
		closePopup()
	}
}

document.addEventListener('DOMContentLoaded', main)
