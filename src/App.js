import React from 'react';
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import NavBar from './NavBar'
import WelcomeUser from './WelcomeUser';


function signInClickHandler(instance) {
  instance.loginRedirect();
}

function SignInButton() {
  const { instance } = useMsal();

  return <button onClick={() => signInClickHandler(instance)}>Sign In - Microsoft</button>;
}

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <WelcomeUser />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Sign in with a personal Microsoft Account</p>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
