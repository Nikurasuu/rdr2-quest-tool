import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';

test('NavBar shows title', () => {
    render(<NavBar />);
    const title = screen.getByTestId('title-1');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Red Dead Redemption 2 Quest Tool');
});

test('NavBar shows buttons', () => {
    render(<NavBar />);
    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
    const aboutButton = screen.getByText('About');
    expect(aboutButton).toBeInTheDocument();
});