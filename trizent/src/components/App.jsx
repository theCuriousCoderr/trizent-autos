import React, { useState } from 'react';
import AppChild from '../AppChild';

function App() {
    const [isSignIn, setIsSignIn] = useState(false);
    
    return (
        <AppChild isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
    )
}
export default App;