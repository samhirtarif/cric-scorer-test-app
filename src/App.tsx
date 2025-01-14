// @ts-ignore
import { makeServer } from "./mirage/server.js"
import { BrowserRouter, Route, Routes } from 'react-router'
import MatchSetup from './components/MatchSetup.js'

// initialize mirage server
if (process.env.NODE_ENV === "development") {
  makeServer()
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/setup" element={<MatchSetup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
