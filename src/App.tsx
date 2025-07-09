import { deliveryCheck } from './api/deliveryAPI';
import './App.css'

function App() {

  const rep = deliveryCheck([["A", "B"], ["C", "D"]], ["A", "B", "C", "D"])
  console.log(rep);

  return (
    <>
      bogosbinted
    </>
  )
}

export default App
