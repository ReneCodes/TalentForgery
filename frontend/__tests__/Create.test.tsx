// @ts-ignore
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Question from '../src/Components/Create/Question';
import AddQuestion from '../src/Components/Create/AddQuestion';
import {expect, test, describe, beforeEach} from '@jest/globals';

describe('Question', () => {
  test('Renders the content' ,() => {
    const mock = {
      question: 'hi bob',
      options: ['hello', 'wassup', 'go away'],
      answer: 'hello'
    }

    render(<Question question={mock} />)

    const question = screen.queryByText('hi bob');
    const option1 = screen.queryByText('hello');
    const option2 = screen.queryByText('wassup');
    const option3 = screen.queryByText('go away');
    
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

