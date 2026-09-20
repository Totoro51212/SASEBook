import './styles/App.css'
import Routing from './Routing.tsx'
import { BrowserRouter} from 'react-router-dom';


export default function App() {

  return (
    <div>
      
      <BrowserRouter>
      <Routing />
      </BrowserRouter>
      
    </div>
  )
}

