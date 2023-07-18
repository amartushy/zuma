
//Global Variables

var usersContainer = document.getElementById('users-container')

function getUsers() {

    while(usersContainer.firstChild) {
        usersContainer.removeChild(usersContainer.firstChild)
    }

    database.collection("users").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {

            var data = doc.data()
            buildUsersBlock(doc.id, data.firstName, data.email, data.photo1)
        })
    })
}


getUsers()



function buildUsersBlock(ID, name, email, profilePhoto) {


    var userBlock = document.createElement('div')
    userBlock.setAttribute('class', 'item-grid-block')
    userBlock.setAttribute('id', ID)
    usersContainer.append(userBlock)

    var nameBlock = document.createElement('div')
	nameBlock.setAttribute('class', 'item-grid-header')
	nameBlock.innerHTML = name
	userBlock.appendChild(nameBlock)

    var emailBlock = document.createElement('div')
	emailBlock.setAttribute('class', 'item-grid-header')
	emailBlock.innerHTML = email
	userBlock.appendChild(emailBlock)

    //Photo Container
    var photoContainer = document.createElement('div')
	photoContainer.setAttribute('class', 'item-grid-photo-container')
	userBlock.appendChild(photoContainer)

    var photoBlock = document.createElement('img')
	photoBlock.setAttribute('class', 'item-grid-photo')
    photoBlock.addEventListener('click', () => {
        loadProfile(ID)
    })
	photoBlock.src = profilePhoto
	photoContainer.appendChild(photoBlock)


    //Actions Container
    var actionsContainer = document.createElement('div')
	actionsContainer.setAttribute('class', 'item-grid-photo-container')
    userBlock.appendChild(actionsContainer)

    var editIcon = document.createElement('div')
	editIcon.setAttribute('class', 'edit-icon')
    editIcon.innerHTML = ""
    actionsContainer.appendChild(editIcon)

    var notifyIcon = document.createElement('div')
	notifyIcon.setAttribute('class', 'notify-icon')
    notifyIcon.innerHTML = ""
    actionsContainer.appendChild(notifyIcon)

    var cancelIcon = document.createElement('div')
	cancelIcon.setAttribute('class', 'cancel-icon')
    cancelIcon.innerHTML = ""
    actionsContainer.appendChild(cancelIcon)

}
