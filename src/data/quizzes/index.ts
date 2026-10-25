import type { Icon } from "phosphor-react-native";
import {
  DropIcon,
  LightningIcon,
  RecycleIcon,
  ShoppingBagIcon,
} from "phosphor-react-native";

type QuizAlternative = Readonly<{
  option: string;
  isCorrect: boolean;
}>;

type QuizQuestion = Readonly<{
  question: string;
  options: readonly QuizAlternative[];
}>;

export type Quiz = Readonly<{
  title: string;
  route: string;
  objective: string;
  achievement: Readonly<{
    name: string;
    icon: Icon;
  }>;
  questions: readonly QuizQuestion[];
}>;

export const quizzes: readonly Quiz[] = [
  {
    title: "Entendendo a Reciclagem",
    route: "/quiz",
    objective:
      "Aprender a separar resíduos e reconhecer a importância da reciclagem.",
    achievement: {
      name: "Guardião da Reciclagem",
      icon: RecycleIcon,
    },
    questions: [
      {
        question: "Quais atitudes ajudam a preparar uma embalagem para reciclagem?",
        options: [
          { option: "Esvaziá-la e separá-la conforme a coleta local", isCorrect: true },
          { option: "Retirar restos de alimento antes do descarte", isCorrect: true },
          { option: "Misturá-la com restos de comida", isCorrect: false },
          { option: "Colocá-la sempre no lixo orgânico", isCorrect: false },
        ],
      },
      {
        question: "Quais práticas facilitam a reciclagem de papel?",
        options: [
          { option: "Separá-lo de materiais que não são recicláveis", isCorrect: true },
          { option: "Molhá-lo antes de descartar", isCorrect: false },
          { option: "Misturá-lo com resíduos orgânicos", isCorrect: false },
          { option: "Mantê-lo seco e sem resíduos de alimentos", isCorrect: true },
        ],
      },
      {
        question: "Quais resíduos devem ser levados a pontos de coleta especiais?",
        options: [
          { option: "Pilhas usadas", isCorrect: true },
          { option: "Restos de frutas", isCorrect: false },
          { option: "Baterias usadas", isCorrect: true },
          { option: "Papel limpo", isCorrect: false },
        ],
      },
    ],
  },
  {
    title: "A Importância da Água",
    route: "/quiz",
    objective:
      "Compreender a importância da água e conhecer maneiras de preservá-la.",
    achievement: {
      name: "Protetor da Água",
      icon: DropIcon,
    },
    questions: [
      {
        question: "Quais atitudes ajudam a economizar água ao escovar os dentes?",
        options: [
          { option: "Usar água corrente para enxaguar a escova", isCorrect: false },
          { option: "Usar um copo para enxaguar a boca", isCorrect: true },
          { option: "Deixar a torneira aberta durante toda a escovação", isCorrect: false },
          { option: "Fechar a torneira enquanto escova", isCorrect: true },
        ],
      },
      {
        question: "Quais atitudes ajudam a lidar com um vazamento em casa?",
        options: [
          { option: "Deixar a água correr para identificar o problema", isCorrect: false },
          { option: "Esperar até que o vazamento aumente", isCorrect: false },
          { option: "Consertá-lo assim que possível", isCorrect: true },
          { option: "Fechar o registro enquanto o reparo não é feito", isCorrect: true },
        ],
      },
      {
        question: "Quais são formas de reutilizar água?",
        options: [
          { option: "Usar água da chuva para regar plantas", isCorrect: true },
          { option: "Reaproveitar água do enxágue para lavar o quintal", isCorrect: true },
          { option: "Descartar água limpa após cada uso", isCorrect: false },
          { option: "Usar água potável para lavar calçadas", isCorrect: false },
        ],
      },
    ],
  },
  {
    title: "O Poder da Energia",
    route: "/quiz",
    objective:
      "Conhecer formas de geração de energia e hábitos para economizá-la.",
    achievement: {
      name: "Guardião da Energia",
      icon: LightningIcon,
    },
    questions: [
      {
        question: "Quais destas são fontes de energia renovável?",
        options: [
          { option: "Energia solar", isCorrect: true },
          { option: "Carvão mineral", isCorrect: false },
          { option: "Petróleo", isCorrect: false },
          { option: "Energia eólica", isCorrect: true },
        ],
      },
      {
        question: "Quais hábitos ajudam a economizar energia elétrica?",
        options: [
          { option: "Apagar as luzes ao sair de um cômodo", isCorrect: true },
          { option: "Deixar aparelhos ligados sem necessidade", isCorrect: false },
          { option: "Desligar aparelhos quando não estão em uso", isCorrect: true },
          { option: "Manter carregadores conectados sem uso", isCorrect: false },
        ],
      },
      {
        question: "Quais tecnologias podem aproveitar a energia do sol?",
        options: [
          { option: "Gerador a diesel", isCorrect: false },
          { option: "Painel fotovoltaico", isCorrect: true },
          { option: "Motor a gasolina", isCorrect: false },
          { option: "Aquecedor solar de água", isCorrect: true },
        ],
      },
    ],
  },
  {
    title: "Consumo Consciente",
    route: "/quiz",
    objective:
      "Fazer escolhas de consumo considerando necessidades, durabilidade e impactos ambientais.",
    achievement: {
      name: "Consumidor Consciente",
      icon: ShoppingBagIcon,
    },
    questions: [
      {
        question: "O que é importante avaliar antes de comprar um produto?",
        options: [
          { option: "Se ele é realmente necessário", isCorrect: true },
          { option: "Sua durabilidade e possibilidade de reparo", isCorrect: true },
          { option: "Se está na moda", isCorrect: false },
          { option: "Se possui a maior embalagem", isCorrect: false },
        ],
      },
      {
        question: "Quais atitudes podem prolongar a vida útil de um objeto?",
        options: [
          { option: "Consertá-lo quando possível", isCorrect: true },
          { option: "Cuidar e fazer manutenção adequada", isCorrect: true },
          { option: "Trocá-lo por um novo todo ano", isCorrect: false },
          { option: "Descartá-lo ao primeiro sinal de desgaste", isCorrect: false },
        ],
      },
      {
        question: "Quais atitudes ajudam a evitar compras por impulso?",
        options: [
          { option: "Esperar um tempo antes de decidir uma compra não planejada", isCorrect: true },
          { option: "Ignorar a lista de compras", isCorrect: false },
          { option: "Planejar as compras e comparar opções", isCorrect: true },
          { option: "Comprar imediatamente tudo que chamar atenção", isCorrect: false },
        ],
      },
    ],
  },
];
