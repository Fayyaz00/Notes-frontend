import './App.css';

const App = (props) => {

  return (
    <div className="App">
      <h1>Catz</h1>
      <Animal animal={"rat"} />
    </div>
  )
}

const Animal = (props) => {
  const { animal } = props

  if (animal === "rat") {
    return (
      <div>
        <h1>I'm a rat</h1>
      </div>
    )
  } else {
    return (
      <div>
        <h1>I'm a {animal}</h1>
      </div>
    )
  }
}

export default App