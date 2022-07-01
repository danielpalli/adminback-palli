export const generarId = () => {
    const randomNum = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return randomNum + fecha;
};