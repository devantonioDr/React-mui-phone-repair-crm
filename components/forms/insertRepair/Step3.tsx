import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  EfficientFormContextProvider,
  EfficientFormState,
} from "../../../context/EfficientFormContextProvider";
import { notEmptyValidator, onlyLetters } from "../../../utils/formValidators";
import { FormInput, FormInputSelect } from "./UI/FormInput";
import { Form } from "./UI/Form";
import { StepperBackAndForth } from "./UI/StepperBackAndForth";

function Step3(props: any) {
  return (
    <Box sx={{ marginRight: "20px", mt: 2 }}>
      <EfficientFormContextProvider>
        <Form>
          <Grid container columns={12} spacing={2}>
            <Grid item xs={12}>
              <FormInput
                label="Número de folio"
                name="repair_id"
                validators={[notEmptyValidator]}
                validateAsTyping={true}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput
                label="Costo estimado (opcional)"
                name="repair_stimated_cost"
                validators={[]}
                validateAsTyping={true}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormInput
                label="Adelanto del cliente (opcional)"
                name="client_money_upfront"
                validators={[]}
                validateAsTyping={true}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormInputSelect
                label="Tecnico asignado (opcional)"
                name="repair_assigned_technician"
                defaultValue=""
                options={[
                  { value: "", desc: "" },
                  { value: "1", desc: "Technico 1" },
                  { value: "2", desc: "Tecnico 2" },
                ]}
              />
            </Grid>
          </Grid>
          <StepperBackAndForth />
        </Form>
      </EfficientFormContextProvider>
    </Box>
  );
}

export default Step3;
