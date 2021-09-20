require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('61433e66b1065b1431adb5ef', { age: 20 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('61449a2fe3e891abe1c9fb32', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})