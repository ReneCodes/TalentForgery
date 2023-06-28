// @ts-ignore
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Question from '../src/Components/Create/Question';
import AddQuestion from '../src/Components/Create/AddQuestion';
import QuestionList from '../src/Components/Create/QuestionList';
import {expect, test, describe, beforeEach} from '@jest/globals';
import { jest } from '@jest/globals';

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

    render(<QuestionList imported={mock} />)
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

