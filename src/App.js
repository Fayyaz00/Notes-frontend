import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client'



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
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const toggleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      console.log(response.data);
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
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
            <Note key={note.id} note={note} toggleImportance={() => { toggleImportance(note.id) }} />
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
  const { note, toggleImportance } = props

  const label = note.important ? "make not important" : "make important"

  // console.log("note", note);

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>

    </li>
  )
}

export default App