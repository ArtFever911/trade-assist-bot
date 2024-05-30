const generateAnnouncementInfo = (announcement) => {
    const { title, startDateTimestamp } = announcement;
    return `Bybit release 
    \n${title} 
    \nRelease date - ${new Date(startDateTimestamp).toLocaleString()}
    \nCurrent DEX price - 
    `
}

module.exports = {
    generateAnnouncementInfo,
}