import { useState } from "react";

const Title = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = ({ feedback }) => {
  console.log(feedback);
  const average = (feedback) =>
    (feedback[0] - feedback[2]) / (feedback[0] + feedback[1] + feedback[2]);
  const positive = (feedback) =>
    (feedback[0] / (feedback[0] + feedback[1] + feedback[2])) * 100;
  if (feedback.every((value) => value === 0)) {
    return <p>No feedback given</p>;
  } else {
    console.log("else is being returned");
    return (
      <>
        <table>
          <tbody>
            <tr>
              <StatisticsLine text="good" value={feedback[0]}></StatisticsLine>
            </tr>
            <tr>
              <StatisticsLine
                text="neutral"
                value={feedback[1]}
              ></StatisticsLine>
            </tr>
            <tr>
              <StatisticsLine text="bad" value={feedback[2]}></StatisticsLine>
            </tr>
            <tr>
              <StatisticsLine
                text="all"
                value={feedback[0] + feedback[1] + feedback[2]}
              ></StatisticsLine>
            </tr>
            <tr>
              <StatisticsLine
                text="average"
                value={average(feedback)}
              ></StatisticsLine>
            </tr>
            <tr>
              <StatisticsLine
                text="positive"
                value={positive(feedback)}
              ></StatisticsLine>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {
  console.log("<App> rendered");
  const [feedback, setFeedback] = useState([0, 0, 0]);
  const updateFeedback = (category) => {
    return () => {
      console.log("Feedback before", feedback);
      const feedbackCopy = [...feedback];
      feedbackCopy[category] += 1;
      setFeedback(feedbackCopy);
      console.log("Feedback after", feedback);
    };
  };

  return (
    <>
      <Title text="give feedback"></Title>
      <Button onClick={updateFeedback(0)} text="good"></Button>
      <Button onClick={updateFeedback(1)} text="neutral"></Button>
      <Button onClick={updateFeedback(2)} text="bad"></Button>
      <Title text="statistics"></Title>
      <Statistics feedback={feedback}></Statistics>
    </>
  );
};

export default App;
