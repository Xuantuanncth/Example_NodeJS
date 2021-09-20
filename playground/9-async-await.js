const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ((a < 0) || (b < 0)) {
                return reject("number must be > 0")
            }
            resolve(a + b)
        }, 2000);
    })
}


const doWork = async() => {
    const sum = await add(1, -2)
    const sum1 = await add(sum, -3)
    const sum2 = await add(sum1, 50)

    return sum2
}

// console.log(doWork())
doWork().then((result) => {
    console.log("Result: " + result)
}).catch((e) => {
    console.log("E: " + e)
})