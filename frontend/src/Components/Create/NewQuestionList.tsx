import { FC, useEffect, useState } from "react";
import { getQuestions } from "../../services/Api.service";
import { QuestionType } from "../../utils/types";

interface QuestionListComp {
  questions: QuestionType[]
}

const QuestionList: FC<QuestionListComp> = ({questions}) => {
  const [questionList, setQuestionList] = useState(questions);

  useEffect(() => {
    console.log(questions[0] && typeof questions[0] === 'string');
    if(questions[0] && typeof questions[0] === 'string') {
      (async() => {
        // TODO tutorial id not question ids
        await getQuestions(questions, setQuestionList);
      })()
    }
  }, [questions])
  return <div>
    {questionList.map((question, key) => (
      <div key={key}>
        <h2>{question.question}</h2>
        {question.options.map((option, key) => (
          <h3 key={key}>{key}: {option}</h3>
        ))}
        <h3>Answer: {question.answer}</h3>
      </div>
    ))}
  </div>
}

export default QuestionList;