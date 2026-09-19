import { useState } from 'react'
import './styles/App.css'
import Routing from './Routing.tsx'
import { BrowserRouter} from 'react-router-dom';

export default function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      
      <BrowserRouter>
      <Routing />
      </BrowserRouter>
      
    </div>
  )
}

