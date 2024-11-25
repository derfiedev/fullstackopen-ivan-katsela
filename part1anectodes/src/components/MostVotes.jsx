export const MostVotes = ({ anecdotes, votes }) => {
    const maxVotes = Math.max(...votes);
    const maxVotesIndex = votes.indexOf(maxVotes);
  
    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[maxVotesIndex]}</p>
        <p>Votes: {maxVotes}</p>
      </div>
    );
  };