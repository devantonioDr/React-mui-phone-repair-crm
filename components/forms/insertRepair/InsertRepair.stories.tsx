import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {InsertRepair} from "./insertRepair";

export default {
    title:'Components/Forms/InserReapir',
    component:InsertRepair
} as ComponentMeta<typeof InsertRepair>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template:ComponentStory<typeof InsertRepair> = (args) => <InsertRepair {...args} />


export const defaultState =  Template.bind({});