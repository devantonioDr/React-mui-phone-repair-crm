import { FromHelpers } from "../helper/forms";


it('Makes sure FromHelpers.checkIfAllRequiredFieldsAreFilled works',()=>{

   let result = FromHelpers.checkIfAllRequiredFieldsAreFilled([]);

   expect(result).toBe(true);
});

export {}