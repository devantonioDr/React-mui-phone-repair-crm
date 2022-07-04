import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ClientForm from "./clientForm";
import CostForm from "./costForm";
import {InsertRepair} from "./insertRepair";
import RepairForm from "./repairForm";

export default {
    title:'Components/Forms/InserReapir',
    component:InsertRepair
} as ComponentMeta<typeof InsertRepair>

// InsertDialog with material stepper.
const Template:ComponentStory<typeof InsertRepair> = (args) => <InsertRepair {...args} />
export const dialogWithMaterialStepper =  Template.bind({});

// // Repair Form.
const RepairFormTemplate:ComponentStory<typeof ClientForm> = (args) => <RepairForm {...args} />
export const repairForm =  RepairFormTemplate.bind({});

// // Client Form.
const ClientFormTemplate:ComponentStory<typeof ClientForm> = (args) => <ClientForm {...args} />
export const clientForm =  ClientFormTemplate.bind({});

// // Cost Form.
const CostFormTemplate:ComponentStory<typeof ClientForm> = (args) => <CostForm {...args} />
export const CostFormForm =  CostFormTemplate.bind({});
