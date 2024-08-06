import {BaseButton} from "./button.styles";



const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <BaseButton {...otherProps}>
            {children}
        </BaseButton>
    )
}


export default Button
