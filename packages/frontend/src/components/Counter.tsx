import React from 'react';
import { Button } from '@mui/material';

function App() {
    return (
        <Counter />
    );
}

function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div data-testid='counter'>
            <p data-testid='counterText'>Count: {String(count)}</p>
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        </div>
    );
}

export default App;