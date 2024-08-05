import { useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    function resetFormFields() {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password != confirmPassword){
            alert("Passwords are not equal")
            return;
        }

        try {
          const {user} = await createAuthUserWithEmailAndPassword(
              email, password
          );
          console.log("Before document: ", user)
          await createUserDocumentFromAuth(user, {displayName: displayName, email: email})
          console.log("After document:", user)
            resetFormFields()
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('user creation error', error)

            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label={"Email"} type={"email"} required onChange={handleChange} name={"email"} value={email}/>
                <FormInput label={"Password"} type={"password"} required onChange={handleChange} name={"password"} value={password}/>
                <FormInput label={"Confirm password"} type={"password"} required onChange={handleChange} name={"confirmPassword"}
                           value={confirmPassword}/>

                <Button type={"submit"}>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm
