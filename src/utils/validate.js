export const checkPrice = (value) => {
    if (value < 0) {
        return 'Price cannot be negative number';
    }
}