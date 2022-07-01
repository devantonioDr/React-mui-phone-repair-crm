import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {VerticalProgressLayout} from "./verticalProgressLayout";

export default {
    title:'Components/Forms/VerticalProgressLayout',
    component:VerticalProgressLayout
} as ComponentMeta<typeof VerticalProgressLayout>
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const Template:ComponentStory<typeof VerticalProgressLayout> = (args) => <VerticalProgressLayout {...args} />


export const defaultState =  Template.bind({});