import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import {InsertRepair} from "./insertRepair";


export default {
    title:'Components/Forms/InserReapir',
    component:InsertRepair
} as ComponentMeta<typeof InsertRepair>

// InsertDialog with material stepper.
const Template:ComponentStory<typeof InsertRepair> = (args) => <InsertRepair {...args} />
export const dialogWithMaterialStepper =  Template.bind({});

