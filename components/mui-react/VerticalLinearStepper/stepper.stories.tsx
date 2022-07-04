import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { VerticalLinearStepper } from "./stepper";


export default {
    title: 'Mui-react/VerticalLinearStepper',
    component: VerticalLinearStepper,
    argTypes: {
       
    }
} as ComponentMeta<typeof VerticalLinearStepper>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template: ComponentStory<typeof VerticalLinearStepper> = (args) => <VerticalLinearStepper {...args} />


export const defaultState = Template.bind({});


