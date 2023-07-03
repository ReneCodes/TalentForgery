import { FC } from "react";
import { QuestionType } from "../../utils/types";

interface QuestionListComp {
  questions: QuestionType[]
}

const QuestionList: FC<QuestionListComp> = ({questions}) => {
  return <div>
    {questions.map((question, key) => (
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