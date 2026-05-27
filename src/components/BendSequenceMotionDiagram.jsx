const workflowText = {
  en: {
    title: 'Customer Product Bend Sequence Workflow',
    intro: 'Five successive 90 degree air bends on the same part, using one straight punch and one V-die.',
    steps: ['First bend', 'Second bend', 'Rotate part', 'Side flange', 'Closing bend'],
    formed: 'After bending',
    active: 'Before bending',
    line: 'Current bend line',
    reposition: 'ROTATE / REPOSITION',
    station: 'STRAIGHT PUNCH + V-DIE',
    note: 'Each step keeps the previous bends and repositions the same part for the next bend line.',
    service: 'For complex products, contact our engineers to design the tooling and bending sequence.',
  },
  zh: {
    title: '客户产品折弯顺序工艺示例',
    intro: '同一个钣金工件使用同一套直尖刀与 V 型下模，依次完成五道接近 90° 的空气折弯。',
    steps: ['第一刀', '第二刀', '旋转工件', '侧边折弯', '收口折弯'],
    formed: '折弯后形状',
    active: '折弯前形状',
    line: '当前折弯线',
    reposition: '旋转 / 重新定位',
    station: '直尖刀 + V 型下模',
    note: '每一步都保留前一道折弯结果，并重新定位同一工件进入下一道折弯线。',
    service: '如有复杂产品可以联系我方工程师设计模具和折弯步骤。',
  },
  ru: {
    title: 'Технологическая последовательность гибки детали',
    intro: 'Пять последовательных воздушных гибов около 90° одной детали одним прямым пуансоном и одной V-матрицей.',
    steps: ['Первый гиб', 'Второй гиб', 'Поворот детали', 'Боковая полка', 'Замыкающий гиб'],
    formed: 'После гибки',
    active: 'До гибки',
    line: 'Текущая линия гиба',
    reposition: 'ПОВОРОТ / ПЕРЕБАЗИРОВАНИЕ',
    station: 'ПРЯМОЙ ПУАНСОН + V-МАТРИЦА',
    note: 'На каждом шаге сохраняются выполненные гибы, а та же деталь перебазируется на следующую линию гиба.',
    service: 'Для сложных изделий обратитесь к нашим инженерам для проектирования оснастки и последовательности гибки.',
  },
  es: {
    title: 'Flujo de secuencia de plegado de una pieza',
    intro: 'Cinco pliegues al aire sucesivos, próximos a 90°, con el mismo punzón recto y la misma matriz V.',
    steps: ['Primer pliegue', 'Segundo pliegue', 'Girar pieza', 'Pestaña lateral', 'Pliegue de cierre'],
    formed: 'Después del plegado',
    active: 'Antes del plegado',
    line: 'Línea de pliegue',
    reposition: 'GIRAR / REPOSICIONAR',
    station: 'PUNZÓN RECTO + MATRIZ V',
    note: 'Cada paso conserva los pliegues anteriores y reposiciona la misma pieza para la siguiente línea de pliegue.',
    service: 'Para productos complejos, contacte con nuestros ingenieros para diseñar el utillaje y la secuencia de plegado.',
  },
  tr: {
    title: 'Parça büküm sırası proses akışı',
    intro: 'Aynı düz zımba ve aynı V kalıp ile aynı parçaya uygulanan yaklaşık 90° beş ardışık havada büküm.',
    steps: ['İlk büküm', 'İkinci büküm', 'Parçayı çevir', 'Yan flanş', 'Kapanış bükümü'],
    formed: 'Büküm sonrası',
    active: 'Büküm öncesi',
    line: 'Güncel büküm hattı',
    reposition: 'ÇEVİR / KONUMLANDIR',
    station: 'DÜZ ZIMBA + V KALIP',
    note: 'Her adım önceki bükümleri korur ve aynı parçayı sonraki büküm hattı için yeniden konumlandırır.',
    service: 'Karmaşık ürünlerde kalıp ve büküm sırası tasarımı için mühendislerimizle iletişime geçin.',
  },
  id: {
    title: 'Alur proses urutan bending komponen',
    intro: 'Lima air bending berurutan mendekati 90° pada komponen yang sama dengan straight punch dan V-die yang sama.',
    steps: ['Bend pertama', 'Bend kedua', 'Putar komponen', 'Flange samping', 'Bend penutup'],
    formed: 'Setelah bending',
    active: 'Sebelum bending',
    line: 'Garis bend aktif',
    reposition: 'PUTAR / POSISIKAN ULANG',
    station: 'STRAIGHT PUNCH + V-DIE',
    note: 'Setiap langkah mempertahankan bend sebelumnya dan memosisikan ulang komponen yang sama untuk garis bend berikutnya.',
    service: 'Untuk produk kompleks, hubungi engineer kami untuk merancang tooling dan urutan bending.',
  },
}

const dxfToolProfile = 'M164.000035 101.167137L164.000035 50.076721M184.000000 122.986327L164.000035 101.167137M184.000000 122.986327L189.773549 116.716044M182.000035 50.076721L182.000035 105.428725M182.000035 105.428725A8.000000 8.000000 0 0 0 184.242700 110.983281M189.773549 116.716044L184.242700 110.983281M169.000000 145.835757L174.000000 145.835757M194.000000 145.835757L199.000000 145.835757M199.000000 145.835757L199.000000 200.835757M199.000000 200.835757L190.500000 200.835757M190.500000 200.835757L190.500000 220.835757M190.500000 220.835757L177.500000 220.835757M177.500000 220.835757L177.500000 200.835757M177.500000 200.835757L169.000000 200.835757M169.000000 200.835757L169.000000 145.835757M174.000000 145.835757L184.000000 156.559444M194.000000 145.835757L184.000000 156.559444M164.000035 50.076721L182.000035 50.076721'

const dxfToolTransforms = [
  '',
  'translate(222.513718 0.224593)',
  'translate(428.239229 0.224593)',
  'translate(622.209984 0.224593)',
  'translate(815.706374 0.224593)',
]

const dxfBeforePaths = [
  'M0.000000 137.835757L20.000000 137.835757M0.000000 140.835757L204.000000 140.835757M20.000000 137.835757L60.000000 137.835757M60.000000 137.835757L120.000000 137.835757M120.000000 137.835757L204.000000 137.835757M204.000000 137.835757L204.000000 140.835757M0.000000 137.835757L0.000000 140.835757',
  'M246.513717 137.834933L266.513717 137.834933M266.513717 137.834933L306.513717 137.834933M306.513717 137.834933L366.513717 137.834933M366.513717 137.834933L427.513717 137.834933M246.513717 140.834933L406.513717 140.834933M427.513717 137.834933L427.513717 120.834933M427.513717 120.834933L430.513717 120.834933M430.513717 120.834933L430.513717 140.834933M430.513717 140.834933L406.513717 140.834933M246.513717 137.834933L246.513717 140.834933',
  'M632.239229 140.453562L612.239229 140.453562M612.239229 140.453562L572.239229 140.453562M572.239229 140.453562L512.239229 140.453562M512.239229 140.453562L475.239229 140.453562M632.239229 137.453562L472.239229 137.453562M475.239229 140.453562L475.239229 158.453562M475.239229 158.453562L492.239229 158.453562M492.239229 158.453562L492.239229 161.453562M492.239229 161.453562L472.239229 161.453562M472.239229 161.453562L472.239229 137.453562M632.239229 140.453562L632.239229 137.453562',
  'M846.209984 120.453562L846.209984 140.453562M843.209984 120.453562L843.209984 137.453562M846.209984 140.453562L806.209984 140.453562M806.209984 140.453562L746.209984 140.453562M746.209984 140.453562L709.209984 140.453562M843.209984 137.453562L706.209984 137.453562M709.209984 140.453562L709.209984 158.453562M709.209984 158.453562L726.209984 158.453562M726.209984 158.453562L726.209984 161.453562M726.209984 161.453562L706.209984 161.453562M706.209984 161.453562L706.209984 137.453562M846.209984 120.453562L843.209984 120.453562',
  'M1039.706374 100.453562L1059.706374 100.453562M1039.706374 103.453562L1056.706374 103.453562M1059.706374 100.453562L1059.706374 140.453562M1056.706374 103.453562L1056.706374 137.453562M1059.706374 140.453562L999.706374 140.453562M1056.706374 137.453562L959.706374 137.453562M999.706374 140.453562L962.706374 140.453562M962.706374 140.453562L962.706374 158.453562M962.706374 158.453562L979.706374 158.453562M979.706374 158.453562L979.706374 161.453562M979.706374 161.453562L959.706374 161.453562M959.706374 161.453562L959.706374 137.453562M1039.706374 100.453562L1039.706374 103.453562',
]

const dxfAfterPaths = [
  'M56.013673 0.000000L70.155808 14.142136M70.155808 14.142136L98.440079 42.426407M98.440079 42.426407L140.866486 84.852814M140.866486 84.852814L184.000000 127.986327M184.000000 127.986327L196.020815 115.965512M196.020815 115.965512L198.142136 118.086832M198.142136 118.086832L184.000000 132.228968M184.000000 132.228968L53.892352 2.121320M56.013673 0.000000L53.892352 2.121320',
  'M295.497953 17.195157L309.640088 31.337292M293.376632 19.316477L406.513717 132.453562M309.640088 31.337292L337.924359 59.621563M337.924359 59.621563L380.350766 102.047970M380.350766 102.047970L406.513717 128.210921M406.513717 128.210921L419.241639 115.482999M419.241639 115.482999L407.220824 103.462184M407.220824 103.462184L409.342144 101.340863M409.342144 101.340863L423.484280 115.482999M423.484280 115.482999L406.513717 132.453562M295.497953 17.195157L293.376632 19.316477',
  'M626.381365 118.311426L612.239229 132.453562M624.260044 116.190106L612.239229 128.210921M612.239229 132.453562L583.954958 104.169291M583.954958 104.169291L541.528551 61.742884M541.528551 61.742884L515.365600 35.579933M612.239229 128.210921L515.365600 31.337292M515.365600 35.579933L502.637678 48.307855M502.637678 48.307855L514.658493 60.328670M514.658493 60.328670L512.537173 62.449991M512.537173 62.449991L498.395037 48.307855M498.395037 48.307855L515.365600 31.337292M626.381365 118.311426L624.260044 116.190106',
  'M820.352119 90.027155L834.494255 104.169291M818.230799 92.148475L830.251614 104.169291M834.494255 104.169291L806.209984 132.453562M830.251614 104.169291L806.209984 128.210921M806.209984 132.453562L763.783577 90.027155M806.209984 128.210921L737.620626 59.621563M763.783577 90.027155L737.620626 63.864204M737.620626 63.864204L724.892704 76.592126M724.892704 76.592126L736.913519 88.612941M736.913519 88.612941L734.792199 90.734262M734.792199 90.734262L720.650063 76.592126M720.650063 76.592126L737.620626 59.621563M820.352119 90.027155L818.230799 92.148475',
  'M999.706374 75.885019L1013.848509 61.742884M1001.827694 78.006340L1013.848509 65.985524M1013.848509 61.742884L1042.132781 90.027155M1013.848509 65.985524L1037.890140 90.027155M1042.132781 90.027155L999.706374 132.453562M1037.890140 90.027155L999.706374 128.210921M999.706374 132.453562L973.543423 106.290611M999.706374 128.210921L973.543423 102.047970M973.543423 106.290611L960.815501 119.018533M960.815501 119.018533L972.836316 131.039348M972.836316 131.039348L970.714996 133.160669M970.714996 133.160669L956.572860 119.018533M956.572860 119.018533L973.543423 102.047970M999.706374 75.885019L1001.827694 78.006340',
]

const dxfStepPositions = [0, 246.513717, 472.239229, 706.209984, 959.706374]

const dxfStepCardWidth = 380
const dxfStepCardGap = 24
const dxfToolCenters = [184, 406.513718, 612.239229, 806.209984, 999.706374]
const dxfStepFrames = dxfStepPositions.map((_, index) => {
  const contentX = index * (dxfStepCardWidth + dxfStepCardGap)

  return {
    x: contentX,
    width: dxfStepCardWidth,
    offset: contentX + dxfStepCardWidth / 2 - dxfToolCenters[index],
  }
})

function getWorkflowText(labels) {
  if (labels.punch === '上模') return workflowText.zh
  if (labels.punch === 'Пуансон') return workflowText.ru
  if (labels.punch === 'Punzón') return workflowText.es
  if (labels.punch === 'Zımba') return workflowText.tr
  if (labels.correctOrder === 'Urutan Bend Benar') return workflowText.id
  return workflowText.en
}

function Legend({ text }) {
  return (
    <g transform='translate(411 -52)'>
      <path className='zyco-sequence-motion__part-current zyco-sequence-motion__part-current--legend' d='M0 0 H22' />
      <text className='zyco-sequence-motion__legend' x='30' y='4'>{text.active}</text>
      <path className='zyco-sequence-motion__part-formed' d='M166 0 H188' />
      <text className='zyco-sequence-motion__legend' x='196' y='4'>{text.formed}</text>
    </g>
  )
}

export default function BendSequenceMotionDiagram({ labels }) {
  const text = getWorkflowText(labels)

  return (
    <section className='zyco-sequence-motion' aria-labelledby='sequence-motion-title'>
      <style>
        {`
          .zyco-sequence-motion {
            margin-bottom: 22px;
            padding: 26px;
            border: 1px solid rgba(125, 211, 252, 0.28);
            border-radius: 28px;
            background:
              radial-gradient(ellipse at 51% 43%, rgba(37, 99, 235, 0.29), transparent 42%),
              radial-gradient(circle at 8% 0%, rgba(56, 189, 248, 0.12), transparent 34%),
              linear-gradient(140deg, rgba(15, 50, 99, 0.98), rgba(4, 13, 29, 0.99) 68%);
            box-shadow:
              inset 0 1px 0 rgba(191, 219, 254, .1),
              0 25px 62px rgba(2, 8, 23, .32);
          }
          .zyco-sequence-motion__title {
            margin: 0;
            color: #fff;
            font-size: 25px;
            font-weight: 850;
            letter-spacing: -.018em;
          }
          .zyco-sequence-motion__intro {
            max-width: 1020px;
            margin: 9px 0 18px;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.68;
          }
          .zyco-sequence-motion__frame {
            overflow-x: auto;
            overflow-y: hidden;
            padding: 10px 12px 12px;
            border: 1px solid rgba(125, 211, 252, .27);
            border-radius: 22px;
            background:
              radial-gradient(ellipse at 50% 46%, rgba(59, 130, 246, .2), transparent 47%),
              linear-gradient(180deg, rgba(8, 28, 56, .99), rgba(4, 13, 28, .99));
            box-shadow:
              inset 0 1px 0 rgba(147, 197, 253, .1),
              inset 0 -28px 42px rgba(2, 8, 23, .2);
            scrollbar-color: rgba(96, 165, 250, .45) rgba(15, 34, 62, .54);
            scrollbar-width: thin;
          }
          .zyco-sequence-motion svg { display: block; width: 2020px; max-width: none; height: auto; }
          .zyco-sequence-motion__station-card {
            fill: url(#sequenceCard);
            stroke: rgba(96, 165, 250, .48);
            stroke-width: 1;
            vector-effect: non-scaling-stroke;
            filter: url(#sequenceCardShadow);
          }
          .zyco-sequence-motion__station-rule {
            stroke: rgba(96, 165, 250, .25);
            stroke-width: 1;
            vector-effect: non-scaling-stroke;
          }
          .zyco-sequence-motion__step-badge {
            fill: url(#sequenceBadge);
            stroke: rgba(147, 197, 253, .9);
            stroke-width: 1;
            vector-effect: non-scaling-stroke;
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, .35));
          }
          .zyco-sequence-motion__step-number {
            fill: #e0f2fe;
            font-size: 9px;
            font-weight: 840;
            text-anchor: middle;
          }
          .zyco-sequence-motion__flow {
            fill: none;
            stroke: rgba(125, 211, 252, .88);
            stroke-width: 1.45;
            stroke-linecap: round;
            stroke-linejoin: round;
            vector-effect: non-scaling-stroke;
            filter: drop-shadow(0 0 3px rgba(56, 189, 248, .4));
            animation: sequence-flow-focus 3.6s ease-in-out infinite;
          }
          .zyco-sequence-motion__dxf-tool {
            fill: none;
            stroke: #f1f5f9;
            stroke-width: 1.48;
            stroke-linecap: round;
            stroke-linejoin: round;
            vector-effect: non-scaling-stroke;
          }
          .zyco-sequence-motion__dxf-before,
          .zyco-sequence-motion__dxf-after {
            fill: none;
            stroke-width: 2.25;
            stroke-linecap: round;
            stroke-linejoin: round;
            vector-effect: non-scaling-stroke;
          }
          .zyco-sequence-motion__dxf-before {
            stroke: #3b82f6;
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, .58));
          }
          .zyco-sequence-motion__dxf-after {
            stroke: #f04444;
            filter: drop-shadow(0 0 4px rgba(239, 68, 68, .48));
          }
          .zyco-sequence-motion__dxf-step {
            fill: #dbeafe;
            font-size: 8.3px;
            font-weight: 760;
          }
          .zyco-sequence-motion__card {
            fill: #080f1d;
            stroke: rgba(96, 165, 250, .33);
            stroke-width: 1.2;
          }
          .zyco-sequence-motion__number { fill: #dbeafe; stroke: #93c5fd; stroke-width: 1; }
          .zyco-sequence-motion__number-text { fill: #102a52; font-size: 21px; font-weight: 900; text-anchor: middle; }
          .zyco-sequence-motion__card-title { fill: #f8fafc; font-size: 13px; font-weight: 790; }
          .zyco-sequence-motion__centerline {
            fill: none;
            stroke: rgba(148, 163, 184, .22);
            stroke-width: 1;
            stroke-dasharray: 3 4;
          }
          .zyco-sequence-motion__punch,
          .zyco-sequence-motion__die {
            fill: #175786;
            stroke: #f1f5f9;
            stroke-width: 2.5;
            stroke-linejoin: round;
          }
          .zyco-sequence-motion__punch-edge,
          .zyco-sequence-motion__die-edge {
            fill: none;
            stroke: #ffffff;
            stroke-width: 2.6;
            stroke-linejoin: round;
          }
          .zyco-sequence-motion__part-formed,
          .zyco-sequence-motion__part-current {
            fill: none;
            stroke-width: 6;
            stroke-linecap: square;
            stroke-linejoin: round;
          }
          .zyco-sequence-motion__part-formed { stroke: #ef4444; }
          .zyco-sequence-motion__part-current {
            stroke: #3b82f6;
            filter: drop-shadow(0 0 3px rgba(59, 130, 246, .46));
          }
          .zyco-sequence-motion__part-current--legend { filter: none; }
          .zyco-sequence-motion__bend-ring {
            fill: rgba(96, 165, 250, .08);
            stroke: #60a5fa;
            stroke-width: 1.2;
            animation: sequence-bend-focus 2.5s ease-in-out infinite;
          }
          .zyco-sequence-motion__bend-dot {
            fill: #60a5fa;
            animation: sequence-bend-focus 2.5s ease-in-out infinite;
          }
          .zyco-sequence-motion__bend-label { fill: #93c5fd; font-size: 8px; font-weight: 720; }
          .zyco-sequence-motion__reposition path {
            fill: none;
            stroke: #7dd3fc;
            stroke-width: 1.3;
            stroke-dasharray: 4 3;
            marker-end: url(#sequenceArrow);
            animation: sequence-motion-focus 3s ease-in-out infinite;
          }
          .zyco-sequence-motion__reposition text { fill: #93c5fd; font-size: 7.6px; font-weight: 700; letter-spacing: .045em; }
          .zyco-sequence-motion__station { fill: #61799e; font-size: 8.6px; font-weight: 720; letter-spacing: .075em; }
          .zyco-sequence-motion__legend { fill: #cbd5e1; font-size: 10px; font-weight: 720; }
          .zyco-sequence-motion__note {
            margin: 15px 0 0;
            padding: 11px 14px;
            border: 1px solid rgba(96, 165, 250, .17);
            border-radius: 10px;
            background:
              linear-gradient(90deg, rgba(30, 64, 119, .34), rgba(15, 42, 78, .22));
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.6;
          }
          .zyco-sequence-motion__service {
            margin: 10px 0 0;
            padding: 11px 14px;
            border: 1px solid rgba(96, 165, 250, .28);
            border-left: 3px solid #60a5fa;
            border-radius: 10px;
            background:
              linear-gradient(90deg, rgba(30, 64, 119, .46), rgba(15, 42, 78, .32));
            color: #dbeafe;
            font-size: 12.5px;
            line-height: 1.55;
          }
          @keyframes sequence-bend-focus { 0%, 100% { opacity: .7; } 50% { opacity: 1; } }
          @keyframes sequence-motion-focus { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
          @keyframes sequence-flow-focus { 0%, 100% { opacity: .68; } 50% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .zyco-sequence-motion__bend-ring,
            .zyco-sequence-motion__bend-dot,
            .zyco-sequence-motion__reposition path,
            .zyco-sequence-motion__flow { animation: none; opacity: 1; }
          }
          @media (max-width: 760px) {
            .zyco-sequence-motion { padding: 16px; border-radius: 22px; }
            .zyco-sequence-motion__title { font-size: 20px; }
            .zyco-sequence-motion__frame { padding: 7px; }
          }
        `}
      </style>
      <h2 className='zyco-sequence-motion__title' id='sequence-motion-title'>{text.title}</h2>
      <p className='zyco-sequence-motion__intro'>{text.intro}</p>
      <div className='zyco-sequence-motion__frame'>
        <svg viewBox='-12 -64 2020 300' role='img' aria-labelledby='sequence-svg-title sequence-svg-desc'>
          <title id='sequence-svg-title'>{text.title}</title>
          <desc id='sequence-svg-desc'>{text.intro}</desc>
          <defs>
            <linearGradient id='sequenceCard' x1='0' y1='0' x2='0' y2='1'>
              <stop stopColor='#0d203b' stopOpacity='.94' />
              <stop offset='.46' stopColor='#071629' stopOpacity='.96' />
              <stop offset='1' stopColor='#061020' stopOpacity='.98' />
            </linearGradient>
            <linearGradient id='sequenceBadge' x1='0' y1='0' x2='0' y2='1'>
              <stop stopColor='#2563eb' stopOpacity='.82' />
              <stop offset='1' stopColor='#102d58' stopOpacity='.98' />
            </linearGradient>
            <filter id='sequenceCardShadow' x='-10%' y='-10%' width='120%' height='120%'>
              <feDropShadow dx='0' dy='2' stdDeviation='3' floodColor='#020817' floodOpacity='.34' />
            </filter>
            <marker id='sequenceArrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto'>
              <path d='M0 0 L10 5 L0 10 Z' fill='#7dd3fc' />
            </marker>
          </defs>
          {dxfStepFrames.map((frame, index) => (
            <g key={`frame-${index}`}>
              <rect
                className='zyco-sequence-motion__station-card'
                x={frame.x}
                y='-35'
                width={frame.width}
                height='264'
                rx='7'
              />
              <line
                className='zyco-sequence-motion__station-rule'
                x1={frame.x + 8}
                y1='-5'
                x2={frame.x + frame.width - 8}
                y2='-5'
              />
              <circle className='zyco-sequence-motion__step-badge' cx={frame.x + 14} cy='-20' r='9' />
              <text className='zyco-sequence-motion__step-number' x={frame.x + 14} y='-17'>
                {index + 1}
              </text>
            </g>
          ))}
          {dxfStepFrames.slice(0, -1).map((frame, index) => (
            <path
              className='zyco-sequence-motion__flow'
              d={`M${frame.x + frame.width + dxfStepCardGap / 2 - 2} -20 l4 4 l-4 4`}
              key={`flow-${index}`}
            />
          ))}
          <Legend text={text} />
          {dxfStepPositions.map((_, index) => (
            <text className='zyco-sequence-motion__dxf-step' x={dxfStepFrames[index].x + 28} y='-17' key={`step-${index}`}>
              {text.steps[index]}
            </text>
          ))}
          {dxfStepFrames.map((frame, index) => (
            <g transform={`translate(${frame.offset} 0)`} key={`geometry-${index}`}>
              <path
                className='zyco-sequence-motion__dxf-tool'
                d={dxfToolProfile}
                transform={dxfToolTransforms[index] || undefined}
              />
              <path className='zyco-sequence-motion__dxf-before' d={dxfBeforePaths[index]} />
              <path className='zyco-sequence-motion__dxf-after' d={dxfAfterPaths[index]} />
            </g>
          ))}
        </svg>
      </div>
      <p className='zyco-sequence-motion__note'>{text.note}</p>
      <p className='zyco-sequence-motion__service'>{text.service}</p>
    </section>
  )
}
