import { Card} from "@mui/material";
import { FC } from "react";
import { QuestionType } from "../../utils/types";

const ImportedQuestions: FC<{questions: QuestionType[]}> = ({questions}) => {
  return<>
    {questions.map((question, key) => (
    <div className="imported_question" key={key}>
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <div>
        <h3>{question.question}</h3>
        </div>
          {question.options.map((option, key) => (
            <p key={key}>{option}</p>
          ))}
          <p>Answer: {question.answer}</p>
      </Card>
    </div>
    ))}
  </> 
}

export default ImportedQuestions;