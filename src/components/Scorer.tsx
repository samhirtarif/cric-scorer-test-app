import { Button, Flex, Text } from "theme-ui"
import { useGetMatchQuery, useUpdateMatchMutation } from "../features/api/apiSlice"


const Scorer = () => {
  const { data, isError, isLoading, refetch } = useGetMatchQuery("")
  const [
    updateMatch
  ] = useUpdateMatchMutation()
  
  if (isLoading) return <span>Loading</span>
  if (isError) return <span>Sorry, an error occurred</span>

  if (!Boolean(data)) return <span>No match in progress</span>

  const onRunOptionClick = (run: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    updateMatch({
      runs: run
    }).then(() => refetch())
  }

  const onWicket = () => {
    updateMatch({
      wicket: true
    }).then(() => refetch())
  }

  const onExtra = () => {
    updateMatch({
      extra: true
    }).then(() => refetch())
  }

  return (
    <div>
      <Flex sx={{ flexDirection: "column" }}>
        <Text>{data.battingDisplayName} vs {data.bowlingDisplayName}</Text>
        <Text>Currently batting: {data.battingDisplayName}</Text>
        {
          data.currentInning === 1 && 
          <>
            <Text>Striker: {data.inning1.striker.name}</Text>
            <Text>Non-Striker: {data.inning1.nonStriker.name}</Text>
            <Text>Bowler: {data.inning1.bowler.name}</Text>
            <hr />
            <Text>Over: {data.inning1.currentOvers}.{data.inning1.ballNumber}</Text>
            <Text>Score: {data.inning1.score}/{data.inning1.wickets}</Text>
          </>
        }
      </Flex>
      <hr />
      <Flex sx={{ flexDirection: "column" }}>
        <Text>Scoring Options</Text>
        <Text>Run:</Text>
        <Flex>
          <Button onClick={() => onRunOptionClick(0)}>0</Button>
          <Button onClick={() => onRunOptionClick(1)}>1</Button>
          <Button onClick={() => onRunOptionClick(2)}>2</Button>
          <Button onClick={() => onRunOptionClick(3)}>3</Button>
          <Button onClick={() => onRunOptionClick(4)}>4</Button>
          <Button onClick={() => onRunOptionClick(5)}>5</Button>
          <Button onClick={() => onRunOptionClick(6)}>6</Button>
        </Flex>
        
        <Button sx={{ mt: "10px" }} onClick={() => onWicket()}>Wicket</Button>
        <Button sx={{ mt: "10px" }} onClick={() => onExtra()}>Extra</Button>
      </Flex>
    </div>
  )
}

export default Scorer