// @ts-ignore
import { makeServer } from "./mirage/server.js"
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import MatchSetup from './components/MatchSetup.js'
import { Flex, Text, Input } from "theme-ui"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import Scorer from "./components/Scorer.js"

// initialize mirage server
if (process.env.NODE_ENV === "development") {
  makeServer()
}

function App() {
  // const [matchID, setMatchID] = useState<string>();

  // const onMatchIDChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setMatchID(event.target.value)
  // }

  return (
    <>
      <BrowserRouter>
        <Flex sx={{flexDirection: "column"}}>
          <Link to="/setup">Start match</Link>
          <Link to="/scorer">Open scorer</Link>
          {/* <Text>Match ID:</Text>
          <Input value={matchID} onChange={onMatchIDChange}/> */}
        </Flex>
        <Routes>
          <Route path="/setup" element={<MatchSetup />} />
          <Route path="/scorer" element={<Scorer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
