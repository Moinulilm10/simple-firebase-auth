import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/Firebase-init';

initializeAuthentication()

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();



function App() {
  const [user, setUser] = useState({})
  const auth = getAuth()

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, phototURL } = result.user
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: phototURL
        };
        setUser(loggedInUser)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        console.log(result);
        const { displayName, photoURL, email, password } = result.user;
        console.log(result.user)
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          password: password
        }
        setUser(loggedInUser);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  return (
    <div className="App">

      {
        !user.name
          ?
          <div>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleGithubSignIn}>Githube sign in</button>
            <button onClick={handleFacebookSignIn}>Facebook sign in</button>
          </div>
          :
          <button onClick={handleSignOut}>sign out</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
