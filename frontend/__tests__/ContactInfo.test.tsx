import { render, screen } from '@testing-library/react';
import Contact from '../src/Components/ContactInfo/ContactInfo';
import {expect, test, describe} from '@jest/globals';

describe('Contact', () => {
  test('renders inputed content', () => {
    const info = {
      firstName:'Jeff', 
      lastName:'Bono', 
      id:347892,
      department:'Finance',
      email:'Jeff@gmail.com',
      secondEmail:'jeff1234@hotmail.co',
      phoneNumber:'08894532220'
    }

    render(<Contact info={info}/>);
  
    let inputTextArr = screen.queryAllByText(/Jeff/i);
    expect(inputTextArr).toBeDefined();
  
    let inputText = screen.queryByText(/Bono/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/347892/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/Finance/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/jeff@gmail.com/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/jeff1234@hotmail.co/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/08894532220/i);
    expect(inputText).toBeDefined();
  });

  test('does not render optional content when it is not provided', () => {
    const info = {
      firstName:'Jeff', 
      lastName:'Bono', 
      id:347892,
      department:'Finance',
      email:'Jeff@gmail.com'
    }
    
    render(<Contact info={info}/>);
  
    let inputTextArr = screen.queryAllByText(/Jeff/i);
    expect(inputTextArr).toBeDefined();
  
    let inputText = screen.queryByText(/Bono/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/347892/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/Finance/i);
    expect(inputText).toBeDefined();
  
    inputText = screen.queryByText(/jeff@gmail.com/i);
    expect(inputText).toBeDefined();
  
    const secondEmail = screen.queryByText('Secondary Email');
    const phoneNumber = screen.queryByText('Phone Number');

    expect(secondEmail).toBeNull();
    expect(phoneNumber).toBeNull();
  });
})