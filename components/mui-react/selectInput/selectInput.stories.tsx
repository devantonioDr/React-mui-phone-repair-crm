import TextField from "@mui/material/TextField";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SelectLabels from "./SelectLabels";


export default {
    title: 'Mui-react/SelectInput',
    component: SelectLabels,
    argTypes: {
        size: {
            options: ['medium', 'small'],
            control: { type: 'radio' }

        }
    }
} as ComponentMeta<typeof SelectLabels>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template: ComponentStory<typeof SelectLabels> = (args) => <SelectLabels {...args} />


export const defaultState = Template.bind({});


