//Global Variables
var reportsContainer = document.getElementById('reports-container')


function getReports() {

    while(reportsContainer.firstChild) {
        reportsContainer.removeChild(reportsContainer.firstChild)
    }

    database.collection("reportedUsers").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {

            var data = doc.data()
            
            buildReportsBlock(doc.id, data.dateReported, data.reportedUserID, data.reportType)

        })
    })
}

getReports()


function buildReportsBlock(ID, date, userID, reportType) {

    var userBlock = document.createElement('div')
    userBlock.setAttribute('class', 'item-grid-block')
    userBlock.setAttribute('id', ID)
    reportsContainer.append(userBlock)

    var dateBlock = document.createElement('div')
	dateBlock.setAttribute('class', 'item-grid-header')
	dateBlock.innerHTML = epochToDate(date)
	userBlock.appendChild(dateBlock)


    var timeBlock = document.createElement('div')
	timeBlock.setAttribute('class', 'item-grid-header')
	timeBlock.innerHTML = epochToTimeString(date)
	userBlock.appendChild(timeBlock)
    
    //Report Container
    var reportBlock = document.createElement('div')
    reportBlock.setAttribute('class', 'item-grid-header')
    reportBlock.innerHTML = reportType
    userBlock.appendChild(reportBlock)

    //Name Container
    var nameBlock = document.createElement('div')
	nameBlock.setAttribute('class', 'item-grid-header')
    database.collection('users').doc(userID).get()
        .then(doc => {
            if (doc.exists) {
                nameBlock.innerHTML = doc.data().firstName
            } else {
                console.log('No such document!');
                nameBlock.innerHTML = "No Name"

            }
        })
    userBlock.appendChild(nameBlock)

}






//Helper Functions

function fetchProfilePhoto(userId) {
    return database.collection('users').doc(userId).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data().profilePhoto;
            } else {
                console.log('No such document!');
                return null;
            }
        })
        .catch(error => {
            console.error('Error getting document:', error);
            return null;
        });
}

function epochToTimeString(epoch) {
    let date = new Date(epoch * 1000); // Convert to milliseconds
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Convert to 12 hour format
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Ensure always 2 digits for minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes}${ampm}`;
  }
