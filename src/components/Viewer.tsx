import { useGetLiveUpdateQuery } from '../features/api/apiSlice'
import { Flex, Text } from 'theme-ui'

const Viewer = () => {
  const { data, isError, isLoading } = useGetLiveUpdateQuery("", {
    // pollingInterval: 3000,
    // skipPollingIfUnfocused: false,
  })

  if (isLoading) return <span>Loading</span>
  if (isError) return <span>Sorry, an error occurred</span>

  return (
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
  )
}

export default Viewer