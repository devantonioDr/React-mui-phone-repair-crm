
export const RepairStatusData:RepairStatus[] = [
    {
        _id: "609d3ab2438465e51b01d619",
        key: 100,
        title: "Pendiente",
        description:
            "Este status indica que la reparación ha sido recibida por el taller, sin embargo está en espera de ser atendida.",
    },
    {
        _id: "609d3bc0e5484c220c45adfd",
        key: 200,
        title: "En proceso",
        description: "La reparación está siendo atendida por el técnico.",
    },
    {
        _id: "609d3beee5484c220c45adfe",
        key: 300,
        title: "Terminada",
        description:
            "La reparación ha sido terminada y puede ser entregada al cliente.",
    },
    {
        _id: "61675950c54da27a39a6dae3",
        key: 310,
        title: "En sucursal",
        description:
            "Este estado indica que la reparación ha sido terminada y se encuentra en la sucursal en la que el cliente la solicitó.",
    },
    {
        _id: "609d3c45e5484c220c45adff",
        key: 400,
        title: "Entregada al cliente",
        description:
            "La reparación con este status ya no se encuentra en las instalaciones del negocio, sino en las manos del cliente",
    },
];
