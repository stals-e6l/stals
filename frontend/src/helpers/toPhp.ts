// This function converts a number to currency format 
// e.g. 1000 to 1,000

const toPhp = (val: number) => {
    return new Intl.NumberFormat().format(val)
}

export default toPhp