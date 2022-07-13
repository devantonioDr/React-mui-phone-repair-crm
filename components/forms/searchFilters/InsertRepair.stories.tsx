import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import SearchFilters from "./";


export default {
    title:'Components/Forms/SearchFilters',
    component:SearchFilters
} as ComponentMeta<typeof SearchFilters>

// InsertDialog with material stepper.
const Template:ComponentStory<typeof SearchFilters> = (args) => <SearchFilters {...args} />
export const dialogWithMaterialStepper =  Template.bind({});

