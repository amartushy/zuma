//Global Variables
var matchesContainer = document.getElementById('matches-container')
var todaysDate = document.getElementById('todays-date')
let currentSeconds = Math.floor(Date.now() / 1000);

todaysDate.innerHTML = epochToDateString(currentSeconds)

function getMatches() {

    while(matchesContainer.firstChild) {
        matchesContainer.removeChild(matchesContainer.firstChild)
    }

    database.collection("matches").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {

            var data = doc.data()
            
            console.log(data.isActive)
            if (data.isActive) {
                console.log(doc.id)

                buildMatch(doc.id, data.date, data.members[0], data.members[1])

            }
        })
    })
}

getMatches()


function buildMatch(ID, date, user1ID, user2ID) {

    var userBlock = document.createElement('div')
    userBlock.setAttribute('class', 'item-grid-block')
    userBlock.setAttribute('id', ID)
    matchesContainer.append(userBlock)

    var dateBlock = document.createElement('div')
	dateBlock.setAttribute('class', 'item-grid-header')
	dateBlock.innerHTML = epochToDateString(date)
	userBlock.appendChild(dateBlock)

    //Photo Container
    // var photoContainer = document.createElement('div')
	// photoContainer.setAttribute('class', 'item-grid-photo-container')
	// userBlock.appendChild(photoContainer)

    // var photoBlock = document.createElement('img')
	// photoBlock.setAttribute('class', 'item-grid-photo')

    // database.collection('users').doc(userID).get()
    //     .then(doc => {
    //         if (doc.exists) {
    //             photoBlock.src = doc.data().profilePhoto
    //             photoContainer.appendChild(photoBlock)

    //         } else {
    //             console.log('No such document!');
    //         }
    //     })

    //Name Container
    var nameBlock = document.createElement('div')
	nameBlock.setAttribute('class', 'item-grid-header')
    database.collection('users').doc(user1ID).get()
        .then(doc => {
            if (doc.exists) {
                nameBlock.innerHTML = doc.data().firstName
            } else {
                console.log('No such document!');
                nameBlock.innerHTML = "No Name"

            }
        })
    userBlock.appendChild(nameBlock)

    var nameBlock2 = document.createElement('div')
	nameBlock2.setAttribute('class', 'item-grid-header')
    database.collection('users').doc(user2ID).get()
        .then(doc => {
            if (doc.exists) {
                nameBlock2.innerHTML = doc.data().firstName
            } else {
                console.log('No such document!');
                nameBlock2.innerHTML = "No Name"

            }
        })
    userBlock.appendChild(nameBlock2)



    //Actions Container
    var actionsContainer = document.createElement('div')
	actionsContainer.setAttribute('class', 'item-grid-photo-container')
    userBlock.appendChild(actionsContainer)

    var editIcon = document.createElement('div')
	editIcon.setAttribute('class', 'edit-icon')
    editIcon.addEventListener('click', () => {
        editMatch(ID)
    })
    editIcon.innerHTML = ""
    actionsContainer.appendChild(editIcon)

}


function epochToDateString(epochInSeconds) {
    // Convert the epoch from seconds to milliseconds
    const date = new Date(epochInSeconds * 1000);

    // Get day, month, and year
    const day = date.getDate();
    const year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Return the formatted string
    return `${month} ${day}, ${year}`;
}



//Helper Functions
function editMatch(matchID) {

}
