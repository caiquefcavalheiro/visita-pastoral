export const getTemplate = (data: any) => {
  const { fields } = data;

  const pastorSignature = fields?.find(
    (field: any) => field?.currentUserName === "pastor"
  );

  const secretaryOrResponsibleGroup = fields.find(
    (field: any) => field?.currentUserName === "secretária ou grupo responsável"
  );

  const candidateSignature = fields.find(
    (field: any) => field?.currentUserName === "candidato"
  );

  const template = `<!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="./style.css" />
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          list-style: none;
          border-collapse: collapse;
        }
  
        body {
          width: 2480px;
          margin: 0 auto;
        }
        main {
          width: 2480px;
          /* height: 3508px; */
          border: 2px solid #000000;
        }
        .header {
          display: flex;
        }
  
        .header_img {
          width: 250px;
          border: 1px solid #000000;
        }
  
        .header_principal {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
  
        .header_principal h1 {
          background-color: #555555;
          color: #ffffff;
          text-align: center;
          padding: 4px 0;
          border: 1px solid #000000;
          font-size: 40px;
        }
  
        .header_principal h3 {
          padding: 4px 0;
          text-align: center;
          border: 1px solid #000000;
          background-color: #55555540;
        }
  
        .header_div {
          display: flex;
          height: 80px;
          gap: 20px;
          border-bottom: 1px solid #000000;
          padding: 4px 0;
        }
  
        .header_div p {
          align-self: center;
        }
        .header_checkbox {
          width: 10%;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 10px;
        }
  
        .header_checkbox input {
          width: 30px;
          height: 24px;
        }
  
        .header_aside {
          display: flex;
          gap: 10px;
          align-items: center;
        }
  
        .header_aside h4 {
          font-weight: normal;
        }
  
        .header_aside input {
          width: 30px;
          height: 24px;
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
        }
  
        .section {
          display: flex;
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
          height: 20%;
        }
  
        .section_field_name {
          width: 50%;
          border-right: 1px solid #000000;
        }
  
        .section_field_name p {
          font-size: 24px;
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
          border-bottom: 1px solid #000000;
          border-right: 1px solid #000000;
          gap: 10px;
          width: 10%;
        }
  
        .section_second_field input,
        .section_user_information_container input {
          padding: 10px;
          border: none;
          font-size: 19.2px;
          width: 90%;
        }
  
        .section_container_gender {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
  
        .section_container_gender label,
        .section_conversion_checkbox label,
        .section_declaration_checkbox_container label {
          font-size: 19.2px;
        }
  
        .section_field_align p,
        .section_second_field p,
        .section_conversion_container_checkbox p,
        .section_user_information_container p {
          font-size: 20.8px;
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
        }
  
        .section_conversion_aside,
        .section_conversion_container_checkbox {
          display: flex;
          flex-direction: column;
        }
  
        .section_conversion_aside {
          border-right: 1px solid #000000;
          border-bottom: 1px solid #000000;
        }
  
        .section_conversion_input_container {
          display: flex;
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
          gap: 10px;
          padding: 0 10px;
          width: 50%;
          border-right: 1px solid #000000;
          border-bottom: 1px solid #000000;
        }
        .section_declaration_checkbox {
          display: flex;
          gap: 10px;
          border-right: 1px dotted #000000;
          padding: 5px 8px;
        }
  
        .section_declaration_checkbox_container p {
          font-size: 19.2px;
          align-self: center;
          padding: 5px 0;
        }
        .section_term {
          width: 100%;
        }
  
        .section_term h3 {
          padding: 10px 5px;
          text-align: center;
          letter-spacing: 2px;
          border-top: 1px solid #000000;
          border-right: 1px solid #000000;
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
  
        .section_user_information_p {
          font-weight: normal;
          text-align: center;
        }
  
        #information {
          font-weight: normal;
          text-align: center;
        }
  
        .section_conversion_internal_container {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #000000;
        }
  
        .section_user_information_instructor {
          display: flex;
          align-items: center;
          padding: 5px 10px;
          border-top: 1px solid #000000;
        }
  
        .section_user_information_instructor img {
          height: 42px;
        }
  
        #user_signature {
          height: 96px;
        }
  
        #fix_border {
          border-bottom: none;
        }
  
        .footer {
          width: 2480px;
          margin-top: 20px;
        }
  
        .footer > p,
        .footer_last_text {
          font-size: 19.2px;
          letter-spacing: 1px;
        }
  
        .footer .section {
          border: 4px solid #000000;
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
          height: 100%;
        }
  
        .section_ceremony_signature img {
          height: 170px;
          padding: 5px 10px;
        }
        .section_ceremony_signature p {
          margin-top: 10px;
          border-top: 1px solid #000000;
          font-size: 19.2px;
          text-align: center;
          padding: 5px 10px;
        }
      </style>
      <title>PDF</title>
    </head>
    <body>
      <main>
        <header>
          <div class="header">
            <img class="header_img" src="" alt="" />
            <div class="header_principal">
              <h1>FICHA DE REGISTRO DE CANDIDATO</h1>
              <h3>
                PRENCHA A FICHA COM A LETRA DE FORMA E NÃO DEIXE CAMPOS SEM
                RESPOSTA
              </h3>
              <div class="header_div">
                <div class="header_checkbox">
                  <input type="checkbox" />
                  <h2>Batismo</h2>
                </div>
                <div class="header_aside">
                  <input type="checkbox" />
                  <h4>
                    Voto Especial - Anexar a ficha de "Pedido de Batismo por Voto
                    Especial" aprovado pela Comissão Diretiva do Campo local.
                  </h4>
                </div>
              </div>
              <div class="header_div">
                <div class="header_checkbox">
                  <input type="checkbox" />
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
                      <input type="checkbox" />
                    </div>
                    <div class="header_checkbox_options_position">
                      <p>N</p>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
                <p>Data da remoção:</p>
              </div>
              <div class="header_div">
                <div class="header_checkbox">
                  <input type="checkbox" />
                  <h2>Profissão de fé*</h2>
                </div>
                <p>Motivo:</p>
                <p>Igreja/Grupo e localidade onde foi membro:</p>
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
                <input type="text" value="Nome do usuário" />
              </div>
              <div class="section_field_name">
                <p>Sobrenome <span>(sem abreviações)</span></p>
                <input type="text" value="Sobrenome do usuário" />
              </div>
            </div>
            <div class="section_identification_line2">
              <div class="section_field_align">
                <p>Sexo</p>
                <div class="section_container_gender">
                  <div>
                    <input type="checkbox" />
                    <label>Masculino</label>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <label>Feminino</label>
                  </div>
                </div>
              </div>
              <div class="section_second_field" style="width: 30%">
                <p>Data de nascimento</p>
                <input type="text" value="Data de nascimento" />
              </div>
              <div class="section_second_field" style="width: 100%">
                <p>Cidade, UF país de nascimento</p>
                <input type="text" value="Cidade do usuário" />
              </div>
            </div>
            <div class="section_identification_line3">
              <div class="section_second_field" style="width: 50%">
                <p>Nome da mãe</p>
                <input type="text" value="Nome da mãe do usuário" />
              </div>
              <div class="section_second_field" style="width: 50%">
                <p>Nome do pai</p>
                <input type="text" value="Nome do pai do usuário" />
              </div>
            </div>
            <div class="section_identification_line4">
              <div class="section_second_field" style="width: 100%">
                <p>Endereço residencial completo</p>
                <input type="text" value="Endereço residencial do usuário" />
              </div>
            </div>
            <div class="section_identification_line5">
              <div class="section_second_field" style="width: 30%">
                <p>Bairro</p>
                <input type="text" value="Bairro do usuário" />
              </div>
              <div class="section_second_field" style="width: 50%">
                <p>Cidade, UF, país da residência</p>
                <input
                  type="text"
                  value="Cidade, UF, país da residência do usuário"
                />
              </div>
              <div class="section_second_field" style="width: 50%">
                <p>CEP</p>
                <input type="text" value="CEP do usuário" />
              </div>
            </div>
            <div class="section_identification_line6">
              <div class="section_second_field" style="width: 30%">
                <p>Telefone</p>
                <input type="text" value="Telefone do usuário" />
              </div>
              <div class="section_second_field" style="width: 40%">
                <p>Email</p>
                <input type="email" value="Email do usuário" />
              </div>
              <div class="section_second_field" style="width: 30%">
                <p>Doc. Identificação / Órgão Emissor / UF</p>
                <input
                  type="text"
                  value="Doc. Identificação / Órgão Emissor / UF do usuário"
                />
              </div>
            </div>
          </div>
        </section>
        <section class="section">
          <h3 class="section_title">CONVERSÃO</h3>
          <div class="section_conversion_container">
            <div class="section_conversion_aside" style="width: 50%">
              <div class="section_second_field" style="width: 100%">
                <p>
                  Instrutor/a bíblico/a
                  <span>
                    (preencher o nome completo de até dois instrutores bíblicos)
                  </span>
                </p>
                <div class="section_conversion_internal_container">
                  <input
                    type="text"
                    value="1. Instrutor/a bíblico/a do usuário"
                  />
                  <input
                    type="text"
                    value="2. Instrutor/a bíblico/a do usuário"
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
                      <input type="checkbox" />
                      <label>Acampamento/retiro</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Internet</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>ADRA</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Livros/literatura</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Amigos/conhecidos</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Missão Calebe</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Desbravadores/Avent</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Mutirão de Natal</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Educação Adventista</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Pequeno Grupo</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Escola Sabatina</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Quebrando o Silêncio</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Evangelismo público</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Rádio</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Família/parentes</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>TV</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Instituição de saúde</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                      <label>Classe Bíblica ASA</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Estudo Bíblico individual</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Classe Bíblica Calebe/Jovens</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Estudo Bíblico on-line</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Classe Bíblica da igreja</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Evangelismo público</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Classe Bíblica Desbr/Avent</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Ouvi sermões na igreja</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Classe Bíblica Educação</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Pequeno Grupo</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Classe Bíblica ES</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Estudei pouco a Bíblia</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Escola Bíblica Novo Tempo</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Não estudei a Bíblia</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Escola Cristã de Férias</label>
                    </div>
                    <div class="section_conversion_checkbox">
                      <input type="checkbox" />
                      <label>Outro</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section_conversion_aside" style="width: 50%">
              <div class="section_second_field">
                <p>Estado Civil</p>
                <div class="section_conversion_checkbox_container">
                  <div class="section_conversion_checkbox" style="width: 30%">
                    <input type="checkbox" />
                    <label>Solteiro</label>
                  </div>
                  <div class="section_conversion_checkbox" style="width: 30%">
                    <input type="checkbox" />
                    <label>Divorciado</label>
                  </div>
                  <div class="section_conversion_checkbox" style="width: 30%">
                    <input type="checkbox" />
                    <label>Viúvo</label>
                  </div>
                  <div class="section_conversion_checkbox" style="width: 30%">
                    <input type="checkbox" />
                    <label>Casado</label>
                  </div>
                  <div class="section_conversion_checkbox" style="width: 30%">
                    <input type="checkbox" />
                    <label>Outro</label>
                  </div>
                </div>
                <div class="section_conversion_input_container">
                  <p>Data casamento civil:</p>
                  <input type="text" value="Data do casamento do usuário" />
                </div>
              </div>
              <div class="section_second_field">
                <p>Região anterior</p>
                <input type="text" value="Região anterior do usuário" />
              </div>
              <div class="section_conversion_container_checkbox">
                <p>
                  Qual foi o fator decisivo para você ser batizado/a?
                  <br />
                  <span> (marque só uma opção) </span>
                </p>
                <div
                  class="section_conversion_checkbox_container"
                  style="height: 100%"
                >
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Amigos</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Missão Calebe</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Convicção pessoal</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Pequeno Grupo</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Desbravadores/Avent</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Programa Reencontro</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Educação Adventista</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Rádio</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Escola Sabatina</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Semana de Oração</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Evangelismo público</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>TV</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Família/parentes</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
                    <label>Outro</label>
                  </div>
                  <div class="section_conversion_checkbox">
                    <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
                </div>
              </div>
              <p>1. Aceita a Bíblia toda como a inspirada Palavra de Deus?</p>
            </div>
            <div class="section_declaration_checkbox_container">
              <div class="section_declaration_checkbox">
                <div class="header_checkbox_options_position">
                  <p>S</p>
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                </div>
                <div class="header_checkbox_options_position">
                  <p>N</p>
                  <input type="checkbox" />
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
                  <input type="text" value="Quem o usuário discipulara" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section">
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
                <div class="section_conversion_internal_container">
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
                <div>
                  <p id="information">Doc. Identificação / Órgão Emissor / UF</p>
                </div>
                <div class="section_conversion_internal_container">
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
                <div>
                  <p id="information">Assinatura do responsável</p>
                </div>
                <div class="section_conversion_internal_container">
                  <div class="section_user_information_instructor">
                    <img src="" alt="" />
                  </div>
                  <div class="section_user_information_instructor">
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
              <div class="section_user_information_container">
                <div>
                  <p id="information">Assinatura do candidato/a</p>
                </div>
                <div class="section_conversion_internal_container">
                  <div class="section_user_information_instructor">
                    <img id="user_signature" src="${candidateSignature?.signature}" alt="" />
                  </div>
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
          <section class="section">
            <h3 class="section_title">CERIMÔNIA</h3>
            <div class="section_ceremony_principal_container">
              <div class="section_ceremony_container">
                <div class="section_second_field" style="width: 30%">
                  <p>Data da cerimônia</p>
                  <input type="text" value="Data da cerimônia" />
                </div>
                <div class="section_second_field" style="width: 70%">
                  <p>Local, cidade/UF da cerimônia</p>
                  <input type="text" value="Local, cidade/UF da cerimônia" />
                </div>
              </div>
              <div class="section_ceremony_container">
                <div class="section_second_field" style="width: 100%">
                  <p>Nome completo do pastor oficiante</p>
                  <input type="text" value="Nome completo do pastor oficiante" />
                </div>
              </div>
              <div class="section_ceremony_container">
                <div class="section_second_field" style="width: 40%">
                  <p>Nome da igreja/grupo que o/a recebeu como membro</p>
                  <input
                    type="text"
                    value="Nome da igreja/grupo que o/a recebeu como membro"
                  />
                </div>
                <div class="section_second_field" style="width: 60%">
                  <p>Cidade/UF da igreja/grupo organizado</p>
                  <input
                    type="text"
                    value="Cidade/UF da igreja/grupo organizado"
                  />
                </div>
              </div>
              <div class="section_ceremony_container">
                <div class="section_second_field" style="width: 40%">
                  <p>Data e voto da Reunião Regular/Administrativa</p>
                  <input
                    type="text"
                    value="Data e voto da Reunião Regular/Administrativa"
                  />
                </div>
                <div class="section_second_field" style="width: 60%">
                  <p>Nome secretário/a da igreja/grupo organizado</p>
                  <input
                    type="text"
                    value="Nome secretário/a da igreja/grupo organizado"
                  />
                </div>
              </div>
            </div>
            <div class="section_ceremony_signature">
              <img
              src="${pastorSignature?.signature}"
                alt=""
              />
              <p>Assinatura pastor oficiante</p>
              <img
              src="${secretaryOrResponsibleGroup?.signature}"
                alt=""
              />
              <p>Assinatura secretário/a da igreja/grupo organizado</p>
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
