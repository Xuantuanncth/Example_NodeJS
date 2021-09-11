const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require("./Note");
const { describe } = require('yargs');
var argv = require('yargs/yargs')(process.argv.slice(2))
    .command('add', 'Add a new note')
    .argv;
console.log(argv._)
if (argv._ === 'add') {
    console.log("Argv command is add")
}
notes.addNote(argv.title, argv.body)
    // yargs.command({
    //     command: 'add',
    //     describe: 'Add a new note',
    //     builder: {
    //         title: {
    //             describe: 'Note title'
    //                 // demandOption: true,
    //                 // type: 'string'
    //         },
    //         body: {
    //             describe: 'Note body'
    //                 // demandOption: true,
    //                 // type: 'string'
    //         }
    //     },
    //     handler: function(argv) {
    //         console.log('(TDX1) => Title: ' + argv.title)
    //         console.log('(TDX2) => Body: ' + argv.body)
    //         notes.addNote(argv.title, argv.body)
    //     }
    // })