import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"

function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100 text-light' style={{ fontFamily: "cursive" }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
