const fs = require('fs');
const chalk = require('chalk');
const { timeLog } = require("console");

const getNote = function() {
    return "Your note ..."
}


const addNote = (title, body) => {
    const notes = loadNotes()
        //console.log("loadNotes => ", notes)

    const duplicateNode = notes.find((note) => note.title === title)
    console.log("duplicate: ", duplicateNode)
    if (!duplicateNode) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse("Node be added"))
        saveNote(notes)
    } else {
        console.log(chalk.red.inverse("Note title taken"))
    }
}

const saveNote = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}

module.exports = {
    getNotes: getNote,
    addNote: addNote
}