import { useEffect } from 'react';
import './App.css';

const App = (props) => {

  const { notes } = props

  return (
    <div className="App">
      <h1>Catz</h1>
      <Animal animal={"cat"} />

      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>

    </div>
  )
}

const Note = (props) => {
  const { note } = props

  console.log("note", note);

  return (
    <li>{note.content}</li>
  )
}

const Animal = (props) => {
  const { animal } = props

  useEffect(() => {
    console.log(props);
  }, [props])


  return (
    <div>
      <h1>I'm a {animal}</h1>
    </div>
  )
}

export default App