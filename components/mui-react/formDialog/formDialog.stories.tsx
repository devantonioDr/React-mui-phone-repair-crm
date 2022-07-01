import TextField from "@mui/material/TextField";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FormDialog } from "./formDialog";


export default {
    title: 'Mui-react/FormDialog',
    component: FormDialog,
    argTypes: {
        size: {
            options: ['medium', 'small'],
            control: { type: 'radio' }

        }
    }
} as ComponentMeta<typeof FormDialog>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template: ComponentStory<typeof FormDialog> = (args) => <FormDialog {...args} />


export const defaultState = Template.bind({});


