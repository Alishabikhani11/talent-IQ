import { useState } from 'react'

import './App.css'
import { SignInButton,SignedOut,SignedIn,SignOutButton,UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1>Welcome to the app</h1>

      <SignedOut>
        <SignInButton mode="modal" >
          <button className=''>Sign Up Please</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton/>
     
    </>
  )
}

export default App
