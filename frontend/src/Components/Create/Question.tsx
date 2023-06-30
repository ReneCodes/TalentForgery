import {FC} from 'react';
import {QuestionType} from '../../utils/types';

const Question: FC<{question: QuestionType}> = ({question}) => {
  return (
    question && (
      <div className="question">
        <p className="question_title">{question.question}</p>
        <div className="question_line"></div>
        <ul className="options_list">
          {question.options.map((option, index) => (
            <li
              className={option === question.answer ? 'correct' : 'incorrect'}
              key={index}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Question;