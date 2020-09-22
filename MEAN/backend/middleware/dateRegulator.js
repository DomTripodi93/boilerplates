module.exports = date => {
    const timeZoneOffset = (new Date).getTimezoneOffset() * 60000;
    return new Date((new Date(date) - timeZoneOffset));
}