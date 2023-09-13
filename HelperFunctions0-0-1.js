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
