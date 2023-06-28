import { useEffect, useState, FC } from "react";
import Question from "./Question";
import { QuestionType } from '../../utils/types';
import './Create.css';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import AddQuestion from "./AddQuestion";

const QuestionList: FC<{imported: QuestionType}> = ({imported}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const obj = {
      question: 'This is the Question',
      options: ['this is an option', 'when its green its the answer', 'press delete to remove the tutorial'],
      answer: 'when its green its the answer'
    }
    setQuestions([obj])
  }, [])

  useEffect(() => {
    let boo = true;
    if(questions.length >= 1 && imported) {
      console.log(imported)
      for(const obj of questions) {
        if(obj.question === imported.question) boo = false;
      }
      if(boo) setQuestions((res) => [...res, imported]);
    }
  }, [imported])

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

  const handleDataFromChildren = (childData: QuestionType) => {
    setQuestions((res) => [...res, childData])
  }

  const handleDelete = () => {
    setQuestions((res) => {
      return res.filter((_, index) => index !== counter-1);
    })
  }

  return <div className="question_list">
    <div className="question_top">
      {counter === questions.length + 1 ? <AddQuestion onData={handleDataFromChildren} /> : <Question question={questions[counter - 1]} />}
      <h1 className="index">{counter}/{questions.length + 1}</h1>
    </div>
    <div className="question_bar">
      <ArrowBackIosNewTwoToneIcon onClick={handleLeft} className="arrow" />
      <button onClick={handleDelete} className="delete">Delete</button>
      <ArrowForwardIosTwoToneIcon onClick={handleRight}  className="arrow" />
    </div>
  </div>
}

export default QuestionList;