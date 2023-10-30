export let toMoneyString =  (param) => {
    let newStr = "", revNewStr = "";
    let track = 1;
    for (let index = param.length-1; index >= 0; index--) {
        if (track % 4 === 0){
            newStr = newStr + "," + param[index]
        } else{
            newStr = newStr + param[index]
        }
        track++;
    }
    for (let index = newStr.length-1; index >= 0; index--) {
        revNewStr += newStr[index];
    }
    return revNewStr;
}