import { useEffect, useState } from "react";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import { QuestionType } from '../../utils/types';
import './Create.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const obj = {
      question: 'why did the chicken cross the road?',
      options: ['cheese', 'ham', 'mcDonalds'],
      answer: 'mcDonalds'
    }

    setQuestions([obj])
  }, [])

  return <div>
    <ul>
      {questions.map((question) => (
        <Question question={question} />
      ))}
    </ul>
    <AddQuestion />
  </div>
}

export default QuestionList;