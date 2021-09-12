//Object property shorthand

const name = 'Andrew'
const useAge = 27

const user = {
    name,
    age: useAge,
    location: 'Philadelphia'
}

console.log(user)

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const { label, stock, rating } = product
// console.log(label)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)