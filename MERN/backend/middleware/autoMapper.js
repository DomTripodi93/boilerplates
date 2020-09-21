module.exports = (fullObj, partialObj) => {
    let objForReturn = {};
    Object.keys(fullObj.toJSON()).forEach(key => {
        if (partialObj[key]){
            objForReturn[key] = partialObj[key];
        } else {
            objForReturn[key] = fullObj[key];
        }
    })
    return objForReturn;
}