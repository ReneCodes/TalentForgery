import { SyntheticEvent } from "react";
import { Card, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import './test.css';

interface TestQuestionComp {
  id: number,
  question: string,
  options: string[],
  answer: string,
  choice?: string
}

const mockQuestions: TestQuestionComp[] = [{
  id: 3,
  question: 'Where is steve?',
  options: ['Detroit', 'Michigan', 'Orlando'],
  answer: 'Detroit'
},
{
  id: 4,
  question: 'Ham or Cheese?',
  options: ['Ham', 'Cheese'],
  answer: 'Cheese'
},
{
  id: 5,
  question: 'Whats the best drink?',
  options: ['Vodka', 'Beer', 'Cider'],
  answer: 'Cider'
}]

const TestList = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState<TestQuestionComp[]>([]);

  useEffect(() => {
    setQuestions(mockQuestions);
  }, [])

  const handleAnswer = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    questions[index].choice = target.value as string;
    setIndex(res => res+1);
  }

  useEffect(() => {
    if(index === questions.length && questions.length !== 0) {
      const ids = [];
      const choices = [];
      for(const question of questions) {
        ids.push(question.id);
        choices.push(question.choice);
      }
      console.log(ids, choices);
    }
  }, [index])

  return <Card className="checklist_box">
    <h2>{questions[index]?.question}</h2>
    <RadioGroup>
      {questions[index]?.options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          label={option}
          control={<Radio />}
          name="optionGroup"
          onChange={handleAnswer}
        />
      ))}
    </RadioGroup>
  </Card>
}

export default TestList;