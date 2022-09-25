const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "INR",
    style: "currency",
})
export default (number: number) => CURRENCY_FORMATTER.format(number)
