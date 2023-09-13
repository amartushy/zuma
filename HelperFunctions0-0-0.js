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
