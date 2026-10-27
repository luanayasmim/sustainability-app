# Sustentabilidade App

Aplicativo mobile educativo sobre sustentabilidade, com foco em temas como reciclagem, água, energia e consumo consciente. O app combina conteúdos informativos, desafios práticos, quizzes, conquistas e acompanhamento de progresso do usuário.

## Visão geral

Este projeto foi desenvolvido com Expo + React Native e tem como objetivo incentivar hábitos sustentáveis por meio de uma experiência acessível, interativa e visualmente amigável para crianças e jovens.

## Funcionalidades principais

- Onboarding inicial com apresentação do app
- Cadastro e persistência do nome do usuário
- Navegação entre temas de sustentabilidade
- Conteúdo educativo por tema
- Desafios práticos com objetivo, materiais e etapas
- Quiz por tema com cálculo de acertos
- Registro de progresso e tentativas
- Sistema de conquistas/badges
- Perfil do usuário com missão e progresso
- Edição do nome do usuário
- Retomada do último tema acessado

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- React Native SVG
- Phosphor Icons
- Expo Fonts
- React Native Reanimated

## Requisitos do ambiente

### Pré-requisitos

- Node.js LTS recomendado
- npm
- Expo CLI
- Android Studio + SDK Android (para Android)
- Xcode + simulador iOS (para macOS)
- Git

### Versões do projeto

- React Native: 0.86.3
- Expo: ~57.0.31
- TypeScript: ~6.0.3

### Compatibilidade mínima

- Android: 7.0 (API 24) ou superior
- iOS: 15.1 ou superior

## Estrutura do projeto

```text
sustainability-app/
├── app.json
├── assets/
├── docs/
│   ├── use-cases.puml
│   └── sequence-diagram.puml
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── storage/
│   └── ...
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd sustainability-app
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npm start
```

4. Execute no emulador ou dispositivo:

```bash
npm run android
```

ou

```bash
npm run ios
```

## Scripts disponíveis

```bash
npm start
npm run android
npm run ios
npm run web
```

## Fluxo principal do app

1. Usuário acessa a tela de onboarding
2. Informa seu nome
3. Navega pelos temas de sustentabilidade
4. Acessa conteúdo educacional
5. Participa de desafios práticos
6. Responde quizzes
7. Visualiza conquistas e progresso
8. Edita o perfil quando necessário
9. Retoma o último tema acessado

## Documentação adicional

Os diagramas do projeto estão localizados na pasta `docs/`:

- `use-cases.puml` – casos de uso do sistema
- `sequence-diagram.puml` – diagrama de sequência de fluxo principal

## Observações

- A persistência principal do app é local, usando AsyncStorage.
- O projeto foi pensado para ser facilmente expandido com novos temas, quizzes e desafios.
- O foco principal é educação ambiental e desenvolvimento de hábitos sustentáveis.

## Licença

Este projeto é para fins educacionais e de estudo.
