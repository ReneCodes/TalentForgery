import { useEffect, useState } from "react";
import Question from "./Question";
import { QuestionType } from '../../utils/types';
import './Create.css';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import AddQuestion from "./AddQuestion";

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const obj = {
      question: 'why did the chicken cross the road?',
      options: ['cheese', 'ham', 'mcDonalds'],
      answer: 'mcDonalds'
    }
    setQuestions([obj])
  }, [])

  const handleLeft = () => {
    if (counter === 1) {
      setCounter(questions.length + 1)
    } else {
      setCounter((num) => num-1)
    }
  }

  const handleRight = () => {
    if (counter === questions.length + 1) {
      setCounter(1);
    } else {
      setCounter((num) => num+1)
    }
  }

  return <div className="question_list">
    <div className="question_top">
      {counter === questions.length + 1 ? <AddQuestion /> : <Question question={questions[0]} />}
      <h1 className="index">{counter}/{questions.length + 1}</h1>
    </div>
    <div className="question_bar">
      <ArrowBackIosNewTwoToneIcon onClick={handleLeft} className="arrow" />
      <button className="delete">Delete</button>
      <ArrowForwardIosTwoToneIcon onClick={handleRight}  className="arrow" />
    </div>
  </div>
}

export default QuestionList;