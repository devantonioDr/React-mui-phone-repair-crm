import TextField from "@mui/material/TextField";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";


export default {
    title: 'Mui-react/TextField',
    component: TextField,
    argTypes: {
        size: {
            options: ['medium','small'],
            control: { type: 'radio' }

        }
    }
} as ComponentMeta<typeof TextField>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />


export const outlined = Template.bind({});
outlined.args = {
    error: false,
    id: "outlined-basic",
    label: "Outlined",
    variant: "outlined",
    value: "Hello world",
    helperText: "Helper text",
    size: "medium"
}

