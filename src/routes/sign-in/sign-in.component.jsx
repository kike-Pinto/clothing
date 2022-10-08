// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'

import {
  // auth,
  // signInWithGoogleRedirect,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  //when [] is empty it means runs the function once
  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await getRedirectResult(auth)
  //     // console.log(response)
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user)
  //     }
  //   }
  //   fetch().catch(console.error)
  // }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  )
}

export default SignIn
