setTimeout(() => {
    console.log('Two second to are up')
}, 2000)

const names = ['Andrew', 'Jen', 'Jess']

const shortNames = names.filter((name) => {
    return name.length <= 4
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data)
    }, 2000)
}

geocode('philadelphia', (data) => {
    console.log(data)
})