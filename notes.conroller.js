const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote (title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added'))
}

async function removeNotes (id) {
  const notes = await getNotes()
  const changedNotesArr = notes.filter(note => Number(note.id) !== id)
  await fs.writeFile(notesPath, JSON.stringify(changedNotesArr))
}

async function getNotes () {
  const notes = await fs.readFile(notesPath, { encoding: 'utf8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes () {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes: ')) 
  notes.forEach(note => {
    console.log(chalk.blue(note.id,':', note.title))
  })
}

module.exports = {
  addNote, printNotes, removeNotes
}