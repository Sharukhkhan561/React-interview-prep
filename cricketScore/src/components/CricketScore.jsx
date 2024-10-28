import React,{useState} from 'react'

const CricketScore = () => {
    // State to keep track of the score for each ball
    const [scores, setScores] = useState([]);
    const [ballNumber, setBallNumber] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
  
    // Function to generate random runs and update the score
    const updateScore = () => {
      if (ballNumber <= 6) {
        // Generate a random score between 0 and 6 for each ball
        const runs = Math.floor(Math.random() * 7);
  
        // Update the scores and total score
        setScores([...scores, { ballNumber, runs }]);
        setTotalScore(totalScore + runs);
        setBallNumber(ballNumber + 1);
      }
    };
  
    return (
      <div className='tracker'>
        <h2>Cricket Score Tracker</h2>
        <button onClick={updateScore} disabled={ballNumber > 6}>
          Update Score
        </button>
  
        <table className='table-data' border="1" >
          <thead>
            <tr>
              <th>Ball Number</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.ballNumber}>
                <td>{score.ballNumber}</td>
                <td>{score.runs}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {ballNumber > 6 && (
          <h3>Total Score: {totalScore}</h3>
        )}
      </div>
    );
  };
  
  export default CricketScore;