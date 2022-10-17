import { formatNumber } from "react-native-currency-input";
import _ from "lodash";

export const aplicarMascara = (valor: string, mascara = "(##) #####-####") => {
  if (!valor) return "";
  let valorFormatado = "";
  let valorSemMascara = String(valor).replace(/\D+/g, "");
  let posicao = 0;

  for (let i = 0; i < mascara.length; i++) {
    if (
      (mascara[i] === "#" || mascara[i] === "*") &&
      valorSemMascara[posicao] !== undefined
    ) {
      valorFormatado += valorSemMascara[posicao++];
    } else if (valorSemMascara[posicao] !== undefined) {
      valorFormatado += mascara[i];
    }
  }

  return valorFormatado;
};

export const aplicarMascaraMonetaria = (
  valor: string | number,
  dividir: number = 100
) => {
  let valorSemMascara = String(valor).replace(/\D+/g, "");

  return formatNumber(+valorSemMascara / dividir, {
    separator: ",",
    prefix: "R$ ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  });
};

export const atualizarArray = (array: any[], obj: any, index: number) => {
  let novoArray = [...array];
  novoArray[index] = obj;
  return novoArray;
};
