const PrintTime = (props) =>{
  const datenow = new Date()
  return(
    <div>
      <strong>{datenow.toString()}</strong>
       {props.end}
      <br/>
    </div>
  )
}

const App = () => {
  console.log("hold up")


  return (
    
    <div>
      <p>Hello worlsssd</p>
      <i>yo wassup </i>
      <PrintTime end="one"/>
      <PrintTime end="two"/>
    </div>
  )
}

export default App