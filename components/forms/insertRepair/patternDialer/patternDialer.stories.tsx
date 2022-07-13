import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import PatterDialer from "./patternDialer";




export default {
    title:'Components/Forms/InserReapir/patternDialer',
    component:PatterDialer
} as ComponentMeta<typeof PatterDialer>

// InsertDialog with material stepper.
const Template:ComponentStory<typeof PatterDialer> = (args) => <PatterDialer {...args} />
export const dialogWithMaterialStepper =  Template.bind({});

