export type TemplateMode = "normal" | "stacked";

export interface RepairData {
    device: {
        blocking: {
            hasBlocking: boolean;
            patreon: never[];
        };
        trademark: string;
        model: string;
        color: string;
        canStart: boolean;
        beforeRepaired: boolean;
        presentsMoisture: boolean;
        reasonForAdmission: string;
        state?: string;
    }
    branchOffice: {
        _id: string;
        name: string;
    }
    customer: {
        phoneNumber: null|string;
        email: null|string;
        adress: null|string;
        name: string;
    }
    payment: {
        estimatedCost: number|null;
        prePayment:number|null;
    }
    technician: {
        _id: string;
        name: string;
    }
    _id: string;
    invoiceId: string;
    status: {
        _id: string;
        key: number;
        title: string;
        description: string;
    }
    admissionDate: string;
    createdBy: {
        _id: string;
        name: string;
        email: string;
    }
    
}