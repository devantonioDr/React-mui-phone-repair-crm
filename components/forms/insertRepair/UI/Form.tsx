import { withContextEfficientForm } from "../../../../context/EfficientFormContextProvider";

export const FormDumb = (props: any) => {
    return <form {...props} />;
};

export const Form = withContextEfficientForm(FormDumb);
