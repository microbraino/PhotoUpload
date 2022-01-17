export const dateFormatted = ()=>{
    const date = new Date;
    const formatted = date.getDate() + 
    "." +(date.getMonth()+1)+
    "."+date.getFullYear()+
    "_"+
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds();
    return formatted;
}