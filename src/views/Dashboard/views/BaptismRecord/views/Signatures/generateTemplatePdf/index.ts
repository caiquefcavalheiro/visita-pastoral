import * as FileSystem from "expo-file-system";
import { FieldArrayWithId } from "react-hook-form";
import { BaptismRecordData } from "../../..";
import { shareAsync } from "expo-sharing";
import { degrees, PDFDocument } from "pdf-lib";
import { ficha } from "./ficha";
import { drawImage } from "./utils";
import {
  brp,
  howDidYouFindOutAboutTheIASD,
  howDidYouStudyTheBible,
  maritalStatusOpt,
  sexOpt,
  theChurchOrPastorWhereTheCandidateWasRemovedWasConsulted,
  whatWasTheDecisiveFactorForYouToBeBaptized,
} from "./sessions";
import { checked } from "./checkedImg";

type Signature =
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

export const generateTemplatePdf = async (
  data: BaptismRecordData & {
    pastorSignature: Signature;
    motherSignature: Signature;
    candidateSignature: Signature;
    fatherSignature: Signature;
    secretaryOrResponsibleGroup: Signature;
  }
) => {
  const {
    candidateSignature,
    fatherSignature,
    motherSignature,
    pastorSignature,
    secretaryOrResponsibleGroup,
    action,
    birthDate,
    cep,
    churchWhereHeWasAmember,
    civilMarriageDate,
    countryOfBirth,
    decidingBaptized,
    declaration0,
    declaration1,
    declaration10,
    declaration11,
    declaration12,
    declaration2,
    declaration3,
    declaration4,
    declaration5,
    declaration6,
    declaration7,
    declaration8,
    declaration9,
    email,
    firstBibleInstructor,
    howDidSDA,
    howYouStudyBible,
    lastName,
    maritalStatus,
    name,
    otherDecidingBaptized,
    otherHowDidSDA,
    otherHowYouStudyBible,
    phone,
    previousReligion,
    reason,
    removalDate,
    rg,
    secondBibleInstructor,
    sex,
    specialVote,
    theChurchWasConsulted,
    motherName,
    fatherName,
    fullResidentialAddress,
    neighborhood,
    countryOfResidence,
    ceremonyLocation,
    cityChurchOrganizedGroup,
    dateAndCoteTheAdministrativeMeeting,
    fullNameOfficiatingPastor,
    nameSecretaryOrganizedGroup,
    nameTheChurch,
    whoWillIDisciple,
    fatherIdentificationDoc,
    motherIdentificationDoc,
    ceremonyDate,
  } = data;

  const declarations = [
    { x: 43, y: 391, declaration: declaration0 },
    { x: 43, y: 373.5, declaration: declaration1 },
    { x: 43, y: 350, declaration: declaration2 },
    { x: 43, y: 327.5, declaration: declaration3 },
    { x: 43, y: 299, declaration: declaration4 },
    { x: 43, y: 263.5, declaration: declaration5 },
    { x: 295.5, y: 391, declaration: declaration6 },
    { x: 295.5, y: 374, declaration: declaration7 },
    { x: 295.5, y: 350.7, declaration: declaration8 },
    { x: 295.5, y: 327.3, declaration: declaration9 },
    { x: 295.5, y: 308.7, declaration: declaration10 },
    { x: 295.5, y: 291, declaration: declaration11 },
    { x: 295.5, y: 263.3, declaration: declaration12 },
  ];

  const pdfDoc = await PDFDocument.load(ficha);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const optionsBrp = brp?.[action];

  optionsBrp &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionsBrp,
    });

  const optionTheChurchOrPastorWhereTheCandidateWasRemovedWasConsulted =
    theChurchOrPastorWhereTheCandidateWasRemovedWasConsulted?.[
      theChurchWasConsulted
    ];

  optionTheChurchOrPastorWhereTheCandidateWasRemovedWasConsulted &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionTheChurchOrPastorWhereTheCandidateWasRemovedWasConsulted,
    });

  const optionSex = sexOpt?.[sex];

  optionSex &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionSex,
    });

  const optionMaritalStatus = maritalStatusOpt?.[maritalStatus];

  optionMaritalStatus &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionMaritalStatus,
    });
  const optionHowDidYouFindOutAboutTheIASD =
    howDidYouFindOutAboutTheIASD?.[howDidSDA];

  optionHowDidYouFindOutAboutTheIASD &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionHowDidYouFindOutAboutTheIASD,
    });

  otherHowDidSDA &&
    firstPage.drawText(`: ${otherHowDidSDA}`, {
      x: 153.8,
      y: 414.5,
      size: 5,
    });

  const optionHowDidYouStudyTheBible =
    howDidYouStudyTheBible?.[howYouStudyBible];

  optionHowDidYouStudyTheBible &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionHowDidYouStudyTheBible,
    });

  otherHowYouStudyBible &&
    firstPage.drawText(`: ${otherHowYouStudyBible}`, {
      x: 343,
      y: 427,
      size: 5,
    });

  const optionWhatWasTheDecisiveFactorForYouToBeBaptized =
    whatWasTheDecisiveFactorForYouToBeBaptized?.[decidingBaptized];

  optionWhatWasTheDecisiveFactorForYouToBeBaptized &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: optionWhatWasTheDecisiveFactorForYouToBeBaptized,
    });

  otherDecidingBaptized &&
    firstPage.drawText(`: ${otherDecidingBaptized} `, {
      x: 527,
      y: 416.5,
      size: 5,
    });

  declarations.forEach(({ declaration, x, y }) => {
    if (declaration) {
      drawImage({
        img: checked,
        page: firstPage,
        pdfDoc,
        options: {
          x: declaration === "Sim" ? x : x + 9,
          y,
          height: 2.5,
          width: 3.5,
        },
      });
    }
  });

  specialVote &&
    drawImage({
      img: checked,
      page: firstPage,
      pdfDoc,
      options: {
        x: 214.7,
        y: 762,
        height: 7,
        width: 8,
      },
    });

  firstPage.drawText(removalDate, {
    x: 498,
    y: 747.1,
    size: 6.3,
  });

  firstPage.drawText(reason, {
    x: 233,
    y: 729.3,
    size: 6.3,
  });

  firstPage.drawText(churchWhereHeWasAmember, {
    x: 440,
    y: 730.5,
    size: 6.3,
  });

  firstPage.drawText(name, {
    x: 40,
    y: 700,
    size: 9,
  });

  firstPage.drawText(lastName, {
    x: 332,
    y: 700,
    size: 9,
  });

  firstPage.drawText(birthDate, {
    x: 128,
    y: 671,
    size: 8,
  });

  firstPage.drawText(countryOfBirth, {
    x: 218,
    y: 671,
    size: 8,
  });

  drawImage({
    img: candidateSignature?.signature,
    page: firstPage,
    pdfDoc,
    options: {
      x: 466,
      y: 195,
      rotate: degrees(-90),
    },
    scale: 0.11,
  });

  drawImage({
    img: motherSignature?.signature,
    page: firstPage,
    pdfDoc,
    options: {
      x: 200,
      y: 195,
      rotate: degrees(-90),
    },
    scale: 0.11,
  });

  drawImage({
    img: fatherSignature?.signature,
    page: firstPage,
    pdfDoc,
    options: {
      x: 321,
      y: 195,
      rotate: degrees(-90),
    },
    scale: 0.11,
  });

  firstPage.drawText(motherName, {
    x: 40,
    y: 650,
    size: 8,
  });

  firstPage.drawText(fatherName, {
    x: 352,
    y: 650,
    size: 8,
  });

  firstPage.drawText(fullResidentialAddress, {
    x: 40,
    y: 627,
    size: 8,
  });

  firstPage.drawText(neighborhood, {
    x: 40,
    y: 603,
    size: 8,
  });

  firstPage.drawText(countryOfResidence, {
    x: 149,
    y: 603,
    size: 8,
  });

  firstPage.drawText(cep, {
    x: 502,
    y: 603,
    size: 8,
  });

  firstPage.drawText(phone, {
    x: 40,
    y: 580,
    size: 8,
  });

  firstPage.drawText(email, {
    x: 164,
    y: 580,
    size: 8,
  });

  firstPage.drawText(rg, {
    x: 448,
    y: 580,
    size: 8,
  });

  firstPage.drawText(firstBibleInstructor, {
    x: 45,
    y: 550,
    size: 7,
  });

  firstPage.drawText(secondBibleInstructor, {
    x: 227,
    y: 550,
    size: 7,
  });

  firstPage.drawText(civilMarriageDate, {
    x: 483,
    y: 536.5,
    size: 6,
  });
  firstPage.drawText(previousReligion, {
    x: 409,
    y: 512,
    size: 8,
  });

  firstPage.drawText(whoWillIDisciple, {
    x: 367,
    y: 254,
    size: 7,
  });

  firstPage.drawText(motherName, {
    x: 23,
    y: 195,
    size: 8,
  });

  firstPage.drawText(motherIdentificationDoc, {
    x: 105,
    y: 183,
    size: 8,
  });

  firstPage.drawText(fatherName, {
    x: 23,
    y: 171,
    size: 8,
  });

  firstPage.drawText(fatherIdentificationDoc, {
    x: 105,
    y: 159,
    size: 8,
  });

  firstPage.drawText(ceremonyDate, {
    x: 40,
    y: 115,
    size: 9,
  });

  firstPage.drawText(ceremonyLocation, {
    x: 129,
    y: 115,
    size: 9,
  });

  firstPage.drawText(fullNameOfficiatingPastor, {
    x: 40,
    y: 90,
    size: 9,
  });

  firstPage.drawText(nameTheChurch, {
    x: 40,
    y: 62,
    size: 9,
  });

  firstPage.drawText(cityChurchOrganizedGroup, {
    x: 205,
    y: 62,
    size: 9,
  });

  firstPage.drawText(nameSecretaryOrganizedGroup, {
    x: 205,
    y: 35,
    size: 9,
  });

  firstPage.drawText(dateAndCoteTheAdministrativeMeeting, {
    x: 40,
    y: 35,
    size: 9,
  });

  drawImage({
    img: pastorSignature?.signature,
    page: firstPage,
    pdfDoc,
    options: {
      x: 466,
      y: 135,
      rotate: degrees(-90),
    },
    scale: 0.115,
  });

  drawImage({
    img: secretaryOrResponsibleGroup?.signature,
    page: firstPage,
    pdfDoc,
    options: {
      x: 466,
      y: 80,
      rotate: degrees(-90),
    },
    scale: 0.115,
  });

  const pdfBytes = await pdfDoc.saveAsBase64();

  let filename = "ficha-batismo.pdf";
  let filepath = `${FileSystem.documentDirectory}/${filename}`;
  await FileSystem.writeAsStringAsync(filepath, pdfBytes, {
    encoding: "base64",
  });
  await shareAsync(filepath, {
    UTI: ".pdf",
    mimeType: "application/pdf",
  });
};
