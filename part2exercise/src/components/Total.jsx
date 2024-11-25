export const Total = ({parts}) => {
    return(
      <strong>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</strong>
    )
  }