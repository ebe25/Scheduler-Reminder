import { useState } from 'react'
import { SignupFormDemo } from './components/SignupForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignupFormDemo/>
    </>
  )
}

export default App
