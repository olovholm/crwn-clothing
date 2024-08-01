import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        console.log(user)
    }


    return(
        <>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sign in with Google popup</button>
        </>
    )

}

export default SignIn
