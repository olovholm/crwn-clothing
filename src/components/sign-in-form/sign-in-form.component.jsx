import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
import {
    createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    function resetFormFields() {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        console.log(user)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = signInAuthUserWithEmailAndPassword(email,password)
            resetFormFields()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Email"} type={"email"} required onChange={handleChange} name={"email"}
                           value={email}/>
                <FormInput label={"Password"} type={"password"} required onChange={handleChange} name={"password"}
                           value={password}/>

                <div className={"buttons-container"}>
                    <Button type={"submit"}>Sign In</Button>
                    <Button buttonType={'google'} onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
            </form>

        </div>
    )
}

export default SignInForm
