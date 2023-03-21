import { render, screen, cleanup } from '@testing-library/react';
import Counter from '../Counter';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    cleanup();
});

test('Counter shows 0 as default', () => {
    render(<Counter />);
    const counter = screen.getByTestId('counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent('0');
});

test('Counter shows 1 after increment', () => {
    render (<Counter />);
    const counterText = screen.getByTestId('counterText');
    const incrementButton = screen.getByText('Increment');
    expect(incrementButton).toBeInTheDocument();
    act (() => incrementButton.click());
    expect(counterText).toHaveTextContent('1');
});

test('Counter shows -1 after decrement', () => {
    render (<Counter />);
    const counterText = screen.getByTestId('counterText');
    const decrementButton = screen.getByText('Decrement');
    expect(decrementButton).toBeInTheDocument();
    act (() => decrementButton.click());
    expect(counterText).toHaveTextContent('-1');
});