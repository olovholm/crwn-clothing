import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../sign-up-form/sign-up-form.component";


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
            <SignUpForm/>
        </>
    )

}

export default SignIn
