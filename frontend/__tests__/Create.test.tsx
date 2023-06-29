// @ts-ignore
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Question from '../src/Components/Create/Question';
import AddQuestion from '../src/Components/Create/AddQuestion';
import QuestionList from '../src/Components/Create/QuestionList';
import TutorialForm from '../src/Components/Create/TutorialForm';
import Create from '../src/Pages/Create'
import {expect, test, describe} from '@jest/globals';
import { jest } from '@jest/globals';
import Schedule from '../src/Components/Create/Schedule';

describe('Question', () => {
  test('Renders the content' ,() => {
    const mock = {
      question: 'hi bob',
      options: ['hello', 'wassup', 'go away'],
      answer: 'hello'
    }

    render(<Question question={mock} />)

    const question = screen.getByText('hi bob');
    const option1 = screen.getByText('hello');
    const option2 = screen.getByText('wassup');
    const option3 = screen.getByText('go away');
    
    expect(question).toBeDefined();
    expect(option1).toBeDefined();
    expect(option2).toBeDefined();
    expect(option3).toBeDefined();
  })
})

describe('AddQuestion', () => {
  beforeEach(() => {
    const test = (data: string) => {
      console.log(data);
    }

    render(<AddQuestion onData={test} />)
  })

  test('renders the content', () => {
    const inputs = screen.queryAllByRole('textbox');
    expect(inputs.length).toBe(2);

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(2);
  })

  test('adds questions', () => {
    const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
    const buttons = screen.queryAllByRole('button');

    fireEvent.change(inputs[0], {target: {value: 'how are you today?'}});

    fireEvent.change(inputs[1], {target: {value: 'Im good'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im bad'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im epic'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    let text = screen.getByText('Im good');
    expect(text).toBeDefined();

    text = screen.getByText('Im bad');
    expect(text).toBeDefined();

    text = screen.getByText('Im epic');
    expect(text).toBeDefined();

    let boo = false;
    if (text) {
      boo = true;
      fireEvent.click(text);
    }
    expect(boo).toBe(true);
  })
})

describe('Question List', () => {
  beforeEach(() => {
    const mock = {
      question: 'hi bob',
      options: ['hello', 'wassup', 'go away'],
      answer: 'hello'
    }

    const callback = (data: any) => console.log(data)
    render(<QuestionList imported={mock} getData={false} onData={callback}/>)
  })

  test('renders the content', () => {
    const counter = screen.getByText('1/2');
    expect(counter).toBeDefined();

    const question = screen.getByText('This is the Question');
    const option1 = screen.getByText('this is an option');
    const option2 = screen.getByText('when its green its the answer');
    const option3 = screen.getByText('press delete to remove the tutorial');
    
    expect(question).toBeDefined();
    expect(option1).toBeDefined();
    expect(option2).toBeDefined();
    expect(option3).toBeDefined();

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(1);

    const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
    fireEvent.click(arrowIcon);

    const counter2 = screen.getByText('2/2');
    expect(counter2).toBeDefined();
  })

  test('can add questions', () => {
    const counter = screen.getByText('1/2');
    expect(counter).toBeDefined();

    const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
    fireEvent.click(arrowIcon);

    const counter2 = screen.getByText('2/2');
    expect(counter2).toBeDefined();

    const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(3);

    fireEvent.change(inputs[0], {target: {value: 'how are you today?'}});

    fireEvent.change(inputs[1], {target: {value: 'Im good'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im bad'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im epic'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    let text = screen.getByText('Im good');
    expect(text).toBeDefined();

    text = screen.getByText('Im bad');
    expect(text).toBeDefined();

    text = screen.getByText('Im epic');
    expect(text).toBeDefined();

    let boo = false;
    if (text) {
      boo = true;
      fireEvent.click(text);
    }
    expect(boo).toBe(true);

    window.alert = jest.fn();

    fireEvent.click(buttons[1]);

    expect(window.alert).not.toHaveBeenCalled();

    const counter3 = screen.getByText('2/3');
    expect(counter3).toBeDefined();

    const question = screen.getByText('how are you today?');
    const option1 = screen.getByText('Im good');
    const option2 = screen.getByText('Im bad');
    const option3 = screen.getByText('Im epic');
    
    expect(question).toBeDefined();
    expect(option1).toBeDefined();
    expect(option2).toBeDefined();
    expect(option3).toBeDefined();
  })

  test('does not add a question if the form is filled out incorrectyl', () => {
    const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
    fireEvent.click(arrowIcon);

    const counter2 = screen.getByText('2/2');
    expect(counter2).toBeDefined();

    const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(3);

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockReset();
    fireEvent.click(buttons[1]);
    expect(mockAlert).toHaveBeenCalled();

    fireEvent.change(inputs[0], {target: {value: 'how are you today?'}});

    mockAlert.mockReset();
    fireEvent.click(buttons[1]);
    expect(mockAlert).toHaveBeenCalled();

    fireEvent.change(inputs[1], {target: {value: 'Im good'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im bad'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    fireEvent.change(inputs[1], {target: {value: 'Im epic'}});
    fireEvent.click(buttons[0]);
    expect(inputs[1].value).toBe('');

    let text = screen.getByText('Im good');
    expect(text).toBeDefined();

    text = screen.getByText('Im bad');
    expect(text).toBeDefined();

    text = screen.getByText('Im epic');
    expect(text).toBeDefined();

    mockAlert.mockReset();
    fireEvent.click(buttons[1]);
    expect(mockAlert).toHaveBeenCalled();

    if (text) {
      fireEvent.click(text);
    }

    mockAlert.mockReset();
    fireEvent.click(buttons[1]);
    expect(mockAlert).not.toHaveBeenCalled();
  })
})

describe('tutorial form', () => {
  beforeEach(() => {

    const callback = (data: any) => console.log(data)

    render(<TutorialForm getData={false} onData={callback} />)
  })
  test('renders the content', () => {
    const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
    expect(inputs.length).toBe(4);

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(1);
  })

  test('can input information', () => {
    const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
    const buttons = screen.queryAllByRole('button');

    fireEvent.change(inputs[0], {target: {value: 'How to eat'}});
    fireEvent.change(inputs[1], {target: {value: 'Learn how to eat Fruit, Veg and meat with this short but in-depth tutorial on a basic life skill you should have learned already'}});
    fireEvent.change(inputs[2], {target: {value: 'Nessasary'}});
    fireEvent.click(buttons[0]);
    fireEvent.change(inputs[2], {target: {value: 'Culinary'}});
    fireEvent.click(buttons[0]);
    fireEvent.change(inputs[2], {target: {value: 'Basic'}});
    fireEvent.click(buttons[0]);
    fireEvent.change(inputs[3], {target: {value: 7}});

    expect(inputs[0].value).toBe('How to eat');
    expect(inputs[1].value).toBe('Learn how to eat Fruit, Veg and meat with this short but in-depth tutorial on a basic life skill you should have learned already');
    expect(inputs[3].value).toBe('7');

    expect(screen.getByText('Nessasary')).toBeDefined();
    expect(screen.getByText('Culinary')).toBeDefined();
    expect(screen.getByText('Basic')).toBeDefined();
  })
})

describe('import', () => {
  beforeEach(() => {
    render(<Create />)
  })

  test('renders a dropdown', () => {
    const arrowIcon = screen.getByTestId('ArrowDropDownIcon');
    expect(arrowIcon).toBeDefined();
    
    const dropdown = screen.getByLabelText('Import Questions');
    expect(dropdown).toBeDefined();
  })

  test('can import questions', () => {
    const dropdown = screen.getByLabelText('Import Questions');

    fireEvent.mouseDown(dropdown);
    expect(screen.getByText('Where is steve?')).toBeDefined();
    const firstOption = screen.getByRole('option', { name:  'Where is steve?'});
    fireEvent.click(firstOption);

    const counter = screen.getByText('1/3');
    expect(counter).toBeDefined();

    const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
    fireEvent.click(arrowIcon);

    const counter2 = screen.getByText('2/3');
    expect(counter2).toBeDefined();

    const question = screen.getAllByText('Where is steve?');
    const option1 = screen.getByText('Detroit');
    const option2 = screen.getByText('Michigan');
    const option3 = screen.getByText('Orlando');
    
    expect(question.length).toBe(3);
    expect(option1).toBeDefined();
    expect(option2).toBeDefined();
    expect(option3).toBeDefined();
  })
})

// describe('submit', () => {
//   beforeEach(() => {
//     render(<Create />)
//   })

//   test('renders the button', () => {
//     const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
//     fireEvent.click(arrowIcon);

//     const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
//     expect(inputs.length).toBe(6);

//     const buttons = screen.queryAllByRole('button');
//     expect(buttons.length).toBe(6);
//   })

//   test('can export all the information in the form', () => {
//     const arrowIcon = screen.getByTestId('ArrowForwardIosTwoToneIcon');
//     fireEvent.click(arrowIcon);

//     const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
//     const buttons = screen.queryAllByRole('button');

//     fireEvent.change(inputs[0], {target: {value: 'test'}});
//     fireEvent.change(inputs[1], {target: {value: 'test'}});
//     fireEvent.change(inputs[2], {target: {value: 'test1'}});
//     fireEvent.click(buttons[0]);
//     fireEvent.change(inputs[2], {target: {value: 'test2'}});
//     fireEvent.click(buttons[0]);
//     fireEvent.change(inputs[3], {target: {value: 1}});
    
//     expect(screen.getByText('test1')).toBeDefined();

//     fireEvent.change(inputs[4], {target: {value: 'question'}});
//     fireEvent.change(inputs[5], {target: {value: 'option'}});
//     fireEvent.click(buttons[2]);

//     expect(screen.getByText('option')).toBeDefined();

//     const text = screen.getByText('option');
//     expect(text).toBeDefined();

//     let boo = false;
//     if (text) {
//       boo = true;
//       fireEvent.click(text);
//     }
//     expect(boo).toBe(true);

//     window.alert = jest.fn();
//     fireEvent.click(buttons[3]);
//     expect(window.alert).not.toHaveBeenCalled();

//     expect(screen.getByText('2/3')).toBeDefined();
//     expect(screen.getByText('option')).toBeDefined();

//     console.log = jest.fn();
//     fireEvent.click(buttons[5]);
//     expect(window.alert).not.toHaveBeenCalled();
//     expect(console.log).toHaveBeenCalledWith({
//       "access_date": "",
//       "description": "test",
//       "due_date": "",
//       "question_ids": [
//         {
//         "answer": "when its green its the answer",
//         "options": [
//           "this is an option",
//           "when its green its the answer",
//           "press delete to remove the tutorial",
//         ],
//         "question": "This is the Question",
//         },
//         {
//           "answer": "option",
//           "options": [
//             "option",
//           ],
//           "question": "question",
//         },
//       ],
//       "questions_shown": 1,
//       "title": "test",
//       "video_url": "",
//     });
//   })

//   test('does not submit if any information is missing', () => {
//     const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
//     const buttons = screen.queryAllByRole('button');

//     console.log = jest.fn();
//     const mockAlert = jest.spyOn(window, 'alert');
//     mockAlert.mockReset();
//     fireEvent.click(buttons[3]);
//     expect(mockAlert).toHaveBeenCalled();
//     fireEvent.change(inputs[0], {target: {value: 'test'}});

//     mockAlert.mockReset();
//     fireEvent.click(buttons[3]);
//     expect(mockAlert).toHaveBeenCalled();
//     fireEvent.change(inputs[1], {target: {value: 'test2'}});

//     mockAlert.mockReset();
//     fireEvent.click(buttons[3]);
//     expect(mockAlert).toHaveBeenCalled();
//     fireEvent.change(inputs[3], {target: {value: 1}});

//     expect(console.log).not.toHaveBeenCalled();
//   })

//   test('length must be a number', () => {
//     const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
//     const buttons = screen.queryAllByRole('button');

//     console.log = jest.fn();
//     const mockAlert = jest.spyOn(window, 'alert');

//     fireEvent.change(inputs[0], {target: {value: 'test'}});
//     fireEvent.change(inputs[1], {target: {value: 'test2'}});
//     fireEvent.change(inputs[3], {target: {value: 'wrong'}});

//     fireEvent.click(buttons[3]);
//     expect(console.log).not.toHaveBeenCalled();
//     expect(mockAlert).toHaveBeenCalled();
//   })

//   test('questions.length >= test length', () => {
//     const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
//     const buttons = screen.queryAllByRole('button');

//     console.log = jest.fn();
//     const mockAlert = jest.spyOn(window, 'alert');

//     fireEvent.change(inputs[0], {target: {value: 'test'}});
//     fireEvent.change(inputs[1], {target: {value: 'test2'}});
//     fireEvent.change(inputs[3], {target: {value: 7}});

//     fireEvent.click(buttons[3]);
//     expect(console.log).not.toHaveBeenCalled();
//     expect(mockAlert).toHaveBeenCalled();
//   })
// })

describe('schedule', () => {
  test('it renders the content', () => {
    const callback = (data: any) => console.log(data);
    render(<Schedule onData={callback} />);

    const datePicker = screen.getAllByPlaceholderText('MM/DD/YYYY hh:mm aa');
    expect(datePicker.length).toBe(2);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  })

  test('sends a callback', () => {
    let dates = {};
    const callback = (data: any) => dates = data;
    render(<Schedule onData={callback} />);

    const datePicker = screen.getAllByPlaceholderText('MM/DD/YYYY hh:mm aa');
    const buttons = screen.getAllByRole('button');

    const newDate = new Date("Wed, 14 Jun 2023 02:20:00 GMT");
    fireEvent.change(datePicker[0], { target: { value: newDate.toISOString().slice(0, 10) } });

    const newDate2 = new Date('2023-07-28');
    fireEvent.change(datePicker[1], { target: { value: newDate2.toISOString().slice(0, 10) } });

    fireEvent.click(buttons[2]);

    expect(JSON.stringify(dates)).toBe('{"startDate":null,"endDate":null}');
  })
})