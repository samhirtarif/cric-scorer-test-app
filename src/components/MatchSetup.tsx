import { useAddMatchMutation, useGetTeamsQuery } from '../features/api/apiSlice'
import { Button, Flex, Text } from 'theme-ui'
import { Team } from '../types/team'
import { useState } from 'react'


const TextStyle = {
  fontSize: 16, mt: "10px", display: "block"
}

const MatchSetup = () => {
  const { data, isError, isLoading } = useGetTeamsQuery("")
  const [selectedTeam1, setSelectedTeam1] = useState<string>();
  const [selectedTeam2, setSelectedTeam2] = useState<string>();
  const [tossSelection, setTossSelection] = useState<string>();
  const [tossResult, setTossResult] = useState<string>();
  const [tossWonBy, setTossWonBy] = useState<string>();
  const [tossDecision, setTossDecision] = useState<string>();

  if (isLoading) return <span>Loading</span>
  if (isError) return <span>Sorry, an error occurred</span>

  const [
    addMatch
  ] = useAddMatchMutation()


  const onTeam1Click = (id: string) => setSelectedTeam1(id);
  const onTeam2Click = (id: string) => setSelectedTeam2(id);
  const conductToss = () => {
    const toss = Math.round(Math.random() * 1) === 0 ? "Heads" : "Tails";
    setTossResult(toss)
    setTossWonBy(tossSelection === toss ? selectedTeam1 : selectedTeam2);
  }

  const onTossDecision = (decision: "bat" | "bowl") => {
    setTossDecision(decision)
    if (!selectedTeam1 || !selectedTeam2 || !tossWonBy || !decision) return;

    addMatch({
      team1Id: selectedTeam1,
      team2Id: selectedTeam2,
      tossWinner: tossWonBy,
      tossDecision: decision
    })
  }

  return (
    <div>
      <h3>Select Team 1:</h3>
      <Flex sx={{gap: "10px"}}>
        {
          data.map((t: Team) => {
            return <Button key={t.id} onClick={() => onTeam1Click(t.id)} disabled={Boolean(selectedTeam1)}>{t.name}</Button>
          })
        }
      </Flex>

      {selectedTeam1 && (
        <>
          <h3>Select Team 1:</h3>
          <Flex sx={{ gap: "10px" }}>
            {data.filter((t: Team) => t.id !== selectedTeam1 ).map((t: Team) => {
              return <Button key={t.id} onClick={() => onTeam2Click(t.id)} disabled={Boolean(selectedTeam2)}>{t.name}</Button>
            })}
          </Flex>
        </>
      )}

      {selectedTeam1 && (
        <Text sx={TextStyle}>Team 1: {data.find((t: Team) => t.id === selectedTeam1).name}</Text>
      )}

      {selectedTeam2 && (
        <Text sx={TextStyle}>Team 2: {data.find((t: Team) => t.id === selectedTeam2).name}</Text>
      )}

      {selectedTeam1 && selectedTeam2 && (
          <>
            <Text sx={TextStyle}>{data.find((t: Team) => t.id === selectedTeam1).name} is selecting:</Text>
            <Button onClick={() => setTossSelection("Heads")} >HEADS</Button>
            <Button onClick={() => setTossSelection("TAILS")} >TAILS</Button>
          </>
        )
      }

      {selectedTeam1 && selectedTeam2 && tossSelection && (
        <>
          <Text sx={TextStyle}>{data.find((t: Team) => t.id === selectedTeam1).name} selected: {tossSelection}</Text>
          <Button onClick={conductToss}>Do Toss!!</Button>
        </>
      )}

      {tossResult &&
        <>
          <Text sx={TextStyle}>The toss is {tossResult}</Text> 
          <Text sx={TextStyle}>{data.find((t: Team) => t.id === tossWonBy).name} is chossing to:</Text>
          <Button onClick={() => onTossDecision("bat")} >Bat</Button>
          <Button onClick={() => onTossDecision("bowl")} >Bowl</Button>
        </>
      }
    </div>
  )
}

export default MatchSetup