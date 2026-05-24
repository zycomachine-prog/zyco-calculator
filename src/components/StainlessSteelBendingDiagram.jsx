export default function StainlessSteelBendingDiagram({ labels }) {
  return (
    <section
      className='zyco-stainless-diagram'
      aria-labelledby='stainless-diagram-heading'
    >
      <style>
        {`
          .zyco-stainless-diagram {
            position: relative;
            margin-top: 18px;
            padding: 24px;
            overflow: hidden;
            border: 1px solid rgba(180, 220, 255, 0.14);
            border-radius: 26px;
            background:
              radial-gradient(circle at 50% 38%, rgba(96, 165, 250, 0.2), transparent 34%),
              linear-gradient(135deg, rgba(26, 64, 112, 0.72), rgba(8, 28, 56, 0.84));
            box-shadow: 0 18px 48px rgba(2, 8, 23, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
          .zyco-stainless-diagram::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(148, 197, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: radial-gradient(circle at 50% 42%, #000, transparent 76%);
            pointer-events: none;
          }
          .zyco-stainless-diagram__header, .zyco-stainless-diagram__stage, .zyco-stainless-diagram__caption {
            position: relative;
            z-index: 1;
          }
          .zyco-stainless-diagram__eyebrow {
            margin: 0 0 7px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .zyco-stainless-diagram__title {
            margin: 0 0 18px;
            color: #fff;
            font-size: 21px;
            line-height: 1.3;
          }
          .zyco-stainless-diagram__stage {
            overflow: hidden;
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 22px;
            background: linear-gradient(180deg, rgba(38, 84, 143, 0.36), rgba(18, 49, 93, 0.34));
          }
          .zyco-stainless-diagram__svg { display: block; width: 100%; height: auto; }
          .zyco-stainless-diagram__caption {
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.65;
          }
          @media (max-width: 760px) {
            .zyco-stainless-diagram { padding: 18px; border-radius: 22px; }
            .zyco-stainless-diagram__title { font-size: 18px; }
          }
        `}
      </style>
      <header className='zyco-stainless-diagram__header'>
        <p className='zyco-stainless-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2 className='zyco-stainless-diagram__title' id='stainless-diagram-heading'>
          {labels.title}
        </h2>
      </header>
      <div className='zyco-stainless-diagram__stage'>
        <svg
          className='zyco-stainless-diagram__svg'
          viewBox='0 0 1040 560'
          role='img'
          aria-labelledby='stainless-svg-title stainless-svg-description'
        >
          <title id='stainless-svg-title'>{labels.svgTitle}</title>
          <desc id='stainless-svg-description'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='ssPunch' x2='0' y2='1'>
              <stop stopColor='#7dd3fc' />
              <stop offset='0.52' stopColor='#2563eb' />
              <stop offset='1' stopColor='#102e68' />
            </linearGradient>
            <linearGradient id='ssDie' x2='0' y2='1'>
              <stop stopColor='#2563eb' />
              <stop offset='1' stopColor='#071a3d' />
            </linearGradient>
            <linearGradient id='ssSheet' x2='1'>
              <stop stopColor='#94a3b8' />
              <stop offset='0.45' stopColor='#f8fafc' />
              <stop offset='0.55' stopColor='#dbeafe' />
              <stop offset='1' stopColor='#64748b' />
            </linearGradient>
            <filter id='ssGlow'>
              <feGaussianBlur stdDeviation='5' result='blur' />
              <feMerge><feMergeNode in='blur' /><feMergeNode in='SourceGraphic' /></feMerge>
            </filter>
            <filter id='ssShadow'>
              <feDropShadow dx='0' dy='10' stdDeviation='10' floodColor='#020617' floodOpacity='0.34' />
            </filter>
            <marker id='ssArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'>
              <path d='M0 0 L8 4 L0 8' fill='none' stroke='#93c5fd' strokeWidth='1.5' />
            </marker>
          </defs>
          <g opacity='0.38'>
            <path d='M52 456 H988 M520 38 V495' stroke='#60a5fa' strokeDasharray='8 14' />
          </g>
          <g filter='url(#ssShadow)'>
            <path d='M126 454 L288 272 H378 L275 454 Z' fill='url(#ssDie)' />
            <path d='M914 454 L752 272 H662 L765 454 Z' fill='url(#ssDie)' />
            <path d='M288 272 H378 M662 272 H752' stroke='#93c5fd' strokeWidth='3' />
            <path d='M466 72 H574 L548 242 Q520 274 492 242 Z' fill='url(#ssPunch)' />
          </g>
          <path
            d='M155 266 H300 C362 266 402 280 438 316 L488 366 Q520 398 552 366 L602 316 C638 280 678 266 740 266 H885'
            fill='none'
            stroke='url(#ssSheet)'
            strokeWidth='14'
            strokeLinejoin='round'
          />
          <path d='M438 316 Q520 398 602 316' fill='none' stroke='#7dd3fc' strokeWidth='2' opacity='0.68' />
          <path d='M420 292 L453 319 M587 319 L620 292' stroke='#f472b6' strokeWidth='10' opacity='0.72' filter='url(#ssGlow)' />
          <path d='M550 349 A43 43 0 0 1 590 326' fill='none' stroke='#7dd3fc' strokeWidth='2' markerEnd='url(#ssArrow)' />
          <path d='M612 252 A118 118 0 0 1 677 216' fill='none' stroke='#38bdf8' strokeWidth='2' strokeDasharray='6 7' markerEnd='url(#ssArrow)' />
          <g fill='#dbeafe' fontFamily='Inter, Arial, sans-serif' fontSize='16' fontWeight='700'>
            <text x='596' y='82'>{labels.punch}</text>
            <path d='M588 89 L557 118' stroke='#93c5fd' markerEnd='url(#ssArrow)' />
            <text x='94' y='224'>{labels.sheet}</text>
            <path d='M204 230 L273 259' stroke='#93c5fd' markerEnd='url(#ssArrow)' />
            <text x='96' y='492'>{labels.vDie}</text>
            <text x='615' y='363'>{labels.insideRadius}</text>
            <text x='690' y='208'>{labels.springback}</text>
            <text x='240' y='332'>{labels.markZone}</text>
            <path d='M378 326 L421 308' stroke='#f9a8d4' markerEnd='url(#ssArrow)' />
          </g>
        </svg>
      </div>
      <p className='zyco-stainless-diagram__caption'>{labels.caption}</p>
    </section>
  )
}
