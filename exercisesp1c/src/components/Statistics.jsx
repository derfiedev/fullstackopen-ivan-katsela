import { StatisticsLine } from "./StatisticsLine"

export const Statistics  = (props) => {
    if (props.data.good + props.data.neutral + props.data.bad != 0)
    return(
      <div>
        <h1>statistics</h1>
        <table>
            <tbody>
              {Object.entries(props.data).map(([key, value]) => (
                <StatisticsLine key={key} text={key.charAt(0).toUpperCase() + key.slice(1)} value={key === "positive" ? value + "%" : value} />
              ))}
            </tbody>
        </table>
        
      </div>
    )
    else return (
      <div>No feedback given yet</div>
    )
  }