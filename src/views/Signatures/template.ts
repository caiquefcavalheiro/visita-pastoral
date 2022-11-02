import dayjs from "dayjs";
import { BaptismRecordData } from "../BaptismRecord";
import { FieldArrayWithId } from "react-hook-form";
import { calibre } from "./fonts";

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

export const getTemplate = (
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
  } = data;

  const now = dayjs(new Date()).format("DD/MM/YYYY");

  const template = `
  <!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>

    
    @page {
      margin: 10px 30px;
    }

    ${calibre}

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
        border-collapse: collapse;
        font-family: auto;
      }

      body {
        margin-top: 20px;
        width: 100%;
        height: 4000px;
      }
      main {
        width: 100%;
        height: 4000px;
        border: 4px solid #000000;
      }
      .header {
        display: flex;
        height: 425px;
      }

      .header_img {
        width: 425px;
        border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
      }

      .header_principal {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .header_principal h1 {
        background-color: #555555;
        color: #ffffff;
        padding: 4px 0;
        border-bottom: 1px solid #000000;
        font-size: 75px;
        display: flex;
        height: 20%;
        align-items: center;
        justify-content: center;
        font-family: 'Calibre-regular';
      }

      .header_principal h3 {
        font-size: 35px;
        padding: 4px 0;
        text-align: center;
        border-bottom: 1px solid #000000;
        background-color: #55555540;
      }

      .header_div {
        display: flex;
        height: 27%;
        gap: 20px;
        border-bottom: 1px solid #000000;
        padding: 4px 0;
      }

      .header_div p {
        font-size: 20px;
        align-self: center;
      }
      .header_checkbox {
        width: 25%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;
      }

      .header_checkbox input,
      .header_aside input {
        width: 40px;
        height: 32px;
      }

      .header_checkbox h2 {
        font-size: 50px;
      }

      .header_aside {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .header_aside h4 {
        font-weight: normal;
        font-size: 24px;
      }

      .header_checkbox_options {
        display: flex;
        gap: 15px;
      }

      .header_checkbox_options input,
      .section_declaration_checkbox_container input {
        width: 24px;
        height: 16px;
      }

      .header_checkbox_options_position {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .header_container_checkbox_options {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 45%;
      }

      .section {
        display: flex;
        height: 800px;
      }

      .section_title {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        letter-spacing: 5px;
        background-color: #555555;
        color: #ffffff;
        text-align: center;
        padding: 10px 20px;
        font-size: 30px;
        border: 1px solid #ffffff;
      }

      .section_information {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .section_identification_line {
        display: flex;
        width: 100%;
        height: 25%;
      }

      .section_identification_line2 {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .section_field_name {
        width: 50%;
        margin-left: 10px;
        border-right: 1px solid #000000;
      }

      .section_field_name p {
        font-size: 40px;
        padding: 5px 10px;
        font-weight: 600;
      }

      .section_field_name span,
      .section_user_information_container span {
        font-size: 16px;
        font-weight: normal;
      }

      .section_field_name input {
        padding: 10px;
        border: none;
        font-size: 32px;
        width: 90%;
      }

      .section_second_field {
        border-top: 1px solid #000000;
        border-right: 1px solid #000000;
      }

      .section_field_align {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-top: 1px solid #000000;
        border-right: 1px solid #000000;
        gap: 10px;
        width: 10%;
      }

      .section_second_field input,
      .section_user_information_container input {
        padding: 21px 5px;
        margin: 5px;
        border: none;
        font-size: 24px;
        width: 90%;
      }

      .section_container_gender {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .section_container_gender div {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-right: 10px;
      }

      .section_container_gender label,
      .section_conversion_checkbox label {
        font-size: 24px;
      }

      .section_declaration_checkbox_container label {
        font-size: 24px;
        margin: 0 5px;
      }

      .section_field_align p,
      .section_second_field p,
      .section_conversion_container_checkbox p,
      .section_user_information_container p {
        font-size: 32px;
        padding: 0 10px;
        padding-top: 5px;
        font-weight: 600;
      }

      .section_second_field span,
      .section_conversion_container_checkbox span {
        font-size: 16px;
        font-weight: normal;
      }

      .section_identification_line3,
      .section_identification_line4,
      .section_identification_line5,
      .section_identification_line6,
      .section_conversion_container {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .section_conversion_aside,
      .section_conversion_container_checkbox {
        display: flex;
        flex-direction: column;
      }

      .section_conversion_aside {
        border-bottom: 1px solid #000000;
      }

      .section_conversion_input_container {
        display: flex;
        align-items: center;
      }

      .section_conversion_container_checkbox p {
        text-align: center;
      }

      .section_conversion_checkbox_container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
      }

      .section_conversion_checkbox {
        width: 48%;
        margin-left: 10px;
        margin-bottom: 10px;
      }

      .section_conversion_checkbox input {
        width: 24px;
        height: 16px;
      }

      .section_conversion_divide_container {
        border-top: 0.5px solid #000000;
        display: flex;
        height: 100%;
      }

      .section_conversion_input_container p {
        width: 100%;
      }

      .section_declaration_container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }

      .section_declaration_checkbox_container {
        display: flex;
        padding: 0 10px;
        width: 50%;
        border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
      }

      .section_declaration_checkbox_container:nth-child(2n) {
        border-right: none;
      }
      .section_declaration_checkbox {
        display: flex;
        gap: 10px;
        border-right: 1px dotted #000000;
        padding: 5px 8px;
      }

      .section_declaration_checkbox_container p {
        font-size: 24px;
        align-self: center;
        margin: 10px;
      }
      .section_term {
        width: 100%;
      }

      .section_term h3 {
        padding: 10px 5px;
        text-align: center;
        letter-spacing: 2px;
        border-top: 1px solid #000000;
        background-color: #55555540;
      }

      .section_user_information {
        display: flex;
      }

      .section_user_information_container {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        border-right: 1px solid #000000;
      }
      .section_user_information_container_title {
        height: 84px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .section_user_information_p {
        font-weight: normal;
        text-align: center;
      }

      #information {
        font-weight: normal;
        text-align: center;
      }

      .section_user_information_instructor {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        min-height: 93px;
        height: max-content;
        border-top: 1px solid #000000;
      }

      .section_user_information_instructor img {
        width: 100%;
        height: 78px;
        object-fit: contain;
      }

      #user_signature {
        height: 172px;
        width: 100%;
        padding: 5px 10px;
        object-fit: contain;
    }

      #fix_border {
        border-bottom: none;
      }

      .footer {
        margin-top: 20px;
      }

      .footer > p,
      .footer_last_text {
        font-size: 20px;
        letter-spacing: 0.5px;
      }
      .footer_last_text {
        border-right: 6px solid white;
      }

      .footer .section {
        border-top: 0.5px solid #000000;
      }

      .section_ceremony_principal_container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .section_ceremony_container {
        display: flex;
        height: 100%;
      }
      .section_ceremony_container .section_second_field {
        border-top: none;
        border-bottom: 1px solid #000000;
      }

      .section_ceremony_signature {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 660px;
        width: 500px;
    }

      .section_ceremony_signature img {
        width: 100%;
        height: 275px;
        object-fit: contain;
        padding: 5px 10px;
      }
      .section_ceremony_signature p {
        margin-top: 10px;
        width: 90%;
        margin: 10px auto 0 auto;
        border-top: 0.5px dashed #000000;
        font-size: 24px;
        text-align: center;
        padding: 3px 10px;
      }
    </style>
    <title>PDF</title>
  </head>
  <body>
    <main>
      <header>
        <div class="header">
          <img
            class="header_img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdMAAAGuCAYAAADLQuyyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAGYVSURBVHhe7b3XdxTZlu3dbz36rV/6z/nuGPf+B999+LrPOWWoKii8t8II4X3hvQcJ75EQCO8kQAjvvfdQUJxy3ad7f/ptZUCS2pkZmZGpjMiYc4w5zimkNMqI3HOvteZe659aYURRFEVRDMB//dd/Nf/2b/8miqIoimKe/Kf/83/+t/n3f///RFEURVHMkxJTURRFUQxIiakoiqIoBqTEVBRFURQDUmIqiqIoigEpMRVFURTFgJSYiqIoimJASkxFURRFMSAlpqIoiqIYkBJTURRFUQxIiakoiqIoBqTEVBRFURQDUmIqiqIoigEpMRVFURTFgJSYiqIoimJASkxFURRFMSAlpqIoiqIYkBJTURRFUQxIiakoiqIoBqTEVBRFURQDUmIqiqIoigEpMRVFURTFgJSYiqIoimJASkxFURRFMSAlpqIoiqIYkBJTURRFUQxIiakoiqIoBqTEVBRFURQDUmIqiqIoigEpMRVFURTFgJSYiqIoimJASkxFURRFMSAlpqIoiqIYkBJTURRFUQxIiakoiqIoBqTEVBRFURQDUmIqikXif/zHv1v+5S//Yf7617+Yv/3tr5/49ddfmW+//aYdv/uuk/n+++/NDz9k5vfff+d8PPzqq7998Vp/+ctf7HuArvcpimJwSkxFsQhERBG8bt26mh49upuKimFmxozpn7huXY2pq6szDQ0NX/DcuXPmyZMn5v3792n55s0bc/fuXXPw4MF2j9+zp87MmjXz0+uMHz/eDB482L4HiLi63q8oisEoMRXFHIlQEgEiToMHDzJjx44xCxcuNNXVa83+/fvNlSuXW3nFXL9+3dy8eaOVN634PX78+BNfvXpl3r17104of/31V/OPf/zDZML//M//mP/8z/9s91jIcz558vl1Hjx4YO7cuWPfA7x69ap9fydPnjTbt283NTU1raI7w0yYMN4MGNDfbgAkuKKYOyWmopiGiEqXLp2tyCCY8+bNMxs2bDC1tbXmwIH95tixY+bUqVPmwoULVrAQrw8fPiQkL9z4/fffrKATBV+/fs1cunTRNDU1mkOHiHb32b9x0aKFZurUKWbE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"
            alt=""
          />
          <div class="header_principal">
            <h1>FICHA DE REGISTRO DE CANDIDATO</h1>
            <h3>
              PRENCHA A FICHA COM A LETRA DE FORMA E NÃO DEIXE CAMPOS SEM
              RESPOSTA
            </h3>
            <div class="header_div">
              <div class="header_checkbox">
                <input type="checkbox" ${action === "Batismo" && "checked"} />
                <h2>Batismo</h2>
              </div>
              <div class="header_aside">
                <input type="checkbox"  ${specialVote && "checked"}  />
                <h4>
                  Voto Especial - Anexar a ficha de "Pedido de Batismo por Voto
                  Especial" aprovado pela Comissão Diretiva do Campo local.
                </h4>
              </div>
            </div>
            <div class="header_div">
              <div class="header_checkbox">
                <input type="checkbox" ${
                  action === "Rebatismo*" && "checked"
                } />
                <h2>Rebatismo*</h2>
              </div>
              <div class="header_container_checkbox_options">
                <p>
                  Foi consultada a igreja/grupo ou o pastor onde o/a canditato/a
                  foi removido/a ?
                </p>
                <div class="header_checkbox_options">
                  <div class="header_checkbox_options_position">
                    <p>S</p>
                    <input type="checkbox"  ${
                      theChurchWasConsulted === "Sim" && "checked"
                    } />
                  </div>
                  <div class="header_checkbox_options_position">
                    <p>N</p>
                    <input type="checkbox" ${
                      theChurchWasConsulted === "Não" && "checked"
                    } />
                  </div>
                </div>
              </div>
              <p>Data da remoção: ${removalDate}</p>
            </div>
            <div class="header_div">
              <div class="header_checkbox">
                <input type="checkbox" ${
                  action === "Profissão de fé*" && "checked"
                } />
                <h2>Profissão de fé*</h2>
              </div>
              <p style="width: 30%">Motivo: ${reason}</p>
              <p>Igreja/Grupo e localidade onde foi membro: ${churchWhereHeWasAmember}</p>
            </div>
          </div>
        </div>
      </header>
      <section class="section">
        <h3 class="section_title">IDENTIFICAÇÃO</h3>
        <div class="section_information">
          <div class="section_identification_line">
            <div class="section_field_name">
              <p>Nomes <span>(sem abreviações)</span></p>
              <input type="text" value="${name}" />
            </div>
            <div class="section_field_name" style="border-right: none">
              <p>Sobrenome <span>(sem abreviações)</span></p>
              <input type="text" value="${lastName}" />
            </div>
          </div>
          <div class="section_identification_line2">
            <div class="section_field_align">
              <p>Sexo</p>
              <div class="section_container_gender">
                <div>
                  <input type="checkbox" ${sex === "Masculino" && "checked"} />
                  <label>Masculino</label>
                </div>
                <div>
                  <input type="checkbox" ${sex === "Feminino" && "checked"} />
                  <label>Feminino</label>
                </div>
              </div>
            </div>
            <div class="section_second_field" style="width: 30%">
              <p>Data de nascimento</p>
              <input type="text" value="${birthDate}" />
            </div>
            <div
              class="section_second_field"
              style="width: 100%; border-right: none"
            >
              <p>Cidade, UF país de nascimento</p>
              <input type="text" value="${countryOfBirth}" />
            </div>
          </div>
          <div class="section_identification_line3">
            <div class="section_second_field" style="width: 50%">
              <p>Nome da mãe</p>
              <input type="text" value="${motherName}" />
            </div>
            <div
              class="section_second_field"
              style="width: 50%; border-right: none"
            >
              <p>Nome do pai</p>
              <input type="text" value="${fatherName}" />
            </div>
          </div>
          <div class="section_identification_line4">
            <div
              class="section_second_field"
              style="width: 100%; border-right: none"
            >
              <p>Endereço residencial completo</p>
              <input type="text" value="${fullResidentialAddress}" />
            </div>
          </div>
          <div class="section_identification_line5">
            <div class="section_second_field" style="width: 30%">
              <p>Bairro</p>
              <input type="text" value="${neighborhood}" />
            </div>
            <div class="section_second_field" style="width: 50%">
              <p>Cidade, UF, país da residência</p>
              <input
                type="text"
                value="${countryOfResidence}"
              />
            </div>
            <div
              class="section_second_field"
              style="width: 50%; border-right: none"
            >
              <p>CEP</p>
              <input type="text" value="${cep}" />
            </div>
          </div>
          <div class="section_identification_line6">
            <div class="section_second_field" style="width: 30%">
              <p>Telefone</p>
              <input type="text" value="${phone}" />
            </div>
            <div class="section_second_field" style="width: 40%">
              <p>Email</p>
              <input type="email" value="${email}" />
            </div>
            <div
              class="section_second_field"
              style="width: 30%; border-right: none"
            >
              <p>Doc. Identificação / Órgão Emissor / UF</p>
              <input
                type="text"
                value="${rg}"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <h3 class="section_title">CONVERSÃO</h3>
        <div class="section_conversion_container">
          <div
            class="section_conversion_aside"
            style="width: 70%; border-right: 0.5px solid #000000"
          >
            <div
              class="section_second_field"
              style="width: 100%; border-right: none; height: 288px"
            >
              <p>
                Instrutor/a bíblico/a
                <span>
                  (preencher o nome completo de até dois instrutores bíblicos)
                </span>
              </p>
              <div>
                <input
                  type="text"
                  value="1. ${firstBibleInstructor}"
                />
                <input
                  type="text"
                  value="2. ${secondBibleInstructor}"
                />
              </div>
            </div>
            <div class="section_conversion_divide_container">
              <div
                class="section_conversion_container_checkbox"
                style="border-right: 1px solid #000000"
              >
                <p>
                  Como você conheceu a IASD?
                  <br />
                  <span> (marque só uma opção) </span>
                </p>
                <div
                  class="section_conversion_checkbox_container"
                  style="height: 100%"
                >
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Acampamento/retiro" && "checked"
                    } />
                    <label>Acampamento/retiro</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Internet" && "checked"
                    }/>
                    <label>Internet</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "ADRA" && "checked"
                    }/>
                    <label>ADRA</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "ADRA" && "checked"
                    } />
                    <label>Livros/literatura</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Amigos/conhecidos" && "checked"
                    } />
                    <label>Amigos/conhecidos</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Missão Calebe" && "checked"
                    } />
                    <label>Missão Calebe</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Desbravadores/Avent" && "checked"
                    } />
                    <label>Desbravadores/Avent</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Mutirão de Natal" && "checked"
                    } />
                    <label>Mutirão de Natal</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Educação Adventista" && "checked"
                    } />
                    <label>Educação Adventista</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Pequeno Grupo" && "checked"
                    } />
                    <label>Pequeno Grupo</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Escola Sabatina" && "checked"
                    } />
                    <label>Escola Sabatina</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Quebrando o Silêncio" && "checked"
                    } />
                    <label>Quebrando o Silêncio</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Evangelismo público" && "checked"
                    } />
                    <label>Evangelismo público</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Rádio" && "checked"
                    } />
                    <label>Rádio</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Família/parentes" && "checked"
                    } />
                    <label>Família/parentes</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox"${howDidSDA === "TV" && "checked"}  />
                    <label>TV</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Instituição de saúde" && "checked"
                    }  />
                    <label>Instituição de saúde</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howDidSDA === "Outro" && "checked"
                    } />
                    <label>Outro</label>
                  </div>
                </div>
              </div>
              <div class="section_conversion_container_checkbox">
                <p>
                  Como você estudou a Bíblia?
                  <br />
                  <span> (marque só uma opção) </span>
                </p>
                <div
                  class="section_conversion_checkbox_container"
                  style="height: 100%"
                >
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica ASA" && "checked"
                    }/>
                    <label>Classe Bíblica ASA</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Estudo Bíblico individual" &&
                      "checked"
                    }/>
                    <label>Estudo Bíblico individual</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica Calebe/Jovens" &&
                      "checked"
                    }/>
                    <label>Classe Bíblica Calebe/Jovens</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Estudo Bíblico on-line" && "checked"
                    }/>
                    <label>Estudo Bíblico on-line</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica da igreja" &&
                      "checked"
                    }/>
                    <label>Classe Bíblica da igreja</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Evangelismo público" && "checked"
                    }/>
                    <label>Evangelismo público</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica Desbr/Avent" &&
                      "checked"
                    }/>
                    <label>Classe Bíblica Desbr/Avent</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Ouvi sermões na igreja" && "checked"
                    }/>
                    <label>Ouvi sermões na igreja</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica Educação" &&
                      "checked"
                    }/>
                    <label>Classe Bíblica Educação</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Pequeno Grupo" && "checked"
                    }/>
                    <label>Pequeno Grupo</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Classe Bíblica ES" && "checked"
                    }/>
                    <label>Classe Bíblica ES</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Estudei pouco a Bíblia" && "checked"
                    }/>
                    <label>Estudei pouco a Bíblia</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Escola Bíblica Novo Tempo" &&
                      "checked"
                    }/>
                    <label>Escola Bíblica Novo Tempo</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Não estudei a Bíblia" && "checked"
                    }/>
                    <label>Não estudei a Bíblia</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Escola Cristã de Férias" &&
                      "checked"
                    }/>
                    <label>Escola Cristã de Férias</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" ${
                      howYouStudyBible === "Outro" && "checked"
                    }/>
                    <label>Outro</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section_conversion_aside" style="width: 30%">
            <div class="section_second_field" style="border-right: none">
              <p>Estado Civil</p>
              <div class="section_conversion_checkbox_container">
                <div class="section_conversion_checkbox" style="width: 30%">
                  <input type="checkbox" ${
                    maritalStatus === "Solteiro" && "checked"
                  } />
                  <label>Solteiro</label>
                </div>
                <div class="section_conversion_checkbox" style="width: 30%">
                  <input type="checkbox" ${
                    maritalStatus === "Divorciado" && "checked"
                  }  />
                  <label>Divorciado</label>
                </div>
                <div class="section_conversion_checkbox" style="width: 30%">
                  <input type="checkbox" ${
                    maritalStatus === "Viúvo" && "checked"
                  } />
                  <label>Viúvo</label>
                </div>
                <div class="section_conversion_checkbox" style="width: 30%">
                  <input type="checkbox" ${
                    maritalStatus === "Casado" && "checked"
                  }  />
                  <label>Casado</label>
                </div>
                <div class="section_conversion_checkbox" style="width: 30%">
                  <input type="checkbox" ${
                    maritalStatus === "Outro" && "checked"
                  }/>
                  <label>Outro</label>
                </div>
              </div>
              <div class="section_conversion_input_container">
                <p>Data casamento civil:</p>
                <input type="text" value="${civilMarriageDate}" />
              </div>
            </div>
            <div
              class="section_second_field"
              style="border-bottom: 0.5px solid #000000; border-right: none"
            >
              <p>religião anterior</p>
              <input type="text" value="${previousReligion}" />
            </div>
            <div class="section_conversion_container_checkbox">
              <p style="font-size: 24px;" >
                Qual foi o fator decisivo para você ser batizado/a?
                <br />
                <span> (marque só uma opção) </span>
              </p>
              <div
                class="section_conversion_checkbox_container"
                style="height: 100%"
              >
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Amigos" && "checked"
                  } />
                  <label>Amigos</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Missão Calebe" && "checked"
                  } />
                  <label>Missão Calebe</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Convicção pessoal" && "checked"
                  } />
                  <label>Convicção pessoal</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Pequeno Grupo" && "checked"
                  } />
                  <label>Pequeno Grupo</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Desbravadores/Avent" && "checked"
                  } />
                  <label>Desbravadores/Avent</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Programa Reencontro" && "checked"
                  } />
                  <label>Programa Reencontro</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Educação Adventista" && "checked"
                  } />
                  <label>Educação Adventista</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Rádio" && "checked"
                  } />
                  <label>Rádio</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Escola Sabatina" && "checked"
                  } />
                  <label>Escola Sabatina</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Semana de Oração" && "checked"
                  } />
                  <label>Semana de Oração</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Evangelismo público" && "checked"
                  } />
                  <label>Evangelismo público</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "TV" && "checked"
                  } />
                  <label>TV</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Família/parentes" && "checked"
                  } />
                  <label>Família/parentes</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Outro" && "checked"
                  } />
                  <label>Outro</label>
                </div>
                <div class="section_conversion_checkbox">
                  <input type="checkbox" ${
                    decidingBaptized === "Internet" && "checked"
                  } />
                  <label>Internet</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <h3 class="section_title">DECLARAÇÃO DE FÉ</h3>
        <div class="section_declaration_container">
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration0 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration0 === "Não" && "checked"} />
              </div>
            </div>
            <p>1. Aceita a Bíblia toda como a inspirada Palavra de Deus?</p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration1 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration1 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              2. Aceita o ensino bíblico da trindade de que Deus é uma unidade
              de três pessoas coeternas: Pai, Filho e Espírito Santo?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration2 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration2 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              3. Aceita a morte de Jesus Cristo como o sacrifício que perdoa e
              apaga os pecados, e acredita que é salvo pela graça, mediante a
              fé?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration3 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration3 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              4. Aceita Jesus Cristo como o seu único Salvador pessoal e o
              Senhor da sua vida?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration4 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration4 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              5. Decide deixar tudo o que prejudica a sua saúde e a de outras
              pessoas, evitando o consumo de alimentos impróprios, o uso, a
              fabricação e a comercialização de bebidas alcoólicas, tabaco,
              café, drogas ilícitas, porque reconhece que o corpo é o templo do
              Espírito Santo?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration5 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration5 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              6. Aceita pôr em prática todas as crenças e princípios bíblicos
              fundamentais, incluindo a modéstia cristã no vestir-se, no uso de
              adornos e na aparência pessoal, abstendo-se de frequentar lugares
              impróprios, assim como ensina a Igreja Adventista do Sétimo Dia?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration6 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration6 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              7. Aceita devolver fiel e voluntariamente o dízimo e a oferta, de
              acordo com o ensinamento bíblico?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration7 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration7 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              8. Decide obedecer a todos os mandamentos de Deus, inclusive o do
              sábado?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration8 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration8 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              9. Crê e aceita que a Igreja Adventista do Sétimo Dia é a igreja
              remanescente dos últimos dias de acordo com a profecia bíblica, e
              deseja ser aceito como membro da congregação local da Igreja
              Adventista mundial?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${declaration9 === "Sim" && "checked"} />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${declaration9 === "Não" && "checked"} />
              </div>
            </div>
            <p>
              10. Aceita o ensinamento bíblico dos dons espirituais e crê que o
              dom de profecia manifesto no ministério de Ellen G. White é uma
              característica distintiva da igreja remanescente?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${
                  declaration10 === "Sim" && "checked"
                } />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${
                  declaration10 === "Não" && "checked"
                } />
              </div>
            </div>
            <p>
              11. Aceita o ensinamento bíblico do batismo por imersão e
              voluntariamente decide ser batizado?
            </p>
          </div>
          <div class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${
                  declaration11 === "Sim" && "checked"
                } />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${
                  declaration11 === "Não" && "checked"
                } />
              </div>
            </div>
            <p>
              12. Aceita que Jesus Cristo é o seu intercessor no Santuário
              Celestial e que Ele lhe oferece Sua graça e Seu poder para viver
              uma vida centrada Nele?
            </p>
          </div>
          <div id="fix_border" class="section_declaration_checkbox_container">
            <div class="section_declaration_checkbox">
              <div class="header_checkbox_options_position">
                <p>S</p>
                <input type="checkbox" ${
                  declaration12 === "Sim" && "checked"
                } />
              </div>
              <div class="header_checkbox_options_position">
                <p>N</p>
                <input type="checkbox" ${
                  declaration12 === "Não" && "checked"
                } />
              </div>
            </div>
            <div>
              <p>
                13. Aceita preparar-se como discípulo e se dispõe a discipular
                pessoas para a breve vinda do nosso Senhor Jesus Cristo,
                participando ativamente da pregação do evangelho?
              </p>
              <div class="section_second_field" style="border: none">
                <label>Quem discipularei:</label>
                <input type="text" value="${whoWillIDisciple}" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" style="height: auto">
        <div class="section_term">
          <h3>
            CREIO E ACEITO AS CRENÇAS FUNDAMENTAIS, NORMAS E PRINCÍPIOS DA
            IGREJA ADVENTISTA DO SÉTIMO DIA, INCLUSIVE A DISCIPLINA
            ECLESIÁSTICA, EXPRESSOS NO “MANUAL DA IGREJA”, E DESEJO SER MEMBRO
            DESTA CONGREGAÇÃO LOCAL DA IGREJA ADVENTISTA MUNDIAL.
          </h3>
          <h3>
            COM A MINHA ASSINATURA DOU CONSENTIMENTO EXPRESSO PARA QUE A IGREJA
            ADVENTISTA DO SÉTIMO DIA TRATE MEUS DADOS PESSOAIS DE ACORDO COM A
            LEI, ESPECIFICAMENTE NO CUMPRIMENTO DE SUAS FINALIDADES
            INSTITUCIONAIS. A POLÍTICA DE PRIVACIDADE ESTÁ PUBLICADA NO SITE:
            <a href=" http://adv.st/privacidade" target="_blank"
              >Adv Privacidade</a
            >
          </h3>
          <div class="section_user_information">
            <div class="section_user_information_container">
              <p>
                Menor de 16 anos
                <span>(até dois responsáves, se necessário) </span>
              </p>
              <p id="information">Nome do responsável</p>
              <div>
                <div class="section_user_information_instructor">
                  <label>1.</label>
                  <input type="text" value="${motherName}" />
                </div>
                <div class="section_user_information_instructor">
                  <label>2.</label>
                  <input type="text" value="${fatherName}" />
                </div>
              </div>
            </div>
            <div class="section_user_information_container">
              <div class="section_user_information_container_title">
                <p id="information">Doc. Identificação / Órgão Emissor / UF</p>
              </div>
              <div>
                <div class="section_user_information_instructor">
                  <label>1.</label>
                  <input type="text" value="" />
                </div>
                <div class="section_user_information_instructor">
                  <label>2.</label>
                  <input type="text" value="" />
                </div>
              </div>
            </div>
            <div class="section_user_information_container">
              <div class="section_user_information_container_title">
                <p id="information">Assinatura do responsável</p>
              </div>
              <div>
                <div class="section_user_information_instructor">
                  <img
                  src="${fatherSignature?.signature}"
                  alt=""
                  />
                </div>
                <div class="section_user_information_instructor">
                  <img
                  src="${motherSignature?.signature}"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              class="section_user_information_container"
              style="border-right: none"
            >
              <div class="section_user_information_container_title">
                <p id="information">Assinatura do candidato/a</p>
              </div>
              <div style="height: 186px;border-top: 1px solid #000000">
                <img
                  id="user_signature"
                  src="${candidateSignature?.signature}"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer">
        <p>
          Preencher a parte abaixo depois de o/a candidato/a ter sido recebido/a
          como membro pela igreja/grupo organizado. Esta ficha só será válida
          com as três assinaturas: candidato/a, pastor oficiante e secretário/a
          da igreja/grupo organizado onde será membro.
        </p>
        <section class="section" style="height: 100%">
          <h3 class="section_title">CERIMÔNIA</h3>
          <div class="section_ceremony_principal_container">
            <div class="section_ceremony_container">
              <div class="section_second_field" style="width: 30%">
                <p>Data da cerimônia</p>
                <input type="text" value="${now}" />
              </div>
              <div class="section_second_field" style="width: 70%">
                <p>Local, cidade/UF da cerimônia</p>
                <input type="text" value="${ceremonyLocation}" />
              </div>
            </div>
            <div class="section_ceremony_container">
              <div class="section_second_field" style="width: 100%">
                <p>Nome completo do pastor oficiante</p>
                <input type="text" value="${fullNameOfficiatingPastor}" />
              </div>
            </div>
            <div class="section_ceremony_container">
              <div class="section_second_field" style="width: 40%">
                <p>Nome da igreja/grupo que o/a recebeu como membro</p>
                <input
                  type="text"
                  value="${nameTheChurch}"
                />
              </div>
              <div class="section_second_field" style="width: 60%">
                <p>Cidade/UF da igreja/grupo organizado</p>
                <input
                  type="text"
                  value="${cityChurchOrganizedGroup}"
                />
              </div>
            </div>
            <div class="section_ceremony_container">
              <div class="section_second_field" style="width: 40%">
                <p>Data e voto da Reunião Regular/Administrativa</p>
                <input
                  type="text"
                  value="${dateAndCoteTheAdministrativeMeeting}"
                />
              </div>
              <div class="section_second_field" style="width: 60%">
                <p>Nome secretário/a da igreja/grupo organizado</p>
                <input
                  type="text"
                  value="${nameSecretaryOrganizedGroup}"
                />
              </div>
            </div>
          </div>
          <div class="section_ceremony_signature">
            <img src="${pastorSignature?.signature}" alt="" />
            <div style="border-bottom: 0.5px solid #000000">
              <p>Assinatura pastor oficiante</p>
            </div>
            <img src="${secretaryOrResponsibleGroup?.signature}" alt="" />
            <div style="border-bottom: 0.5px solid #000000">
              <p>Assinatura secretário/a da igreja/grupo organizado</p>
            </div>
          </div>
        </section>
        <p class="footer_last_text">
          Esta via deve ser destruída pela Secretaria do Campo ao finalizar o
          ano corrente, confirmando primeiro se os dados do membro e a cópia
          desta ficha digitalizada foram inseridos corretamente no ACMS.
        </p>
      </footer>
    </main>
  </body>
</html>
  `;

  return template;
};
