import { validatorType } from "../context/EfficientFormContextProvider";


type ValidatorBoundContext = {inputName: string;inputLabel: string;};

export const onlyLetters:validatorType = function (this:ValidatorBoundContext,formData) {
    let errors: string[] = [];
    if (formData.data[this.inputName].match(/[^A-z]/g)) {
        errors.push(`Campo ${this.inputLabel.toLowerCase()} debe contener solo letras A-z`);
    }
    return errors;
};

export const notEmptyValidator:validatorType = function (this:ValidatorBoundContext, formData) {
    let errors: string[] = [];
    if (formData.data[this.inputName].trim() === "") {
        errors.push(`Campo ${this.inputLabel.toLowerCase()} es obligatorio.`);
    }
    return errors;
};

export const onlyNumbers:validatorType = function (this:ValidatorBoundContext,formData) {
    let errors: string[] = [];
    if (formData.data[this.inputName].match(/[^0-9]/g)) {
        errors.push(`Campo ${this.inputLabel.toLowerCase()} debe contener solo numeros `);
    }
    return errors;
};
