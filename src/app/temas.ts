// Temas da comparação: propostas dos dois candidatos (com a página do plano no TSE),
// análise de efeitos e o que acompanhar. Rode `npm run test:dados` depois de editar.
import { Topic } from './models';
import { S, UPDATED_AT } from './fontes';

/** Grupos do filtro de temas, na ordem em que aparecem na página. */
export const TOPIC_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'No bolso', ids: ['custo-de-vida', 'emprego-renda', 'contas-publicas'] },
  { label: 'Serviços e cidade', ids: ['servicos-sociais', 'previdencia', 'cidades'] },
  { label: 'Direitos e segurança', ids: ['seguranca', 'mulheres-igualdade', 'instituicoes'] },
  {
    label: 'O país e o mundo',
    ids: ['campo', 'meio-ambiente-energia', 'tecnologia', 'cultura-esporte', 'brasil-no-mundo'],
  },
];

export const TOPICS: Topic[] = [
  {
    id: 'custo-de-vida',
    icon: '🛒',
    title: 'Custo de vida e impostos',
    question: 'Por que tudo está caro, e o que cada um diz que fará a respeito?',
    proposals: {
      flavio: [
        {
          summary:
            'Mexer na reforma tributária e nos aumentos de impostos do governo atual para cobrar menos sobre o que se produz e se compra: IVA mais baixo, fim do imposto “em cascata”, menos exceções e menos imposto sobre investimento e exportação.',
          status: 'oficial',
          pages: '30, 71',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Conta de luz mais simples: cortar encargos e subsídios embutidos na tarifa, reduzir aos poucos a CDE (um fundo que todo mundo paga na conta) e baixar impostos sobre energia e combustíveis. A Tarifa Social para a baixa renda continua.',
          status: 'oficial',
          pages: '31, 53',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Comida mais barata desde o campo: criar “Corredores Logísticos Inteligentes” para baratear o frete das safras, ampliar o Seguro Rural e aumentar a capacidade de armazenar grãos.',
          status: 'oficial',
          pages: '31',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Produzir fertilizante no Brasil, com potássio e fosfato daqui, para o agro depender menos de importação.',
          status: 'oficial',
          pages: '32',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não diz quanto os impostos ou as tarifas vão cair: não há percentual nem valor.',
          status: 'nao-localizado',
          pages: '30',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Colocar em prática a reforma tributária já aprovada e cobrar imposto de forma mais justa (“justiça tributária”). O plano também promete criar condições para os juros caírem, com a inflação controlada.',
          status: 'oficial',
          pages: '48–49',
          sources: [S.planoLula],
        },
        {
          summary:
            'Comida: ampliar o Plano Safra da Agricultura Familiar, dando prioridade aos alimentos da cesta básica, e manter a ampliação do PAA (o governo comprando alimentos de pequenos produtores).',
          status: 'oficial',
          pages: '59–60',
          sources: [S.planoLula],
        },
        {
          summary:
            'Continuar a política de valorização do salário mínimo, que, segundo o plano, garantiu aumento acima da inflação.',
          status: 'oficial',
          pages: '19, 74',
          sources: [S.planoLula],
        },
        {
          summary:
            'Combustível: seguir amortecendo as subidas do preço internacional, para o brasileiro não sentir na bomba cada choque lá de fora.',
          status: 'oficial',
          pages: '66',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano fala em “debater” uma conta de luz mais barata, mas não traz medida concreta. Também não diz quanto os impostos poderiam cair.',
          status: 'nao-localizado',
          pages: '65–66',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Menos imposto sobre consumo e energia reduz o preço final, se o corte for repassado pelas empresas ao consumidor.',
        benefits: [
          'Alívio direto em itens que pesam no orçamento: luz, combustível e compras do mês.',
          'Menos imposto cumulativo tende a baratear a produção.',
        ],
        risks: [
          'Sem corte de gasto equivalente, a arrecadação menor aumenta o déficit, o que pressiona juros e dólar — e isso devolve inflação.',
          'O repasse ao preço final não é garantido; parte pode virar margem das empresas.',
          'Mudar a reforma tributária exige emenda constitucional (3/5 do Congresso).',
        ],
      },
      lula: {
        mechanism:
          'Salário mínimo com ganho real e mais crédito para quem produz comida da cesta básica buscam proteger o poder de compra de quem ganha menos.',
        benefits: [
          'Aumento real do mínimo eleva a renda de trabalhadores, aposentados e beneficiários do BPC.',
          'Mais crédito para a agricultura familiar pode aumentar a oferta de alimentos da cesta básica e segurar os preços.',
        ],
        risks: [
          'O mínimo indexa a Previdência e benefícios: cada aumento real eleva a despesa obrigatória e pressiona as contas públicas e os juros.',
          'Renda maior sem aumento de oferta pode alimentar a inflação de serviços.',
          'O crédito subsidiado do Plano Safra tem custo para o Tesouro.',
        ],
      },
      monitor: [
        'IPCA acumulado em 12 meses (IBGE)',
        'Preço da cesta básica e da tarifa de energia',
        'Taxa Selic (Banco Central)',
        'Resultado primário e dívida bruta do governo',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'emprego-renda',
    icon: '💼',
    title: 'Emprego e renda',
    question: 'O que muda para quem trabalha, empreende ou procura emprego?',
    proposals: {
      flavio: [
        {
          summary:
            'Deixar mais barato contratar com carteira assinada, “sem retirar direitos”: um contrato com menos custo para jovens de 18 a 24 anos no primeiro emprego e outro para quem tem 50 anos ou mais e está há um ano sem trabalho.',
          status: 'oficial',
          pages: '43–44',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Acordo entre empresa e trabalhadores valendo mais que a lei em alguns pontos (“negociado sobre o legislado”) e um banco nacional de vagas ligado ao RH das empresas.',
          status: 'oficial',
          pages: '44',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Usar a rede da Caixa para dar crédito e orientação a quem quer abrir ou tocar um pequeno negócio, e para ensinar a sair do vermelho.',
          status: 'oficial',
          pages: '33, 45',
          sources: [S.planoFlavio],
        },
        {
          summary: 'Proibir que o dinheiro de programas sociais seja gasto em apostas (as “bets”).',
          status: 'oficial',
          pages: '33',
          sources: [S.planoFlavio],
        },
        {
          summary: 'O plano não apresenta política para o salário mínimo.',
          status: 'nao-localizado',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Fim da escala 6x1 e jornada de 40 horas por semana, sem cortar salário. Segundo o plano, o texto já passou na Câmara, e a promessa é trabalhar pela aprovação no Senado.',
          status: 'oficial',
          pages: '75',
          sources: [S.planoLula],
        },
        {
          summary:
            'Regras para quem trabalha por aplicativo: remuneração, condições de trabalho, direitos trabalhistas e de previdência, e transparência sobre como o algoritmo decide.',
          status: 'oficial',
          pages: '74–75',
          sources: [S.planoLula],
        },
        {
          summary:
            'Ampliar no SINE (o sistema público de emprego) a Plataforma Pública Nacional de Empregabilidade, com inteligência artificial, juntando vagas, cursos, certificados e orientação profissional.',
          status: 'oficial',
          pages: '74',
          sources: [S.planoLula],
        },
        {
          summary:
            'Combater a “pejotização” disfarçada (contratar como PJ quem, na prática, é empregado), com mais fiscalização.',
          status: 'oficial',
          pages: '74',
          sources: [S.planoLula],
        },
        {
          summary:
            'Indústria: a Nova Indústria Brasil, com crédito direcionado, compras do governo e exigência de conteúdo nacional, e uma nova edição do PAC somando dinheiro público e privado.',
          status: 'oficial',
          pages: '51, 53',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Contratar com carteira fica mais barato para jovens e para quem tem 50 anos ou mais, e a Caixa direciona crédito a pequenos negócios.',
        benefits: [
          'Pode facilitar a abertura de empresas e a formalização.',
          'Jovens sem experiência e pessoas mais velhas, que têm mais dificuldade de achar vaga, ganham uma porta de entrada.',
        ],
        risks: [
          'Sem política declarada para o salário mínimo, o rumo da renda de quem ganha o piso fica indefinido.',
          'Crédito por banco público também tem custo fiscal e risco de inadimplência.',
          'Contrato mais barato para alguns grupos pode só trocar uma vaga comum por outra mais barata, sem criar emprego novo; e o negociado acima da lei pode reduzir proteções onde o sindicato é fraco.',
        ],
      },
      lula: {
        mechanism:
          'Mais proteção legal e renda para o trabalhador, com o Estado puxando investimento industrial.',
        benefits: [
          'Mais tempo de descanso e renda maior para quem está empregado.',
          'Motoristas e entregadores de aplicativo passariam a ter cobertura previdenciária.',
        ],
        risks: [
          'Jornada menor com o mesmo salário eleva o custo por hora: empresas podem repassar a preços, automatizar ou contratar menos, sobretudo pequenos negócios.',
          'Regulação de aplicativos pode encarecer corridas e entregas ou reduzir vagas.',
          'O fim da 6x1 é emenda constitucional: segundo o plano, já passou na Câmara, mas ainda depende do Senado, onde a base de Lula é minoria.',
        ],
      },
      monitor: [
        'Taxa de desocupação e informalidade (PNAD Contínua, IBGE)',
        'Rendimento médio real do trabalho',
        'Saldo de empregos formais (Novo Caged)',
        'Endividamento das famílias (Banco Central)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'contas-publicas',
    icon: '🏛️',
    title: 'Contas públicas e tamanho do Estado',
    question: 'Como cada um pretende pagar o que promete — e o que isso tem a ver com os juros?',
    proposals: {
      flavio: [
        {
          summary:
            'Trocar as regras fiscais atuais por outras, para a dívida parar de crescer e depois cair “no menor prazo possível”, com as contas no azul e limite para os gastos não obrigatórios dos três Poderes. Não diz prazo nem valor.',
          status: 'oficial',
          pages: '71',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Enxugar a máquina: cortar pelo menos 10 ministérios, reduzir cargos de confiança e despesas administrativas, acabar com supersalários e “penduricalhos” e seguir com a reforma administrativa.',
          status: 'oficial',
          pages: '69',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Privatizar “com critério”, caso a caso, e apostar em concessões e PPPs para investir R$ 900 bilhões em quatro anos em estradas, ferrovias, hidrovias, portos e aeroportos.',
          status: 'oficial',
          pages: '50–51, 70',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Emendas parlamentares com mais transparência, controle e rastreamento de para onde vai o dinheiro.',
          status: 'oficial',
          pages: '69',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Proteger os fundos de pensão das estatais de indicação política e escolher os dirigentes das estatais com regras de mercado.',
          status: 'oficial',
          pages: '70',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Manter o arcabouço fiscal (a regra de gastos atual). O plano diz que as contas vão melhorar com crescimento, controle do aumento dos gastos e imposto mais justo, mas não traz metas em números.',
          status: 'oficial',
          pages: '49',
          sources: [S.planoLula],
        },
        {
          summary:
            'Aumentar o investimento no país, com mais dinheiro em infraestrutura de transporte e logística, para a produção nacional competir melhor, e em infraestrutura social.',
          status: 'oficial',
          pages: '48',
          sources: [S.planoLula],
        },
        {
          summary: 'Manter o ritmo das concessões de rodovias e acelerar as de ferrovias.',
          status: 'oficial',
          pages: '53',
          sources: [S.planoLula],
        },
        {
          summary:
            'Enfrentar o que o plano chama de “grave distorção” das emendas parlamentares (R$ 50 bilhões em 2026), levando o tema para debate com a sociedade.',
          status: 'oficial',
          pages: '15–16',
          sources: [S.planoLula],
        },
        {
          summary:
            'Orçamento com mais participação: um PPA 2028–2031 “ainda mais participativo” e o Portal da Transparência com dados abertos e inteligência artificial.',
          status: 'oficial',
          pages: '15, 18',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Estado menor e dívida em queda reduziriam o risco do país, abrindo espaço para juros mais baixos.',
        benefits: [
          'Juros menores barateiam financiamento, cartão e crédito para empresas.',
          'Concessões podem trazer investimento privado em infraestrutura.',
        ],
        risks: [
          'Ministérios e cargos comissionados são fatia pequena do orçamento; a maior parte da despesa é obrigatória (Previdência, salários, saúde, educação). O corte anunciado, sozinho, não fecha a conta de uma redução de impostos.',
          'Trocar a regra fiscal gera incerteza até a nova regra ser conhecida e aprovada.',
          'Privatização pode melhorar ou piorar tarifa e serviço, dependendo do contrato e da regulação.',
        ],
      },
      lula: {
        mechanism:
          'Manter as regras atuais e puxar o crescimento com investimento público e concessões, o que por sua vez aumentaria a arrecadação.',
        benefits: [
          'Previsibilidade: a regra é conhecida.',
          'Obras e concessões de estradas e ferrovias geram emprego e podem baratear o transporte do que o país produz.',
        ],
        risks: [
          'O plano promete controlar o aumento dos gastos, mas sem metas em números: se a dívida continuar subindo, os juros tendem a ficar altos — a Selic está em 13,75% ao ano.',
          'Juros altos encarecem o crédito das famílias e consomem orçamento que poderia ir para serviços.',
          'Mexer nas emendas parlamentares enfrenta resistência forte no Congresso.',
        ],
      },
      monitor: [
        'Resultado primário do governo central (Tesouro Nacional)',
        'Dívida bruta em % do PIB (Banco Central)',
        'Taxa Selic e juros do crédito às famílias',
        'Execução do investimento público',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'servicos-sociais',
    icon: '🏥',
    title: 'Saúde, educação e programas sociais',
    question: 'O que acontece com o SUS, a escola e os benefícios?',
    proposals: {
      flavio: [
        {
          summary:
            'Saúde: reajustar a tabela do SUS (o plano fala em “garantir as condições” para isso), contratar exames na rede privada nos horários vagos e atender mais por telessaúde e aplicativo.',
          status: 'oficial',
          pages: '37–38',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Escola: método fônico na alfabetização, mais escolas cívico-militares, ensino técnico no ensino médio junto com as empresas e educação “livre de doutrinação político-partidária”.',
          status: 'oficial',
          pages: '35–36',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Cuidado: Rede Nacional de Cuidado para idosos e pessoas com deficiência (centros-dia e atendimento em casa), voucher-creche onde faltar vaga pública e centros de referência em autismo.',
          status: 'oficial',
          pages: '21, 39',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Reforço e faculdade: o Programa Acolher paga alunos com bom desempenho para dar reforço aos colegas, e um financiamento estudantil só começa a ser pago quando a pessoa estiver empregada e ganhando.',
          status: 'oficial',
          pages: '35, 37',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O Bolsa Família não aparece pelo nome, nem com valor ou regras. O plano promete manter os programas sociais que já existem, com “correção de distorções e combate às fraudes”, e diz que quem depende deles não vai perder a ajuda.',
          status: 'nao-localizado',
          pages: '42',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Saúde: mais equipes de Saúde da Família, mais exames e cirurgias pelo “Agora tem Especialistas”, telessaúde e fila única digital no SUS, organizada pela gravidade de cada caso.',
          status: 'oficial',
          pages: '34–38',
          sources: [S.planoLula],
        },
        {
          summary:
            'Farmácia Popular continua 100% gratuito e passa a incluir exames de laboratório e de acompanhamento de doenças crônicas.',
          status: 'oficial',
          pages: '36',
          sources: [S.planoLula],
        },
        {
          summary:
            'Escola: 80% das crianças alfabetizadas na idade certa, prioridade total para o tempo integral, continuidade do Pé-de-Meia e expansão dos Institutos Federais.',
          status: 'oficial',
          pages: '31–33',
          sources: [S.planoLula],
        },
        {
          summary:
            'Assistência e cuidado: “manter, aperfeiçoar e ampliar” a proteção social, fortalecer o SUAS e dar escala à Política Nacional de Cuidados, que já existe (Cuidotecas, formação de cuidadores).',
          status: 'oficial',
          pages: '18, 25–26',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano não diz de onde sai o dinheiro para ampliar os programas e não traz compromisso específico com o Bolsa Família, que aparece só no balanço do governo atual.',
          status: 'nao-localizado',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Usar capacidade do setor privado e tecnologia para ampliar o atendimento sem expandir a máquina pública.',
        benefits: [
          'Comprar exames na rede privada pode encurtar filas rapidamente.',
          'Voucher dá à família a escolha da creche onde não há vaga pública.',
        ],
        risks: [
          'Atualizar a tabela do SUS custa caro e disputa espaço com a promessa de cortar impostos.',
          'Vouchers podem não resolver onde não existe oferta privada (cidades pequenas, periferias).',
          'O plano promete manter os programas sociais, mas não diz valor nem regras do Bolsa Família: quem depende dele fica sem saber como fica.',
        ],
      },
      lula: {
        mechanism: 'Ampliar a rede pública e os programas de transferência de renda já existentes.',
        benefits: [
          'Continuidade: quem usa a Farmácia Popular e o Pé-de-Meia sabe o que esperar, e a farmácia passaria a ter exames.',
          'Escola em tempo integral deixa a criança mais tempo aprendendo e libera os pais para o trabalho.',
        ],
        risks: [
          'Sem fonte de custeio indicada, a ampliação depende de mais arrecadação ou mais dívida.',
          'Expandir programas não garante qualidade: filas e resultados de aprendizagem precisam ser medidos.',
          'Orçamento disputado com emendas parlamentares, que cresceram muito nos últimos anos.',
        ],
      },
      monitor: [
        'Tempo de espera por exames e cirurgias no SUS',
        'Taxa de alfabetização na idade certa e Ideb (Inep)',
        'Famílias atendidas e valor médio do Bolsa Família',
        'Fila de benefícios do INSS',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'seguranca',
    icon: '🛡️',
    title: 'Segurança pública',
    question: 'Como cada um pretende enfrentar o crime?',
    proposals: {
      flavio: [
        {
          summary:
            'Declarar PCC, CV, milícias e outras facções “organizações narcoterroristas”, sufocar o dinheiro delas e retomar os territórios dominados pelo crime.',
          status: 'oficial',
          pages: '13',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Maioridade penal de 18 para 16 anos (e punição para maiores de 14 em crimes graves) e fim da progressão de regime para crimes hediondos.',
          status: 'oficial',
          pages: '13, 15',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Tropa de elite das Forças Armadas nas fronteiras e a “Muralha Brasileira”: reconhecimento facial com mais de 1 milhão de câmeras novas.',
          status: 'oficial',
          pages: '13, 15',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Presídios: 5 de segurança máxima no modelo de El Salvador e meio milhão de vagas novas em 4 anos.',
          status: 'oficial',
          pages: '14',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Castração química para condenados por estupro e por abuso de crianças, e o dobro de investimento federal em segurança ao longo do mandato.',
          status: 'oficial',
          pages: '14–15',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Criar o Ministério da Segurança Pública, depois que for aprovada a PEC da Segurança, para coordenar União, estados e municípios no SUSP.',
          status: 'oficial',
          pages: '30',
          sources: [S.planoLula],
        },
        {
          summary:
            'Continuar a “asfixia financeira” do crime organizado e das milícias: ir atrás do dinheiro das facções.',
          status: 'oficial',
          pages: '27',
          sources: [S.planoLula],
        },
        {
          summary:
            'Manter o controle de armas e munições, melhorar o rastreamento delas e continuar ampliando o Celular Seguro.',
          status: 'oficial',
          pages: '28–29',
          sources: [S.planoLula],
        },
        {
          summary:
            'Presídios federais com mais espaço para isolar líderes de facção e um protocolo nacional para classificar e transferir presos perigosos.',
          status: 'oficial',
          pages: '28',
          sources: [S.planoLula],
        },
        {
          summary:
            'Câmeras corporais nos policiais, com padrão nacional, e R$ 10 bilhões do FIIS (um fundo federal) para estados e municípios.',
          status: 'oficial',
          pages: '27–28, 30',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Penas mais duras e mais presença ostensiva para aumentar o custo de cometer crimes.',
        benefits: [
          'Resposta rápida a uma demanda concreta por punição e policiamento.',
          'Vigilância por câmeras pode ajudar a localizar foragidos.',
        ],
        risks: [
          'A maioridade penal está na Constituição: mudar exige 3/5 do Congresso e pode ser questionado no STF.',
          'Mais prisões num sistema superlotado e dominado por facções pode fortalecer essas mesmas facções.',
          'Reconhecimento facial tem registro de erros de identificação e levanta questões de privacidade.',
        ],
      },
      lula: {
        mechanism: 'Coordenação federal, inteligência e corte do dinheiro e das armas do crime.',
        benefits: [
          'Integração de dados entre polícias ataca um gargalo conhecido.',
          'Seguir o dinheiro atinge o comando das organizações, não só a ponta.',
        ],
        risks: [
          'A polícia é dos estados: a União coordena, mas não manda. O efeito depende de adesão dos governadores.',
          'Criar ministério não reduz crime por si só; pode ser só mudança de organograma.',
          'Resultados de inteligência demoram e são pouco visíveis no curto prazo.',
        ],
      },
      monitor: [
        'Homicídios por 100 mil habitantes (Anuário Brasileiro de Segurança Pública)',
        'Roubos e furtos registrados',
        'População carcerária e déficit de vagas (Senappen)',
        'Apreensões e bloqueios de bens do crime organizado',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'instituicoes',
    icon: '⚖️',
    title: 'Democracia, Justiça e instituições',
    question: 'O que cada um propõe mudar nas regras do jogo?',
    proposals: {
      flavio: [
        {
          summary:
            'STF: limitar as decisões tomadas por um ministro sozinho (monocráticas), dando preferência às decisões em grupo.',
          status: 'oficial',
          pages: '65',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Deputados e senadores deixariam de ser julgados direto no STF em casos criminais, e ministro de Estado teria de esperar 1 ano para ser indicado ao Supremo.',
          status: 'oficial',
          pages: '65',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Fim da reeleição para presidente (o plano cita uma PEC do próprio Flávio no Senado).',
          status: 'oficial',
          pages: '66',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Acabar com estruturas que o plano chama de “Ministério da Verdade” e revogar atos do governo atual que ele classifica como censura.',
          status: 'oficial',
          pages: '66',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Reforma política “urgente” e prioritária: menos partidos, com mais “nitidez programática”, e mais proximidade entre eleitor e eleito, sem detalhar como.',
          status: 'oficial',
          pages: '66',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Mais participação: continuar as conferências nacionais e o controle social sobre as políticas públicas.',
          status: 'oficial',
          pages: '15',
          sources: [S.planoLula],
        },
        {
          summary:
            'Regular redes sociais e plataformas digitais para impedir que espalhem desinformação. O plano diz também que nenhuma democracia sobrevive sem liberdade de expressão plena.',
          status: 'oficial',
          pages: '16',
          sources: [S.planoLula],
        },
        {
          summary:
            'Reforma política e eleitoral, que o plano chama de “inadiável”, mas sem dizer como seria.',
          status: 'oficial',
          pages: '15',
          sources: [S.planoLula],
        },
        {
          summary: 'Regras rígidas para barrar candidatos ligados ao crime organizado.',
          status: 'oficial',
          pages: '27',
          sources: [S.planoLula],
        },
        {
          summary: 'Aprofundar o plano de combate à corrupção, “inclusive os do andar de cima”.',
          status: 'oficial',
          pages: '18',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Reduzir o poder individual de ministros do STF e o incentivo eleitoral de quem está no cargo.',
        benefits: [
          'Decisões colegiadas dão mais previsibilidade do que liminares individuais.',
          'Sem reeleição, o governante tem menos incentivo para usar a máquina na campanha.',
        ],
        risks: [
          'Mudanças no Judiciário feitas por uma maioria política podem enfraquecer um freio ao próprio governo.',
          'Com o Senado mais alinhado, a fiscalização sobre indicações ao STF tende a ser menor.',
          'Menos estrutura contra desinformação pode aumentar a circulação de conteúdo falso.',
        ],
      },
      lula: {
        mechanism: 'Ampliar canais de participação e criar regras para as plataformas digitais.',
        benefits: [
          'Regras claras podem obrigar plataformas a agir contra golpes, fraudes e conteúdo ilegal.',
          'Conselhos aproximam políticas públicas de quem as utiliza.',
        ],
        risks: [
          'Regular plataformas levanta risco real de restrição à liberdade de expressão, dependendo de quem decide o que sai do ar.',
          'Conselhos podem ser ocupados por grupos alinhados ao governo.',
          'O plano não propõe mudanças no funcionamento do STF, tema que parte da população considera prioritário.',
        ],
      },
      monitor: [
        'Propostas de emenda à Constituição sobre o Judiciário em tramitação',
        'Indicações e sabatinas para o STF no Senado',
        'Texto final de qualquer lei sobre plataformas digitais',
        'Vetos presidenciais e sua derrubada pelo Congresso',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'previdencia',
    icon: '👵',
    title: 'Aposentados e Previdência',
    question: 'O que acontece com a aposentadoria, a fila e as fraudes no INSS?',
    proposals: {
      flavio: [
        {
          summary:
            'Fila do INSS: digitalizar os processos (seguindo o Meu INSS) e trocar a gestão “voltada a entidades sindicais” por uma gestão profissional, medida pelo tempo que o aposentado espera para receber.',
          status: 'oficial',
          pages: '26, 73',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Reeditar um pacote antifraude na Previdência “nos moldes do que fizemos em 2019”, quando uma medida provisória passou a exigir que o aposentado reconfirmasse todo ano os descontos de associações no benefício.',
          status: 'oficial',
          pages: '72',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Consignado do INSS (empréstimo descontado direto do benefício): rever quem opera esses descontos e como são autorizados, com dupla checagem para impedir cobrança que o aposentado não autorizou.',
          status: 'oficial',
          pages: '72–73',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Idosos: programa Casa Segura para Envelhecer, que ajuda famílias de menor renda a adaptar a casa, aplicativo de companhia com alerta de perigo, mais instituições de longa permanência (casas de repouso) e atendimento facilitado no SUS.',
          status: 'oficial',
          pages: '37, 39',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não diz se vai mudar as regras de aposentadoria (idade, tempo de contribuição, cálculo ou reajuste dos benefícios) nem como pretende lidar com o déficit da Previdência. Cita só uma “revisão normativa infralegal” (portarias e instruções, abaixo da lei) que inclui a área previdenciária.',
          status: 'nao-localizado',
          pages: '69',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Concluir no próximo mandato a modernização do atendimento do INSS, para reduzir a fila e o tempo de espera, e voltar a avisar o trabalhador por carta, em casa, quando ele tiver direito ao benefício. Segundo o plano, esse trabalho já está em andamento.',
          status: 'oficial',
          pages: '77',
          sources: [S.planoLula],
        },
        {
          summary:
            'Reestruturar o financiamento da Previdência, buscando “diversidade das fontes de custeio”, em diálogo com a sociedade. O plano não diz quais seriam essas fontes.',
          status: 'oficial',
          pages: '77',
          sources: [S.planoLula],
        },
        {
          summary:
            'Criar formas mais flexíveis de contribuir, para que quem alterna períodos com e sem carteira, ou tem vários trabalhos, não perca a proteção ao longo da vida.',
          status: 'oficial',
          pages: '77',
          sources: [S.planoLula],
        },
        {
          summary:
            'Incluir na regulação dos aplicativos a contribuição para a Previdência e a cobertura de aposentadoria, afastamento, acidente e maternidade, e ampliar a proteção previdenciária de autônomos e pequenos empreendedores.',
          status: 'oficial',
          pages: '76–77',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano não fala de combate a fraudes no INSS nem diz se pretende mudar regras como idade mínima e tempo de contribuição. Critica a reforma da Previdência de 2019, mas não propõe revertê-la.',
          status: 'nao-localizado',
          pages: '77',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Mais tecnologia e gestão profissional no INSS para reduzir a fila, e controles mais rígidos sobre descontos e consignado para barrar fraudes.',
        benefits: [
          'Fila menor significa receber antes um benefício a que a pessoa já tem direito.',
          'Dupla checagem no consignado dificulta descontos que o aposentado não autorizou.',
        ],
        risks: [
          'Atendimento cada vez mais digital pode deixar para trás idosos sem internet ou pouco habituados ao celular.',
          'Revisões em massa contra fraude podem suspender benefícios legítimos por erro de cadastro.',
          'Sem dizer o que fará com as regras da Previdência, a maior despesa do governo, o plano deixa em aberto como ela cabe no ajuste fiscal prometido.',
        ],
      },
      lula: {
        mechanism:
          'Digitalizar o INSS para acelerar a concessão de benefícios e trazer mais gente para dentro da Previdência, inclusive informais e trabalhadores de aplicativo.',
        benefits: [
          'Fila menor significa receber o benefício mais cedo, sem precisar de intermediário.',
          'Mais trabalhadores contribuindo amplia a proteção em caso de doença, acidente e velhice.',
        ],
        risks: [
          'A Previdência é a maior despesa do governo federal e cresce com o envelhecimento e com o mínimo acima da inflação; o plano não diz como fecha essa conta.',
          '“Novas fontes de custeio” podem significar novos tributos, e a contribuição obrigatória nos aplicativos pode reduzir o ganho de motoristas e entregadores ou encarecer o serviço.',
          'Sem menção a fraudes, não fica claro como o governo pretende evitar novos descontos indevidos nos benefícios.',
        ],
      },
      monitor: [
        'Tamanho e tempo de espera da fila do INSS',
        'Déficit da Previdência (Tesouro Nacional)',
        'Reajuste e valor médio dos benefícios',
        'Fraudes e descontos indevidos apurados (CGU/INSS)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'cidades',
    icon: '🏙️',
    title: 'Cidades e moradia',
    question: 'Casa, água, esgoto e transporte: o que cada um propõe?',
    proposals: {
      flavio: [
        {
          summary:
            'Retomar o Casa Verde e Amarela, com meta de 2,5 milhões de moradias e “a menor taxa de juros possível”, e regularizar a posse de quem já mora há anos no mesmo lugar, de preferência com a escritura no nome da mulher.',
          status: 'oficial',
          pages: '47',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Urbanizar áreas degradadas para evitar deslizamentos em encostas e reduzir os “vazios urbanos”, com PPPs (parcerias público-privadas) que juntem moradia e infraestrutura no mesmo contrato.',
          status: 'oficial',
          pages: '47',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Saneamento: aplicar por completo o Marco Legal do Saneamento e acelerar concessões e parcerias para levar água e esgoto a todos, inclusive na zona rural. Promete ainda nenhuma escola sem água até 2030 e o fim dos lixões a céu aberto (programa Lixão Zero).',
          status: 'oficial',
          pages: '47–48',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Transporte: bancos públicos vão dar prioridade ao financiamento de metrô, trens e ônibus elétricos ou a biocombustível. E o Trem do Nordeste: 1.400 km de trilhos para passageiros ligando sete capitais, de Salvador a Fortaleza.',
          status: 'oficial',
          pages: '51, 60',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Enchentes e secas: barragens, reservatórios para controlar cheias, diques e obras de drenagem, mais monitoramento e alerta da Defesa Civil, e conclusão de obras de água no Nordeste, como o Ramal do Apodi e a Adutora do Seridó.',
          status: 'oficial',
          pages: '52',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Minha Casa Minha Vida mantido e ampliado para todas as faixas de renda, com foco nas famílias mais pobres e uso de terrenos da União para construir. O plano também promete dinheiro garantido para concluir as obras de urbanização de favelas do Periferia Viva.',
          status: 'oficial',
          pages: '45–46',
          sources: [S.planoLula],
        },
        {
          summary:
            'Saneamento e lixo: apoiar estados e municípios para levar água tratada e esgoto a todos, com prioridade para as periferias, e continuar apoiando a gestão do lixo, incluindo a produção de biogás.',
          status: 'oficial',
          pages: '46–47',
          sources: [S.planoLula],
        },
        {
          summary:
            'Transporte público: apoiar sistemas de alta capacidade (metrô, trens, VLT e corredores de ônibus) e a troca gradual da frota por ônibus elétricos, dando preferência a equipamentos fabricados no Brasil.',
          status: 'oficial',
          pages: '46',
          sources: [S.planoLula],
        },
        {
          summary:
            'Desastres: aprimorar a Defesa Civil, ampliar o investimento em prevenção (o governo diz já ter aplicado R$ 25 bilhões em encostas e drenagem) e estimular planos estaduais e municipais contra o calor extremo.',
          status: 'oficial',
          pages: '47, 72–73',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano cita o “elevado custo das tarifas” do transporte coletivo como problema, mas não propõe nenhuma medida para baixar o preço da passagem.',
          status: 'nao-localizado',
          pages: '46',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Financiamento da casa própria com juros baixos e parcerias com empresas (concessões e PPPs) para levar moradia, saneamento e transporte, com bancos públicos financiando.',
        benefits: [
          'Água e esgoto tratados reduzem doenças, sobretudo em crianças, e as concessões podem acelerar as obras.',
          'Escritura no nome da família transforma a casa em patrimônio que pode ser herdado e servir de garantia.',
        ],
        risks: [
          'Juros baixos no financiamento habitacional dependem de subsídio, o que pesa nas contas públicas.',
          'Concessões de saneamento podem subir tarifas ou deixar de fora áreas pouco lucrativas, se o contrato não exigir atendimento.',
          'O plano não diz quanto dinheiro federal irá para transporte e prevenção de desastres, nem dá prazo para acabar com os lixões.',
        ],
      },
      lula: {
        mechanism:
          'Dinheiro federal, via Novo PAC e Minha Casa Minha Vida, repassado a estados, municípios e construtoras para moradia, saneamento, transporte e prevenção de desastres.',
        benefits: [
          'Moradia subsidiada e esgoto tratado têm efeito direto na renda, na saúde e na valorização do bairro.',
          'Obras de encostas e drenagem reduzem mortes e perdas em deslizamentos e enchentes.',
        ],
        risks: [
          'Os subsídios do MCMV e as obras dependem de orçamento e do FGTS, disputados com outras despesas.',
          'Obras federais tocadas por municípios costumam atrasar ou parar; o próprio plano cita obras paralisadas desde 2014.',
          'Sem medida para a tarifa, o custo da passagem continua pesando no bolso de quem usa ônibus, trem e metrô.',
        ],
      },
      monitor: [
        'Déficit habitacional (Fundação João Pinheiro)',
        'Acesso a água e esgoto (SNIS)',
        'Moradias contratadas pelo programa habitacional federal',
        'Tempo de deslocamento casa–trabalho (IBGE)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'mulheres-igualdade',
    icon: '👩🏽',
    title: 'Mulheres e igualdade',
    question: 'Violência, trabalho e igualdade: o que muda para mulheres, negros e indígenas?',
    proposals: {
      flavio: [
        {
          summary:
            'Central da Mulher: um lugar só, físico e no aplicativo, para acolhimento, orientação jurídica, apoio psicológico, emprego, crédito e benefícios, com unidades em caminhões e barcos. Também promete mais abrigos para mulheres em situação de violência.',
          status: 'oficial',
          pages: '17–18, 20',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Denúncia: juntar Ligue 180, delegacias online e botão de emergência numa só plataforma, com pedido de medida protetiva pelo chat da ClarIA (uma assistente virtual com inteligência artificial) e um sistema nacional que avalia o risco de cada caso.',
          status: 'oficial',
          pages: '18–19',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Agressores: tornozeleira eletrônica para quem está sob medida protetiva (numa página o plano fala em todos, em outra só nos casos de maior risco) e cumprimento da pena inteira para assassinos e agressores de mulheres.',
          status: 'oficial',
          pages: '14, 19',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Renda própria: cursos gratuitos com certificado na Escola Brasil por Elas (IA, programação, finanças, idiomas) e o “Ganha, Ganha”, que dá pontos por atitudes como concluir curso e pagar contas em dia, trocáveis por juros menores e cashback.',
          status: 'oficial',
          pages: '19–20',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não trata de igualdade racial nem de salário igual para mulheres e homens. Sobre indígenas e quilombolas, diz só que terão “autonomia” para decidir sobre atividades produtivas em suas terras, com indenização por eventuais restrições.',
          status: 'nao-localizado',
          pages: '50',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Concluir 30 Casas da Mulher Brasileira e 15 Centros de Referência da Mulher Brasileira, ampliar as Salas Lilás (atendimento reservado a vítimas de violência) e enviar aos estados kits para monitorar agressores.',
          status: 'oficial',
          pages: '21',
          sources: [S.planoLula],
        },
        {
          summary:
            'Trabalho e renda delas: tornar obrigatórios, nas empresas com diferença de salário entre homens e mulheres, os planos de ação da Lei de Igualdade Salarial, com metas. Manter crédito favorecido do Pronaf para agricultoras e a qualificação pelo Mulheres Mil.',
          status: 'oficial',
          pages: '21, 75',
          sources: [S.planoLula],
        },
        {
          summary:
            'Igualdade racial: avançar na regulamentação do Estatuto da Igualdade Racial, manter as cotas no serviço público e acelerar a titulação de territórios quilombolas.',
          status: 'oficial',
          pages: '19–20',
          sources: [S.planoLula],
        },
        {
          summary:
            'Povos indígenas: seguir com a demarcação de terras e a retirada de invasores “sempre que necessárias” e colocar em funcionamento pleno a Universidade Indígena, criada em 2026.',
          status: 'oficial',
          pages: '20',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano promete “garantir os direitos sexuais e reprodutivos”, mas não diz o que isso inclui nem se pretende mudar alguma lei. Também não diz quantas terras indígenas pretende demarcar, nem em que prazo.',
          status: 'nao-localizado',
          pages: '20–21',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Um ponto único de atendimento, presencial e por aplicativo, para proteção, emprego e crédito, com monitoramento eletrônico dos agressores.',
        benefits: [
          'Juntar os canais de denúncia e avaliar o risco de cada caso pode acelerar a resposta nos casos mais graves.',
          'Capacitação e crédito ajudam a mulher a ter renda própria, o que facilita sair de uma relação violenta.',
        ],
        risks: [
          'Monitorar por tornozeleira os agressores de mais de meio milhão de mulheres exige equipamentos e centrais em escala muito maior que a atual.',
          'App e ClarIA dependem de a mulher ter celular e internet com segurança, o que nem sempre acontece quando o agressor controla o aparelho.',
          'A Central da Mulher depende de estados e municípios, e o plano não diz quantas unidades nem quanto vão custar.',
        ],
      },
      lula: {
        mechanism:
          'Ampliar a rede pública de atendimento a vítimas de violência e usar lei, fiscalização e políticas de terra para reduzir desigualdades de gênero e raça.',
        benefits: [
          'Mais Casas da Mulher e monitoramento de agressores podem acelerar o atendimento e a proteção de quem tem medida protetiva.',
          'Planos de ação obrigatórios dão meta e cobrança à igualdade salarial, que hoje depende muito de denúncia.',
        ],
        risks: [
          'Os equipamentos dependem de estados e municípios para funcionar com equipe e horário; sem isso, viram prédio vazio.',
          'Exigências às empresas aumentam custo e burocracia e podem acabar em disputa judicial.',
          'Demarcação de terras indígenas e titulação quilombola costumam gerar conflito com produtores rurais e resistência no Congresso.',
        ],
      },
      monitor: [
        'Feminicídios e violência doméstica (Anuário Brasileiro de Segurança Pública)',
        'Diferença de salário entre homens e mulheres (IBGE)',
        'Medidas protetivas concedidas e descumpridas',
        'Desigualdade de renda por cor ou raça (IBGE)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'campo',
    icon: '🌾',
    title: 'Campo e agronegócio',
    question: 'O que muda para quem produz no campo — e para o preço da comida?',
    proposals: {
      flavio: [
        {
          summary:
            'Retomar a entrega de títulos de terra ao pequeno proprietário rural no ritmo do governo Bolsonaro (o plano cita mais de 450 mil títulos) e dar segurança “irreversível” ao direito de propriedade.',
          status: 'oficial',
          pages: '27, 54',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Dívidas do produtor: criar ferramentas de “securitização e reorganização das dívidas do setor” (trocar a dívida por papéis com prazo mais longo). E quem recebe programa social poderá aceitar trabalho temporário no campo e voltar ao benefício se precisar.',
          status: 'oficial',
          pages: '54',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Irrigação: ampliar “significativamente” a área irrigada, encurtar a outorga (a autorização para usar a água, que hoje leva em média 24 meses), criar polos no Matopiba e no semiárido nordestino e concluir a expansão do Baixio do Irecê, na Bahia.',
          status: 'oficial',
          pages: '27, 54–55, 60',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Um sistema único para o produtor informar tudo uma vez só (cadastro da terra e ambiental, guias de transporte de animais, autorizações de desmate, imagens de satélite), com rastreio da origem da produção. E mais pagamento a quem preserva mata nativa ou recupera área degradada.',
          status: 'oficial',
          pages: '28, 55',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não fala em agricultura familiar, em Pronaf (o crédito para pequenos agricultores) nem em reforma agrária. O Plano Safra aparece uma vez só, para incentivar a produção de biomassa.',
          status: 'nao-localizado',
          pages: '55',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Campo como fonte de energia limpa: cumprir as metas de combustível sustentável de aviação a partir de 2027 e ligar o Plano Safra a incentivos para produzir biomassa.',
          status: 'oficial',
          pages: '55',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Ampliar os recursos do Plano Safra, com juros compatíveis com a rentabilidade do produtor, dando prioridade a máquinas, irrigação e tecnologia, e com acesso ao crédito menos burocrático.',
          status: 'oficial',
          pages: '61',
          sources: [S.planoLula],
        },
        {
          summary:
            'Criar um programa nacional de resiliência climática no campo: mais áreas irrigadas, conservação do solo, plantio direto e sistemas de alerta do tempo mais modernos para o produtor.',
          status: 'oficial',
          pages: '61',
          sources: [S.planoLula],
        },
        {
          summary:
            'Reforçar o seguro rural e, em conversa com o setor, criar um instrumento para cobrir quebras severas de safra causadas por catástrofes. Na agricultura familiar, fortalecer o Garantia-Safra (ajuda a quem perde a safra por seca ou excesso de chuva).',
          status: 'oficial',
          pages: '60, 62',
          sources: [S.planoLula],
        },
        {
          summary:
            'Seguir com a reforma agrária (assentar famílias acampadas e ampliar o crédito para compra de terra) e com a regularização fundiária, sobretudo no Norte, para dar segurança jurídica a quem produz.',
          status: 'oficial',
          pages: '60',
          sources: [S.planoLula],
        },
        {
          summary:
            'Acelerar a produção nacional de fertilizantes (a Petrobras já retomou fábricas) e incentivar bioinsumos (adubos e defensivos de origem biológica) para depender menos de adubo químico importado.',
          status: 'oficial',
          pages: '60, 63',
          sources: [S.planoLula],
        },
        {
          summary:
            'Pecuária e pesquisa: ajudar o produtor a rastrear cada animal do rebanho, do nascimento ao abate, para atender às exigências de quem compra lá fora, e fortalecer a Embrapa (a empresa pública de pesquisa agropecuária).',
          status: 'oficial',
          pages: '62',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Título da terra, menos burocracia na irrigação e renegociação de dívidas para dar ao produtor segurança para investir e acesso a crédito.',
        benefits: [
          'Com o título da terra, o pequeno produtor pode dar o imóvel como garantia e conseguir crédito.',
          'Outorga de água mais rápida e mais área irrigada aumentam a produção e reduzem a dependência da chuva.',
        ],
        risks: [
          'Titulação acelerada sem checagem rigorosa pode acabar regularizando terra grilada.',
          'Renegociar dívidas rurais costuma ter custo para o Tesouro, e o próprio plano promete limitar o crédito subsidiado com dinheiro público.',
          'Sem política declarada para a agricultura familiar, o rumo do crédito do Pronaf fica indefinido.',
        ],
      },
      lula: {
        mechanism:
          'Crédito público com juros subsidiados, seguro e investimento em irrigação e fertilizantes para produzir mais e perder menos com o clima.',
        benefits: [
          'Seguro e cobertura para catástrofes reduzem o risco de o produtor quebrar depois de uma seca ou enchente.',
          'Fertilizante nacional diminui a exposição a guerras e à alta do dólar, que encarecem a produção e a comida.',
        ],
        risks: [
          'O subsídio aos juros do Plano Safra é pago pelo Tesouro, e com a Selic alta esse custo cresce.',
          'Fábricas de fertilizantes da Petrobras exigem investimento alto e podem produzir mais caro que o importado.',
          'Reforma agrária e regularização fundiária envolvem disputa por terra e dependem de orçamento e de processos lentos.',
        ],
      },
      monitor: [
        'Safra de grãos (Conab)',
        'Crédito rural contratado (Banco Central)',
        'Preço dos alimentos no IPCA (IBGE)',
        'Conflitos no campo e regularização de terras (Incra)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'meio-ambiente-energia',
    icon: '🌱',
    title: 'Meio ambiente e energia',
    question: 'Como ficam a natureza, o clima e a energia que chega à sua casa?',
    proposals: {
      flavio: [
        {
          summary:
            'Zerar o desmatamento ilegal até 2029 e combater as queimadas ilegais com satélite, inteligência artificial e ação conjunta dos órgãos federais. O plano diz que o rigor deve mirar o crime organizado, e não o morador da floresta.',
          status: 'oficial',
          pages: '58–59',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Acabar com a sobreposição de funções entre Ibama, Funai e ICMBio (órgãos que cuidam de fiscalização ambiental, terras indígenas e áreas protegidas) e exigir que ONGs com dinheiro estrangeiro que processam a União revelem quem as financia.',
          status: 'oficial',
          pages: '59',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Licença ambiental com prazo definido: se o órgão não decidir dentro do prazo, e o empreendedor tiver entregado tudo o que a norma exige, a licença sai. Para grandes projetos, regras garantidas por até 20 anos.',
          status: 'oficial',
          pages: '49–50',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Energia: liberar a exploração de gás por fracking (fraturamento de rochas no subsolo) “com responsabilidade ambiental” e ampliar os gasodutos para aproveitar o gás do pré-sal. Também quer fazer do Brasil uma “potência de biocombustíveis” e vender créditos de carbono ao exterior.',
          status: 'oficial',
          pages: '52–53',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não traz meta de corte de emissões de gases do efeito estufa nem cita o Acordo de Paris ou a mudança do clima. O tema aparece só como “eventos climáticos extremos”, na parte de obras contra enchentes.',
          status: 'nao-localizado',
          pages: '52',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Minerais críticos: transformar aqui dentro lítio, nióbio, terras-raras e outros minerais usados em baterias, chips e carros elétricos, em vez de só exportar a pedra bruta. O Estado seria regulador, não empresário, e o plano quer atrair capital estrangeiro.',
          status: 'oficial',
          pages: '55',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não trata de proteção animal: não fala de castração, cadastro de cães e gatos nem de punição por maus-tratos.',
          status: 'nao-localizado',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Manter a meta de desmatamento líquido zero até 2030 (o que for derrubado é compensado com floresta recuperada), com os planos de controle do desmatamento e o plano nacional contra incêndios, que já existem.',
          status: 'oficial',
          pages: '70',
          sources: [S.planoLula],
        },
        {
          summary:
            'Ampliar o monitoramento por satélite e o uso de inteligência artificial contra crimes ambientais, e negociar com as empresas regras de rastreamento para saber de onde vêm os produtos.',
          status: 'oficial',
          pages: '72',
          sources: [S.planoLula],
        },
        {
          summary:
            'Mais energia renovável: investir em baterias para guardar energia, seguir com os leilões de linhas de transmissão, acelerar a redução da produção de carvão e trocar aos poucos combustíveis fósseis por biocombustíveis.',
          status: 'oficial',
          pages: '64–65',
          sources: [S.planoLula],
        },
        {
          summary:
            'Petrobras: ampliar a exploração de petróleo em terra e no mar, aumentar o refino e voltar ao ramo de distribuição de combustíveis (o elo entre as refinarias e os postos). Ao mesmo tempo, investir em fontes de baixo carbono, seguindo o Acordo de Paris.',
          status: 'oficial',
          pages: '67',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano não diz se vai abrir novas frentes de petróleo em áreas ambientalmente sensíveis, nem traz meta para reduzir a produção. Diz só que as novas reservas terão “cuidados socioambientais ainda maiores” e que o governo acompanha o debate sobre um “mapa do caminho” para longe dos combustíveis fósseis.',
          status: 'nao-localizado',
          pages: '67, 71',
          sources: [S.planoLula],
        },
        {
          summary:
            'Outras fontes de energia: manter o programa nuclear só para uso pacífico, avançar na produção do próprio combustível nuclear e usar o urânio “de forma responsável”, e aprimorar o RenovaBio (a política nacional de biocombustíveis), com mais participação da Petrobras.',
          status: 'oficial',
          pages: '68',
          sources: [S.planoLula],
        },
        {
          summary:
            'Animais: ampliar o ProPatinhas (caravanas de castração de cães e gatos) e continuar o SinPatinhas, o cadastro nacional de cães e gatos.',
          status: 'oficial',
          pages: '71',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Fiscalização com satélite e IA mirando o crime ambiental, licença com prazo para destravar obras e incentivo a quem preserva, junto com mais exploração de gás e biocombustíveis.',
        benefits: [
          'Licença com prazo definido pode destravar obras de energia, logística e saneamento que hoje esperam anos.',
          'Pagar a quem preserva e vender créditos de carbono pode transformar a floresta em pé em fonte de renda.',
        ],
        risks: [
          'Licença concedida por falta de resposta do órgão pode liberar projetos sem análise ambiental completa e tende a ser contestada na Justiça.',
          'O fracking tem risco de contaminar água e solo, e costuma enfrentar resistência e disputa judicial.',
          'Sem meta de emissões e com a meta de desmatamento limitada ao ilegal, o compromisso com o clima fica difícil de medir e cobrar.',
        ],
      },
      lula: {
        mechanism:
          'Fiscalização e monitoramento contra o desmatamento, somados a investimento público e da Petrobras tanto em renováveis e biocombustíveis quanto em petróleo e gás.',
        benefits: [
          'Menos desmatamento reduz emissões e protege as chuvas que abastecem cidades e lavouras.',
          'Baterias e mais linhas de transmissão ajudam a aproveitar a energia solar e eólica que hoje às vezes é desperdiçada.',
        ],
        risks: [
          'Ampliar a exploração de petróleo vai na direção contrária à redução de emissões, e o plano não diz como concilia as duas coisas.',
          'Voltar à distribuição e ampliar o refino exige muito capital da Petrobras e pode reduzir o lucro e os dividendos que vão para o Tesouro.',
          'O resultado contra o desmatamento depende de estados, de orçamento para fiscalização e de o Congresso não afrouxar as leis ambientais.',
        ],
      },
      monitor: [
        'Desmatamento na Amazônia e no Cerrado (Inpe)',
        'Emissões de gases de efeito estufa (SEEG)',
        'Tarifa média de energia elétrica (Aneel)',
        'Preço da gasolina e do diesel (ANP)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'tecnologia',
    icon: '💻',
    title: 'Tecnologia e internet',
    question: 'Internet, serviços digitais e inovação: o que cada um propõe?',
    proposals: {
      flavio: [
        {
          summary:
            'Internet como infraestrutura: garantir pacotes de conexão para quem não tem, começando pelas mulheres do Brasil por Elas, e levar sinal a escolas, áreas rurais e regiões de fronteira com pouca cobertura.',
          status: 'oficial',
          pages: '18, 24',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Governo digital: identidade digital única no Gov.br, fim da exigência de reapresentar documentos que o governo já tem e assistentes automáticos (inclusive por voz) que indicam os serviços a que cada um tem direito. Meta de 100% dos serviços federais digitalizáveis.',
          status: 'oficial',
          pages: '25',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Inteligência artificial: uma Estratégia Nacional de IA para levá-la às pequenas e médias empresas, atrair data centers com energia barata e renovável e uma lei de “liberdade de criar e inovar”, para a tecnologia não ser travada por regras.',
          status: 'oficial',
          pages: '53, 56',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Ciência: o ensino superior passa para o Ministério da Ciência e Tecnologia, e CAPES e CNPq (agências que pagam bolsas de pesquisa) passam a priorizar inovação e uso pela indústria. Também promete fortalecer parques tecnológicos, incubadoras e startups.',
          status: 'oficial',
          pages: '36, 56–57',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Saúde digital: prontuário eletrônico único ligado ao CPF, válido nas redes pública e privada, com consentimento do paciente e seguindo a LGPD (Lei Geral de Proteção de Dados), e IA para encaixar o paciente na primeira vaga de consulta ou exame.',
          status: 'oficial',
          pages: '26',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Internet: diminuir a falta de fibra óptica, que ainda atinge 11% dos municípios, ampliar o 5G no campo, com prioridade para Norte, Nordeste e periferias, e levar internet de qualidade a todas as escolas.',
          status: 'oficial',
          pages: '32, 55',
          sources: [S.planoLula],
        },
        {
          summary:
            'Inteligência artificial nacional: desenvolver modelos de linguagem em português, supercomputadores operados por instituições brasileiras e regras para data centers, que teriam de usar energia renovável e dar contrapartidas ao país.',
          status: 'oficial',
          pages: '54–55',
          sources: [S.planoLula],
        },
        {
          summary:
            'Governo digital: universalizar os serviços públicos pela internet, melhorar plataformas como o Gov.br, criar uma Política Nacional de Letramento Digital (ensinar a usar a internet com segurança e senso crítico) e um Conselho Nacional pela Soberania Digital.',
          status: 'oficial',
          pages: '17',
          sources: [S.planoLula],
        },
        {
          summary:
            'Ciência: manter o FNDCT (principal fundo federal de pesquisa) sem verba bloqueada e seguir com o Conhecimento Brasil, programa para cientistas brasileiros ficarem ou voltarem ao país.',
          status: 'oficial',
          pages: '51',
          sources: [S.planoLula],
        },
        {
          summary:
            'Regras de transparência para algoritmos e identificação de conteúdo gerado por IA (como vídeos e áudios falsos), a cargo de um Centro Nacional de Transparência Algorítmica.',
          status: 'oficial',
          pages: '55',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Conectar quem está fora da internet e concentrar serviços, documentos e histórico de saúde num cadastro digital único ligado ao Gov.br e ao CPF.',
        benefits: [
          'Serviços pelo celular e sem reapresentar documentos economizam tempo e dias de trabalho.',
          'Prontuário único evita exames repetidos e dá ao médico o histórico do paciente na hora.',
        ],
        risks: [
          'Concentrar dados pessoais e de saúde num só sistema aumenta o estrago de um vazamento ou ataque hacker.',
          'Uma lei de IA focada em “liberdade de criar” pode deixar sem regra usos de risco, como reconhecimento facial e decisões automáticas sobre benefícios.',
          'Tirar o ensino superior do MEC é uma mudança grande de estrutura, que pode atrasar programas e repasses durante a transição.',
        ],
      },
      lula: {
        mechanism:
          'O Estado investe e usa compras públicas para puxar conectividade, IA e pesquisa feitas no Brasil, e cria regras para algoritmos e data centers.',
        benefits: [
          'Fibra e 5G em cidades pequenas e no campo abrem acesso a serviços, ensino e vendas pela internet.',
          'Serviços públicos digitais poupam deslocamento e tempo de fila.',
        ],
        risks: [
          'IA e supercomputadores nacionais exigem investimento alto e contínuo, e competir com empresas globais é difícil.',
          'Exigências de energia renovável e contrapartidas podem levar investimentos em data centers para outros países.',
          'Mais dados pessoais em sistemas do governo aumentam o risco de vazamentos e golpes, se a segurança não acompanhar.',
        ],
      },
      monitor: [
        'Domicílios e escolas com internet (TIC Domicílios, Cetic.br)',
        'Serviços federais disponíveis no gov.br',
        'Investimento em pesquisa e desenvolvimento (MCTI)',
        'Cobertura de 4G e 5G (Anatel)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'cultura-esporte',
    icon: '🎭',
    title: 'Cultura, esporte e turismo',
    question: 'O que muda para a cultura, os artistas, o esporte e o turismo?',
    proposals: {
      flavio: [
        {
          summary:
            'Programa Escola de Campeões: esporte competitivo nas escolas, com times, treinos no contraturno e competições municipais e estaduais, em parceria com empresas.',
          status: 'oficial',
          pages: '40',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Alto rendimento e paradesporto: aperfeiçoar as bolsas esportivas, atrair patrocínio privado e buscar talentos paralímpicos desde a base, com mais autonomia para as entidades paralímpicas.',
          status: 'oficial',
          pages: '40',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Garantir que a categoria feminina, da base ao alto rendimento, seja disputada só por “atletas do sexo feminino”. O plano argumenta que quem não nasceu mulher mantém vantagens físicas mesmo após tratamento hormonal.',
          status: 'oficial',
          pages: '40–41',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Cultura: rever as leis de incentivo (que deixam empresas abater do imposto o que patrocinam), “corrigindo distorções” e favorecendo outros polos regionais e artistas de pouca projeção, e preservar centros históricos, obras e acervos.',
          status: 'oficial',
          pages: '41',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não diz quanto vai investir em cultura e esporte nem se os ministérios das duas áreas continuam (promete cortar pelo menos 10 ministérios, sem dizer quais). A Lei Rouanet não é citada pelo nome.',
          status: 'nao-localizado',
          pages: '69',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Turismo: divulgar o Brasil como destino e valorizar a vocação de cada região, aproveitando as novas estradas, aeroportos e o Trem do Nordeste, para gerar renda sobretudo no interior. O plano diz que segurança é a base para o turismo crescer.',
          status: 'oficial',
          pages: '59–60',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Aperfeiçoar a Lei Rouanet e a Lei Aldir Blanc, com mais transparência e com o dinheiro mais espalhado pelas regiões, não só nos grandes centros.',
          status: 'oficial',
          pages: '40–41',
          sources: [S.planoLula],
        },
        {
          summary:
            'Aprovar no Congresso regras para o streaming (vídeo sob demanda, como Netflix) que favoreçam a produção nacional, e uma lei para que artistas sejam pagos quando plataformas e inteligência artificial usarem conteúdo brasileiro.',
          status: 'oficial',
          pages: '42',
          sources: [S.planoLula],
        },
        {
          summary:
            'Fortalecer os Pontos de Cultura (grupos culturais comunitários com apoio público) e a estrutura cultural nas periferias, e levar mais arte para a escola, inclusive no tempo integral.',
          status: 'oficial',
          pages: '41, 43',
          sources: [S.planoLula],
        },
        {
          summary:
            'Esporte de alto rendimento: continuar ampliando o Bolsa Atleta (11 mil atletas em 2026) e manter o patrocínio das estatais para o próximo ciclo olímpico e paralímpico.',
          status: 'oficial',
          pages: '43',
          sources: [S.planoLula],
        },
        {
          summary:
            'Esporte para todos: sediar a Copa do Mundo de Futebol Feminino em 8 capitais, colocar em funcionamento a Universidade do Esporte e ampliar o apoio às Arenas Brasil (espaços esportivos nos municípios).',
          status: 'oficial',
          pages: '43–44',
          sources: [S.planoLula],
        },
        {
          summary:
            'Turismo: criar novos roteiros (gastronomia, arte, cultura e ecoturismo), juntar turismo com música, artes e gastronomia e reforçar a divulgação do Brasil no exterior.',
          status: 'oficial',
          pages: '57',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Menos dependência de verba federal e mais patrocínio privado e parcerias com estados e municípios, além de mudar os critérios das leis de incentivo à cultura.',
        benefits: [
          'Esporte competitivo na escola pode segurar alunos na sala de aula e revelar talentos.',
          'Espalhar o incentivo para além dos grandes centros pode alcançar artistas de outras regiões.',
        ],
        risks: [
          'Patrocínio privado tende a ir para modalidades e regiões com mais visibilidade, deixando as menores de fora.',
          'Decidir o que é “distorção” nas leis de incentivo abre espaço para critérios políticos na escolha de projetos.',
          'A Constituição garante autonomia às entidades esportivas, então impor regras para a categoria feminina pode gerar disputa na Justiça.',
        ],
      },
      lula: {
        mechanism:
          'Dinheiro público direto e incentivo fiscal (Rouanet, Aldir Blanc, patrocínio de estatais) para financiar artistas, atletas e espaços culturais e esportivos.',
        benefits: [
          'Mais verba fora dos grandes centros pode chegar a artistas e grupos de cidades menores e periferias.',
          'Bolsa e patrocínio estáveis permitem a atletas treinar sem depender só de clube ou patrocínio privado.',
        ],
        risks: [
          'Incentivo fiscal é imposto que deixa de ser arrecadado, e a escolha de quem recebe costuma gerar acusações de favorecimento.',
          'Regras e cobranças sobre o streaming podem encarecer assinaturas ou reduzir o catálogo.',
          'Novos equipamentos têm custo de manutenção alto e risco de ficar ociosos se o município não tiver como mantê-los.',
        ],
      },
      monitor: [
        'Projetos aprovados pelas leis de incentivo à cultura e ao esporte',
        'Orçamento federal de cultura e de esporte',
        'Equipamentos culturais e esportivos nos municípios (IBGE)',
        'Chegada de turistas estrangeiros (Embratur)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
  {
    id: 'brasil-no-mundo',
    icon: '🌎',
    title: 'Brasil no mundo',
    question:
      'Como o Brasil se relaciona com outros países — e o que isso tem a ver com o seu bolso?',
    proposals: {
      flavio: [
        {
          summary:
            'Diplomacia “pelo pragmatismo, não pela ideologia”: Itamaraty conduzido pela “competência técnica” dos seus quadros, reaproximação com Argentina, Estados Unidos e Israel e negociação com todos os mercados, da China à União Europeia.',
          status: 'oficial',
          pages: '62',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Retomar a entrada do Brasil na OCDE (grupo de países que adotam padrões comuns de economia e governo), incluindo o fim gradual do IOF (imposto sobre operações financeiras) no câmbio, que é uma das condições.',
          status: 'oficial',
          pages: '63',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Abrir a economia para importar máquinas, tecnologia e insumos, com um plano de integração às cadeias globais de valor (agroindústria, minerais críticos, saúde e economia digital) e apoio do BNDES e da Apex-Brasil para pequenas e médias empresas exportarem.',
          status: 'oficial',
          pages: '63',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'Defesa: concentrar esforços contra o crime organizado e investir em tecnologias como drones e inteligência artificial. O plano diz que os investimentos nas Forças Armadas devem ser “condizentes” com o papel do país no mundo, mas não diz quanto.',
          status: 'oficial',
          pages: '63',
          sources: [S.planoFlavio],
        },
        {
          summary:
            'O plano não fala do Mercosul nem do Brics. Sobre as sanções dos Estados Unidos, da China e da Europa a produtos brasileiros, promete só buscar “soluções diplomáticas eficazes”.',
          status: 'nao-localizado',
          pages: '54',
          sources: [S.planoFlavio],
        },
      ],
      lula: [
        {
          summary:
            'Defesa: fortalecer a indústria nacional de defesa, com orçamento à altura, para equipar as Forças Armadas, e reforçar a defesa cibernética de infraestruturas críticas e bancos de dados do governo.',
          status: 'oficial',
          pages: '78–79',
          sources: [S.planoLula],
        },
        {
          summary:
            'Proteger as fronteiras, a Amazônia e a Amazônia Azul (o mar sob jurisdição do Brasil) com mais vigilância e presença do Estado. A Inteligência de Estado seria civil e proibida de servir à perseguição política.',
          status: 'oficial',
          pages: '79',
          sources: [S.planoLula],
        },
        {
          summary:
            'Comércio exterior: buscar novos acordos comerciais e mercados, reforçar os adidos agrícolas (representantes do agro nas embaixadas) e responder a “agressões comerciais” com base nas regras internacionais.',
          status: 'oficial',
          pages: '62, 80',
          sources: [S.planoLula],
        },
        {
          summary:
            'Política externa “universalista”: priorizar o Mercosul e a integração da América do Sul, aproximar-se dos BRICS e do Sul Global e defender a reforma do Conselho de Segurança da ONU e do FMI.',
          status: 'oficial',
          pages: '80–81',
          sources: [S.planoLula],
        },
        {
          summary:
            'O plano não cita os Estados Unidos entre as prioridades de política externa e não diz como negociaria as tarifas impostas pelo governo Trump, que aparecem só no balanço do governo atual.',
          status: 'nao-localizado',
          pages: '12',
          sources: [S.planoLula],
        },
      ],
    },
    impact: {
      flavio: {
        mechanism:
          'Diplomacia voltada ao comércio, entrada na OCDE e abertura gradual da economia para atrair investimento.',
        benefits: [
          'Entrar na OCDE sinaliza regras mais previsíveis e pode atrair investimento estrangeiro.',
          'Importar máquinas e insumos mais baratos aumenta a produtividade das empresas e pode baixar preços.',
        ],
        risks: [
          'Abertura comercial pressiona setores da indústria que hoje dependem de proteção, com risco de demissões no curto prazo.',
          'Acabar com o IOF do câmbio reduz a arrecadação num plano que já promete cortar outros impostos.',
          'Baixar tarifas de importação por conta própria esbarra na Tarifa Externa Comum do Mercosul, que o plano não menciona.',
        ],
      },
      lula: {
        mechanism:
          'Diplomacia que busca parceiros em várias regiões ao mesmo tempo, sem alinhamento automático a nenhuma potência, e mais orçamento para a indústria de defesa.',
        benefits: [
          'Mais mercados reduzem a dependência de poucos compradores e o impacto de tarifas de um único país.',
          'Indústria de defesa nacional gera empregos qualificados e tecnologia que pode ser usada fora da área militar.',
        ],
        risks: [
          'A aproximação com os BRICS, que incluem China e Rússia, pode gerar atrito com Estados Unidos e Europa, também grandes compradores do Brasil.',
          'Sem estratégia explícita para os EUA, as tarifas sobre produtos brasileiros podem continuar pesando sobre exportadores.',
          'Mais gasto com defesa disputa espaço num orçamento já apertado.',
        ],
      },
      monitor: [
        'Balança comercial (MDIC)',
        'Acordos comerciais assinados e em vigor',
        'Orçamento da Defesa',
        'Exportações por destino (MDIC)',
      ],
      reviewedAt: UPDATED_AT,
    },
  },
];
