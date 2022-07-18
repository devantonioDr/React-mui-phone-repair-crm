interface RepairStatus {
  _id: string;
  key: number;
  title: string;
  description: string;
}
[];

interface branchOffices {
  _id: string;
  name: string;
}

interface RepairData {
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
  };
  branchOffice: branchOffices;
  customer: {
    phoneNumber: null | string;
    email: null | string;
    adress: null | string;
    name: string;
  };
  payment: {
    estimatedCost: number | null;
    prePayment: number | null;
  };
  technician: {
    _id: string;
    name: string;
  } | null;
  _id: string;
  invoiceId: string;
  status: RepairStatus;
  admissionDate: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}
