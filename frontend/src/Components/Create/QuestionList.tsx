import { Card } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getQuestions } from "../../services/Api.service";
import { QuestionType } from "../../utils/types";

interface QuestionListComp {
  questions: QuestionType[] | {question: QuestionType}[]
}

const QuestionList: FC<QuestionListComp> = ({questions}) => {
  const [questionList, setQuestionList] = useState<{question: QuestionType}[]>([]);

  useEffect(() => {
    if(questions[0] && typeof questions[0] === 'string') {
      (async() => {
        await getQuestions({tutorial_id: questions}, setQuestionList);
      })()
    } else if (questionList.length === 0) {
      //@ts-ignore
      setQuestionList(questions.map((question) => ({ question: question.question })));
    }
  }, [questions])

  return <div>
    {Array.isArray(questionList) && questionList.map((question, key) => (
      <div className="reschedule_question" key={key}>
        <Card className="reschedule_question_card">
          <h2>{question.question.question}</h2>
          {question.question.options.map((option, key) => (
            <h3 key={key}>{key} : {option}</h3>
          ))}
          <h3>Answer: {question.question.answer}</h3>
        </Card>
      </div>
    ))}
  </div>
}

export default QuestionList;

// setQuestionList(questions.map((question) => ({ question: question })));