export type Option = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export const brp: Record<string, Option> = {
  Batismo: {
    x: 111.5,
    y: 762,
    height: 7,
    width: 8,
  },
  "Rebatismo*": {
    x: 111.5,
    y: 746,
    height: 7,
    width: 8,
  },
  "Profissão de fé*": {
    x: 111.5,
    y: 730,
    height: 7,
    width: 8,
  },
};

export const theChurchOrPastorWhereTheCandidateWasRemovedWasConsulted: Record<
  string,
  Option
> = {
  Sim: {
    x: 423.5,
    y: 744,
    height: 4.5,
    width: 5.5,
  },
  Não: {
    x: 436.5,
    y: 744,
    height: 4.5,
    width: 5.5,
  },
};

export const sexOpt: Record<string, Option> = {
  Masculino: { x: 60.5, y: 681.5, height: 4.5, width: 5.5 },
  Feminino: { x: 60.5, y: 671.8, height: 4.5, width: 5.5 },
};

export const maritalStatusOpt: Record<string, Option> = {
  Solteiro: {
    x: 408.9,
    y: 559,
    height: 4.5,
    width: 5.5,
  },
  Divorciado: {
    x: 448.7,
    y: 559,
    height: 4.5,
    width: 5.5,
  },
  Viúvo: {
    x: 498.7,
    y: 559,
    height: 4.5,
    width: 5.5,
  },
  Casado: {
    x: 408.9,
    y: 548.5,
    height: 4.5,
    width: 5.5,
  },
};

export const howDidYouFindOutAboutTheIASD: Record<string, Option> = {
  "Acampamento/retiro": { x: 40.5, y: 519, height: 4.5, width: 5.5 },
  ADRA: { x: 40.5, y: 506, height: 4.5, width: 5.5 },
  "Amigos/conhecidos": { x: 40.5, y: 493, height: 4.5, width: 5.5 },
  "Desbravadores/Avent": { x: 40.5, y: 480, height: 4.5, width: 5.5 },
  "Educação Adventista": { x: 40.5, y: 467, height: 4.5, width: 5.5 },
  "Escola Sabatina": { x: 40.5, y: 454, height: 4.5, width: 5.5 },
  "Evangelismo público": { x: 40.5, y: 441, height: 4.5, width: 5.5 },
  "Família/parentes": { x: 40.5, y: 428, height: 4.5, width: 5.5 },
  "Instituição de saúde": { x: 40.5, y: 415, height: 4.5, width: 5.5 },

  Internet: { x: 126.7, y: 519, height: 4.5, width: 5.5 },
  "Livros/literatura": { x: 126.7, y: 506, height: 4.5, width: 5.5 },
  "Missão Calebe": { x: 126.7, y: 493, height: 4.5, width: 5.5 },
  "Mutirão de Natal": { x: 126.7, y: 480, height: 4.5, width: 5.5 },
  "Pequeno Grupo": { x: 126.7, y: 467, height: 4.5, width: 5.5 },
  "Quebrando o Silêncio": { x: 126.7, y: 454, height: 4.5, width: 5.5 },
  Rádio: { x: 126.7, y: 441, height: 4.5, width: 5.5 },
  TV: { x: 126.7, y: 428, height: 4.5, width: 5.5 },
  Outro: { x: 126.7, y: 415, height: 4.5, width: 5.5 },
};

export const howDidYouStudyTheBible: Record<string, Option> = {
  "Classe Bíblica ASA": { x: 210, y: 519, height: 4.5, width: 5.5 },
  "Classe Bíblica Calebe/Jovens": { x: 210, y: 506, height: 4.5, width: 5.5 },
  "Classe Bíblica da igreja": { x: 210, y: 493, height: 4.5, width: 5.5 },
  "Classe Bíblica Desbr/Avent": { x: 210, y: 480, height: 4.5, width: 5.5 },
  "Classe Bíblica Educação": { x: 210, y: 467, height: 4.5, width: 5.5 },
  "Classe Bíblica ES": { x: 210, y: 454, height: 4.5, width: 5.5 },
  "Escola Bíblica Novo Tempo": { x: 210, y: 441, height: 4.5, width: 5.5 },
  "Escola Cristã de Férias": { x: 210, y: 428, height: 4.5, width: 5.5 },

  "Estudo Bíblico individual": { x: 316, y: 519, height: 4.5, width: 5.5 },
  "Estudo Bíblico on-line": { x: 316, y: 506, height: 4.5, width: 5.5 },
  "Evangelismo público": { x: 316, y: 493, height: 4.5, width: 5.5 },
  "Ouvi sermões na igreja": { x: 316, y: 480, height: 4.5, width: 5.5 },
  "Pequeno Grupo": { x: 316, y: 467, height: 4.5, width: 5.5 },
  "Estudei pouco a Bíblia": { x: 316, y: 454, height: 4.5, width: 5.5 },
  "Não estudei a Bíblia": { x: 316, y: 441, height: 4.5, width: 5.5 },
  Outro: { x: 316, y: 428, height: 4.5, width: 5.5 },
};

export const whatWasTheDecisiveFactorForYouToBeBaptized: Record<
  string,
  Option
> = {
  Amigos: { x: 409, y: 482.5, height: 4.5, width: 5.5 },
  "Convicção pessoal": { x: 409, y: 471.5, height: 4.5, width: 5.5 },
  "Desbravadores/Avent": { x: 409, y: 460.5, height: 4.5, width: 5.5 },
  "Educação Adventista": { x: 409, y: 449.5, height: 4.5, width: 5.5 },
  "Escola Sabatina": { x: 409, y: 438.5, height: 4.5, width: 5.5 },
  "Evangelismo público": { x: 409, y: 427.5, height: 4.5, width: 5.5 },
  "Família/parentes": { x: 409, y: 416.5, height: 4.5, width: 5.5 },
  Internet: { x: 409, y: 405.5, height: 4.5, width: 5.5 },

  "Missão Calebe": { x: 498.8, y: 482.5, height: 4.5, width: 5.5 },
  "Pequeno Grupo": { x: 498.8, y: 471.5, height: 4.5, width: 5.5 },
  "Programa Reencontro": { x: 498.8, y: 460.5, height: 4.5, width: 5.5 },
  Rádio: { x: 498.8, y: 449.5, height: 4.5, width: 5.5 },
  "Semana de Oração": { x: 498.8, y: 438.5, height: 4.5, width: 5.5 },
  TV: { x: 498.8, y: 427.5, height: 4.5, width: 5.5 },
  Outro: { x: 498.8, y: 416.5, height: 4.5, width: 5.5 },
};
