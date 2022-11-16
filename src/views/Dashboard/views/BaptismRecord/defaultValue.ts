import { FieldArrayWithId } from "react-hook-form";
import { BaptismRecordData } from ".";

export type Signature =
  | FieldArrayWithId<
      {
        signatures: {
          signature: string;
          currentUserName: string | null;
        }[];
      },
      "signatures",
      "id"
    >
  | undefined;

export const defaultValues: BaptismRecordData = {
  action: "",
  birthDate: "",
  cep: "",
  churchWhereHeWasAmember: "",
  civilMarriageDate: "",
  countryOfBirth: "",
  decidingBaptized: "",
  declaration0: "",
  declaration1: "",
  declaration10: "",
  declaration11: "",
  declaration12: "",
  declaration2: "",
  declaration3: "",
  declaration4: "",
  declaration5: "",
  declaration6: "",
  declaration7: "",
  declaration8: "",
  declaration9: "",
  email: "",
  firstBibleInstructor: "",
  howDidSDA: "",
  howYouStudyBible: "",
  lastName: "",
  maritalStatus: "",
  name: "",
  otherDecidingBaptized: "",
  otherHowDidSDA: "",
  otherHowYouStudyBible: "",
  phone: "",
  previousReligion: "",
  reason: "",
  removalDate: "",
  rg: "",
  secondBibleInstructor: "",
  sex: "",
  specialVote: false,
  theChurchWasConsulted: "",
  motherName: "",
  fatherName: "",
  fullResidentialAddress: "",
  neighborhood: "",
  countryOfResidence: "",
  ceremonyLocation: "",
  cityChurchOrganizedGroup: "",
  dateAndCoteTheAdministrativeMeeting: "",
  fullNameOfficiatingPastor: "",
  nameSecretaryOrganizedGroup: "",
  nameTheChurch: "",
  whoWillIDisciple: "",
  motherIdentificationDoc: "",
  fatherIdentificationDoc: "",
};
