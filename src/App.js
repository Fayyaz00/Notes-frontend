import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import noteService from './services/notes'


const App = (props) => {

  // const { notes } = props

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("catz")
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .updateImportance(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = (id) => {
    console.log("need to delete Note");

    const changedNotes = notes.filter(note => note.id !== id)

    setNotes(changedNotes)

    noteService
      .deleteNote(id)
      .then((returnedNotes) => {
        // setNotes(returnedNotes)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          note =>
            <Note key={note.id} note={note} toggleImportance={() => { toggleImportance(note.id) }} deleteNote={() => { deleteNote(note.id) }} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

    </div>
  )
}

const Note = (props) => {
  const { note, toggleImportance, deleteNote } = props

  const label = note.important ? "make not important" : "make important"

  // console.log("note", note);

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>Delete</button>

    </li>
  )
}

export default App