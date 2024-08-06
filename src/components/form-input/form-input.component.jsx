import {FormInputLabel, Group, Input} from "./form-input.styles";

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group >
            <Input className={"form-input"} {...otherProps}/>

            {label && (
                <FormInputLabel className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>{label}</FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput
