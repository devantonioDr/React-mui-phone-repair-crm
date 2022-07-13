import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import MaterialUIPickers from ".";


export default {
    title:'Mui-react/DatePicker',
    component:MaterialUIPickers
} as ComponentMeta<typeof MaterialUIPickers>

// InsertDialog with material stepper.
const Template:ComponentStory<typeof MaterialUIPickers> = (args) => <MaterialUIPickers {...args} />
export const dialogWithMaterialStepper =  Template.bind({});

