
export const getRamdomBackgroundColor = () => {
    const colors = ['blue', 'violet', 'green', 'red'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return {backgroundColor:colors[randomIndex]};
}