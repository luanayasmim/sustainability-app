export type Chapter = Readonly<{
  id: string;
  title: string;
  description: string;
  challenge: Readonly<{
    objective: string;
    materials: readonly string[];
    safetyNote: string;
    steps: readonly [string, string, string];
  }>;
  moreInfo: Readonly<{
    fact: string;
    url: string;
  }>;
  topics: readonly [Topic, Topic];
}>;

export type Topic =
  | Readonly<{
      title: string;
      intro: string;
      sections: readonly TopicSection[];
    }>
  | Readonly<{
      title: string;
      steps: readonly [string, string, string];
    }>;

export type TopicSection =
  | Readonly<{
      type: "story" | "tip";
      title: string;
      text: string;
    }>
  | Readonly<{
      type: "checklist";
      title: string;
      items: readonly Readonly<{ title: string; text: string }>[];
    }>
  | Readonly<{
      type: "materials";
      title: string;
      items: readonly Readonly<{
        name: string;
        examples: string;
        becomes: string;
        color: string;
      }>[];
    }>;

export const chapters: readonly Chapter[] = [
  {
    id: "reciclagem",
    title: "Entendendo a reciclagem",
    description:
      "Reciclar é transformar materiais que seriam descartados em novos produtos. Separar papel, plástico, vidro e metal ajuda esses materiais a voltarem para o ciclo de produção e reduz a quantidade de lixo no meio ambiente.",
    challenge: {
      objective: "Criar um brinquedo com materiais recicláveis",
      materials: [
        "Uma caixa pequena ou rolos de papelão limpos",
        "Tampinhas grandes e papel reutilizado",
        "Fita adesiva ou cola atóxica",
        "Lápis de cor ou giz de cera",
      ],
      safetyNote:
        "Faça a atividade com um responsável. O adulto deve cuidar da tesoura; não use vidro, latas cortantes ou embalagens de produtos de limpeza.",
      steps: [
        "Com seu responsável, escolha materiais limpos e seguros. Pense no que quer criar: um carrinho, um robô ou um personagem.",
        "Organize as peças para montar sua ideia. Peça ao adulto para ajudar a cortar; use fita ou cola atóxica para prender as partes e decore com papel reutilizado.",
        "Peça ao responsável para conferir se tudo está firme e sem pontas. Dê um nome ao brinquedo e conte quais materiais ganharam uma nova vida.",
      ],
    },
    moreInfo: {
      fact: "Você sabia? A reciclagem começa em casa: separar os resíduos corretamente ajuda a coleta seletiva e o trabalho das cooperativas.",
      url: "https://www.gov.br/mma/pt-br/assuntos/qualidade-ambiental-e-meio-ambiente-urbano/residuos-solidos",
    },
    topics: [
      {
        title: "Ciclo da reciclagem",
        intro:
          "Imagine que uma garrafa usada está começando uma nova aventura! Quando separamos os recicláveis, ajudamos materiais que seriam jogados fora a ganhar uma segunda vida.",
        sections: [
          {
            type: "story",
            title: "A coleta começa a jornada",
            text: "Depois de separar os resíduos em casa, eles seguem para a coleta seletiva da cidade. Cada lugar pode ter dias e regras diferentes, então vale conferir as orientações da sua região com um adulto.",
          },
          {
            type: "story",
            title: "Uma parada para a triagem",
            text: "Em cooperativas e centros de triagem, trabalhadores separam os materiais por tipo e retiram o que não pode ser reciclado. Por isso, embalagens vazias e sem restos de comida ajudam bastante!",
          },
          {
            type: "story",
            title: "De resíduo a matéria-prima",
            text: "Cada material passa por um processo próprio: pode ser triturado, derretido ou transformado em fibras. Assim, vira matéria-prima para fabricar novos objetos.",
          },
          {
            type: "story",
            title: "E a aventura recomeça!",
            text: "A matéria-prima reciclada pode virar uma nova embalagem, um caderno ou muitos outros produtos. Quando usamos e separamos esses produtos de novo, o ciclo continua!",
          },
          {
            type: "materials",
            title: "Cada material tem seu caminho",
            items: [
              {
                name: "📄 Papel e papelão",
                examples: "Jornais, folhas e caixas limpas.",
                becomes:
                  "As fibras são separadas e prensadas para fazer papel e novas caixas.",
                color: "#DCEBFF",
              },
              {
                name: "🧴 Plástico",
                examples: "Garrafas e alguns potes e embalagens.",
                becomes:
                  "É separado por tipo, limpo e transformado em matéria-prima para novos objetos. Nem todo plástico é aceito em toda coleta.",
                color: "#E5F4DE",
              },
              {
                name: "🍶 Vidro",
                examples: "Potes e garrafas de vidro.",
                becomes:
                  "Depois de separado, pode ser triturado e derretido para formar novos potes e garrafas.",
                color: "#DDF4EF",
              },
              {
                name: "🥫 Metal",
                examples: "Latas de bebida e algumas embalagens.",
                becomes:
                  "Pode ser derretido e moldado para virar novas latas e outras peças.",
                color: "#F4E8D5",
              },
              {
                name: "🍌 Restos de alimentos",
                examples: "Casca de fruta e folhas.",
                becomes:
                  "Na compostagem, podem se transformar em composto que ajuda a enriquecer a terra.",
                color: "#E9E2F5",
              },
              {
                name: "🔋 Eletrônicos e pilhas",
                examples: "Celulares, pilhas e baterias usadas.",
                becomes:
                  "Precisam ser levados a pontos de coleta especiais para receber tratamento seguro. Nunca abra nem jogue no lixo comum.",
                color: "#F9E1E1",
              },
            ],
          },
          {
            type: "tip",
            title: "Dica de amigo do planeta",
            text: "Nem todo objeto pode ser reciclado em qualquer cidade. Peça ajuda a um adulto para conferir a coleta seletiva local. E lembre: compostagem também transforma resíduos, mas restos de comida não devem ser misturados aos recicláveis secos.",
          },
        ],
      },
      {
        title: "Separação e coleta de lixo",
        intro:
          "Que tal virar ajudante da coleta seletiva? Com um responsável por perto, você pode ajudar cada resíduo a encontrar o caminho certo. A missão é separar com cuidado — sem mexer em nada perigoso!",
        sections: [
          {
            type: "story",
            title: "Primeiro: descubra as regras da sua região",
            text: "Nem toda cidade recolhe os mesmos materiais ou usa os mesmos dias e pontos de coleta. Converse com um responsável e descubram juntos o que a coleta seletiva aceita perto de vocês.",
          },
          {
            type: "materials",
            title: "Vamos separar em grupos?",
            items: [
              {
                name: "♻️ Recicláveis secos",
                examples:
                  "Papel, papelão, latas, garrafas e embalagens aceitas pela coleta local.",
                becomes:
                  "Deixe cada tipo separado se a sua coleta pedir. Esvazie as embalagens e mantenha-as secas; só enxágue se houver restos, sem desperdiçar água.",
                color: "#DCEBFF",
              },
              {
                name: "🍎 Orgânicos",
                examples: "Cascas de frutas, restos de vegetais e folhas.",
                becomes:
                  "Vão para a coleta de orgânicos ou para compostagem, se houver. Não misture com recicláveis secos.",
                color: "#E5F4DE",
              },
              {
                name: "🗑️ Rejeitos",
                examples:
                  "Resíduos que não são aceitos para reciclagem ou compostagem na coleta local.",
                becomes:
                  "Devem ir para o descarte indicado pelo serviço da cidade, separados dos recicláveis.",
                color: "#F0E8E1",
              },
              {
                name: "⚠️ Resíduos especiais",
                examples:
                  "Pilhas, baterias, lâmpadas, eletrônicos, remédios e produtos químicos.",
                becomes:
                  "Não coloque na lixeira comum nem manuseie. Avise um responsável para levar a um ponto de entrega adequado.",
                color: "#F9E1E1",
              },
            ],
          },
          {
            type: "checklist",
            title: "Sua missão com um responsável",
            items: [
              {
                title: "1. Preparem o cantinho",
                text: "Com um adulto, escolham caixas ou lixeiras identificadas para os grupos de resíduos. Usem as cores só se elas corresponderem às regras da coleta local.",
              },
              {
                title: "2. Confiram juntos",
                text: "Antes de separar, pergunte ao responsável onde vai cada item. Algumas embalagens parecem recicláveis, mas podem não ser aceitas na sua região.",
              },
              {
                title: "3. Deixem a coleta para o adulto",
                text: "Um responsável deve fechar e levar os sacos ou colocar os materiais no local e horário corretos. Crianças não devem sair sozinhas para colocar lixo na rua.",
              },
            ],
          },
          {
            type: "tip",
            title: "Combinado de segurança",
            text: "Não toque em vidro quebrado, latas cortantes, lixo desconhecido, pilhas, remédios ou produtos químicos. Chame um adulto. A sua ajuda pode ser observar, avisar e separar apenas materiais seguros junto com ele.",
          },
        ],
      },
    ],
  },
  {
    id: "agua",
    title: "A importância da água",
    description:
      "A água é essencial para a vida, para a natureza e para muitas atividades do nosso dia a dia. Usá-la com cuidado ajuda a preservar esse recurso para as pessoas, os animais e as próximas gerações.",
    challenge: {
      objective: "Criar um lembrete para economizar água",
      materials: [
        "Papel usado de um lado ou papelão fino",
        "Lápis de cor ou giz de cera",
        "Fita adesiva para colocar o lembrete",
      ],
      safetyNote:
        "Peça ajuda a um responsável para escolher onde colocar o lembrete. Não suba em bancos ou escadas para alcançá-lo.",
      steps: [
        "Observe sua rotina e escolha uma atitude para economizar água, como fechar a torneira ao escovar os dentes.",
        "Desenhe ou escreva um lembrete sobre essa atitude em um papel reutilizado.",
        "Coloque o lembrete em um local visível com a ajuda de um adulto e pratique essa atitude todos os dias.",
      ],
    },
    moreInfo: {
      fact: "Você sabia? A água que usamos percorre um caminho que inclui captação, tratamento e distribuição antes de chegar às casas.",
      url: "https://www.gov.br/ana/pt-br",
    },
    topics: [
      {
        title: "De onde vem a água que usamos?",
        intro:
          "A água faz uma grande viagem pela natureza antes de chegar à nossa torneira. Vamos acompanhar essa aventura e descobrir como ela volta para os rios e para o céu!",
        sections: [
          {
            type: "story",
            title: "A água passeia pela natureza",
            text: "Com o calor do sol, parte da água de rios, lagos e mares sobe para o céu em forma de vapor. Lá em cima, o vapor esfria e forma nuvens. Esse passeio faz parte do ciclo da água.",
          },
          {
            type: "story",
            title: "A chuva enche rios e reservatórios",
            text: "Quando as gotinhas das nuvens ficam pesadas, caem como chuva. A água pode chegar aos rios, lagos e reservatórios que abastecem as cidades.",
          },
          {
            type: "story",
            title: "Uma parada para ficar própria para o uso",
            text: "A água captada passa por etapas de tratamento que retiram sujeiras e ajudam a torná-la adequada para o consumo. Depois, segue por tubulações até as casas.",
          },
          {
            type: "story",
            title: "E o ciclo continua",
            text: "Depois de usada, a água que vai pelo ralo precisa ser coletada e tratada antes de voltar à natureza. Cuidar dos rios e não jogar lixo neles ajuda a proteger essa viagem.",
          },
          {
            type: "tip",
            title: "Curiosidade",
            text: "A mesma água circula pela Terra há muito tempo: ela muda de lugar e de forma, passando pelo ar, pelo solo, pelos rios e pelos seres vivos.",
          },
        ],
      },
      {
        title: "Como economizar água",
        intro:
          "Cada gotinha conta! Pequenas escolhas feitas com a família ajudam a evitar o desperdício e a cuidar da água que usamos todos os dias.",
        sections: [
          {
            type: "checklist",
            title: "Missões para fazer em família",
            items: [
              {
                title: "Torneira fechada",
                text: "Feche a torneira enquanto escova os dentes ou ensaboa as mãos. Abra só na hora de enxaguar.",
              },
              {
                title: "Banho esperto",
                text: "Combine com um responsável um banho mais curto. Enquanto se ensaboa, deixe o chuveiro fechado, se for seguro.",
              },
              {
                title: "Olhos atentos",
                text: "Se notar uma torneira pingando ou um vazamento, avise um adulto. O conserto deve ser feito por um responsável.",
              },
            ],
          },
          {
            type: "story",
            title: "Reutilizar com cuidado",
            text: "Um adulto pode guardar água limpa que sobrou de algumas tarefas para regar plantas ou limpar o quintal. Nunca beba água reaproveitada nem mexa em baldes ou recipientes sem pedir ajuda.",
          },
          {
            type: "tip",
            title: "Desafio da gotinha",
            text: "Escolha com sua família uma missão desta lista e tentem praticá-la durante a semana. Depois, contem qual foi a mais fácil de lembrar!",
          },
        ],
      },
    ],
  },
  {
    id: "energia",
    title: "O poder da energia",
    description:
      "A energia permite que luzes, aparelhos e meios de transporte funcionem. Evitar desperdícios e escolher fontes renováveis sempre que possível ajuda a diminuir os impactos no planeta.",
    challenge: {
      objective: "Fazer um aviso para usar energia com consciência",
      materials: [
        "Papel usado de um lado ou papelão fino",
        "Lápis de cor ou giz de cera",
        "Fita adesiva para prender o aviso",
      ],
      safetyNote:
        "Peça ajuda a um responsável para colocar o aviso. Não mexa em tomadas, fios ou aparelhos elétricos.",
      steps: [
        "Pense em atitudes que economizam energia, como apagar a luz ao sair de um cômodo.",
        "Crie um aviso colorido em papel reutilizado com uma mensagem curta para lembrar sua família de economizar energia.",
        "Peça ajuda a um adulto para colocar o aviso perto de um interruptor e pratique a atitude no dia a dia.",
      ],
    },
    moreInfo: {
      fact: "Você sabia? A energia solar e a energia dos ventos são exemplos de fontes renováveis, pois dependem de recursos naturais que se renovam.",
      url: "https://www.epe.gov.br/pt/abcdenergia",
    },
    topics: [
      {
        title: "Fontes de energia",
        intro:
          "A energia faz muitas coisas acontecerem: acende lâmpadas, ajuda a geladeira a conservar alimentos e permite que aparelhos funcionem. Mas de onde será que ela vem?",
        sections: [
          {
            type: "materials",
            title: "Fontes renováveis: a natureza se renova",
            items: [
              {
                name: "☀️ Sol",
                examples: "A luz e o calor que chegam do Sol.",
                becomes:
                  "Painéis solares podem transformar a luz do Sol em eletricidade.",
                color: "#FFF2CC",
              },
              {
                name: "🌬️ Vento",
                examples: "O ar em movimento.",
                becomes:
                  "O vento gira grandes turbinas, que ajudam a produzir eletricidade.",
                color: "#DCEBFF",
              },
              {
                name: "💧 Água em movimento",
                examples: "A força da água de rios em usinas hidrelétricas.",
                becomes:
                  "A água movimenta equipamentos que geram eletricidade. As usinas também precisam cuidar dos rios e dos ambientes ao redor.",
                color: "#DDF4EF",
              },
            ],
          },
          {
            type: "materials",
            title: "Fontes não renováveis: existem em quantidade limitada",
            items: [
              {
                name: "🪨 Petróleo, carvão e gás natural",
                examples:
                  "Combustíveis encontrados no subsolo e formados ao longo de muito tempo.",
                becomes:
                  "São usados para produzir energia, mas podem acabar e sua utilização pode causar poluição.",
                color: "#F0E8E1",
              },
            ],
          },
          {
            type: "tip",
            title: "O que você pode fazer?",
            text: "Não precisa mexer em aparelhos: apague a luz ao sair de um cômodo quando for seguro e peça a um adulto para desligar o que não estiver sendo usado. Nunca toque em tomadas, fios ou equipamentos elétricos.",
          },
        ],
      },
      {
        title: "Economia de energia",
        intro:
          "Economizar energia é como cuidar de um tesouro que usamos todos os dias. Combinando pequenas atitudes com a família, evitamos gastar energia sem necessidade.",
        sections: [
          {
            type: "checklist",
            title: "Pequenas atitudes que ajudam",
            items: [
              {
                title: "Aproveite a luz do dia",
                text: "Abra as cortinas para iluminar o ambiente naturalmente, com a ajuda de um adulto se a janela estiver alta.",
              },
              {
                title: "Luz apagada ao sair",
                text: "Se for seguro e o interruptor estiver ao seu alcance, apague a luz ao sair. Se não, peça ajuda a um responsável.",
              },
              {
                title: "Aparelhos em descanso",
                text: "Avise um adulto quando um aparelho ficar ligado sem ninguém usando. Só um adulto deve desligá-lo da tomada.",
              },
            ],
          },
          {
            type: "story",
            title: "Por que isso faz diferença?",
            text: "Produzir e levar energia até nossas casas usa recursos e equipamentos. Quando evitamos o desperdício, ajudamos a cuidar da natureza e também da energia disponível para todos.",
          },
          {
            type: "tip",
            title: "Combinado de segurança",
            text: "Crianças nunca devem mexer em tomadas, fios, plugues ou aparelhos elétricos. Se vir algo quebrado ou um fio solto, afaste-se e chame um adulto.",
          },
        ],
      },
    ],
  },
  {
    id: "consumo-consciente",
    title: "Consumo consciente",
    description:
      "Consumir de forma consciente é pensar antes de comprar, escolher apenas o necessário e cuidar bem do que já temos. Essas escolhas ajudam a reduzir o desperdício e o uso de recursos naturais.",
    challenge: {
      objective: "Transformar uma embalagem em um organizador",
      materials: [
        "Uma caixa de papelão limpa e sem partes cortantes",
        "Papel reutilizado para decorar",
        "Lápis de cor ou giz de cera",
        "Cola atóxica ou fita adesiva",
      ],
      safetyNote:
        "Faça a atividade com um responsável. O adulto deve cuidar de qualquer ferramenta de corte; não use embalagens de produtos químicos ou de limpeza.",
      steps: [
        "Escolha uma embalagem limpa e resistente que seria descartada, como uma caixa pequena.",
        "Decore a embalagem com papel reutilizado e transforme-a em um organizador para lápis ou pequenos objetos.",
        "Use seu organizador e conte como reutilizar a embalagem evitou que ela fosse descartada naquele momento.",
      ],
    },
    moreInfo: {
      fact: "Você sabia? Reutilizar um objeto e evitar produtos descartáveis são formas simples de reduzir a quantidade de resíduos gerados.",
      url: "https://www.gov.br/mma/pt-br/assuntos/consumo-sustentavel",
    },
    topics: [
      {
        title: "Reduzir, reutilizar e reciclar",
        intro:
          "Antes de algo ir para o lixo, podemos pensar em três superpoderes: reduzir, reutilizar e reciclar. Eles ajudam a usar melhor os recursos do planeta!",
        sections: [
          {
            type: "checklist",
            title: "Os três superpoderes",
            items: [
              {
                title: "1. Reduzir",
                text: "É evitar o que não precisamos. Com um responsável, faça uma lista antes das compras e escolha produtos com menos embalagens quando possível.",
              },
              {
                title: "2. Reutilizar",
                text: "É usar de novo ou dar uma nova função a algo que ainda está em boas condições. Uma caixa limpa pode virar um organizador ou brinquedo, com ajuda de um adulto.",
              },
              {
                title: "3. Reciclar",
                text: "Quando um material não puder mais ser usado, separe-o corretamente para a coleta seletiva, seguindo as regras da sua cidade com um responsável.",
              },
            ],
          },
          {
            type: "story",
            title: "Qual superpoder vem primeiro?",
            text: "Reduzir e reutilizar vêm antes de reciclar: assim, fazemos um objeto durar mais e evitamos criar resíduos tão cedo. Quando ele realmente não puder ser usado, a reciclagem pode ajudar.",
          },
          {
            type: "tip",
            title: "Atenção",
            text: "Reutilize apenas objetos limpos e seguros. Peça ajuda a um adulto e não use embalagens que guardaram produtos de limpeza ou substâncias desconhecidas.",
          },
        ],
      },
      {
        title: "Escolhas mais conscientes",
        intro:
          "Ser um consumidor consciente é fazer escolhas pensando no que precisamos e em como nossas escolhas afetam as pessoas e a natureza. Crianças também podem ajudar a família a pensar!",
        sections: [
          {
            type: "checklist",
            title: "Perguntas de detetive antes de comprar",
            items: [
              {
                title: "Eu preciso mesmo?",
                text: "Converse com um responsável: talvez você já tenha algo que sirva ou possa ser consertado.",
              },
              {
                title: "Vai durar bastante?",
                text: "Quando for escolher entre opções, prefiram juntos algo que possa ser usado por mais tempo e cuidado direitinho.",
              },
              {
                title: "Tem embalagem demais?",
                text: "Observe as embalagens com sua família. Quando houver opções adequadas, prefiram as que geram menos resíduos.",
              },
            ],
          },
          {
            type: "story",
            title: "Cuidar também é consumir melhor",
            text: "Guardar os brinquedos, cuidar dos livros, emprestar ou doar o que está em bom estado ajuda os objetos a continuarem úteis por mais tempo.",
          },
          {
            type: "tip",
            title: "Uma escolha pequena já conta",
            text: "Você não precisa decidir sozinho nem comprar nada. Pode ajudar conversando com um responsável, cuidando do que já tem e evitando desperdícios.",
          },
        ],
      },
    ],
  },
];
