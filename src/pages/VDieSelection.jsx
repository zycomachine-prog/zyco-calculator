import { useMemo, useState } from 'react'

const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '0.8T\u20131T',
    recommendedInsideRadius: '1T\u20131.5T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '1T\u20131.2T',
    recommendedInsideRadius: '1.2T\u20131.6T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    naturalInsideRadiusFactor: 0.18,
    minimumSafeInsideRadius: '1T\u20131.3T',
    recommendedInsideRadius: '1.4T\u20132T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    naturalInsideRadiusFactor: 0.18,
    minimumSafeInsideRadius: '1T\u20131.3T',
    recommendedInsideRadius: '1.3T\u20131.8T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    naturalInsideRadiusFactor: 0.14,
    minimumSafeInsideRadius: '0.8T\u20131.5T',
    recommendedInsideRadius: '1T\u20132T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '0.8T\u20131T',
    recommendedInsideRadius: '1T\u20131.5T',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
  },
]

const engineeringNote =
  'V-die selection controls more than tool fit. In press brake air bending, V-opening width affects required tonnage, natural inside radius, springback tendency, surface marking and the available flange length. The standard 8T / 10T / 12T rule is a practical starting point, but the final die choice should also consider material strength, crack risk, punch radius, target bend radius, tooling condition and whether the job prioritizes force reduction or tight radius control.'

const faqItems = [
  {
    question: 'How do I choose V-die opening for sheet metal bending?',
    answer:
      'A common starting point is 8 times material thickness for thinner sheets, 10 times thickness for medium thickness and 12 times thickness for thicker plates. The final choice should be checked against radius, tonnage, flange length and material risk.',
  },
  {
    question: 'Does a smaller V-opening reduce inside radius?',
    answer:
      'Yes, a smaller V-opening generally produces a smaller natural inside radius in air bending, but it also increases bending force and may increase marking or cracking risk.',
  },
  {
    question: 'Why would I use a larger V-die opening?',
    answer:
      'A larger V-opening can reduce required tonnage and tool load. It is often useful for thicker plates or higher-strength materials, but it may increase inside radius and springback.',
  },
  {
    question: 'Is V-die selection the same for stainless steel and mild steel?',
    answer:
      'The thickness rule can be the same starting point, but stainless steel usually needs more force and has higher springback, so radius and angle compensation should be reviewed more carefully.',
  },
]

const relatedTools = [
  {
    title: 'Press Brake Calculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    title: 'Material Database',
    href: '/engineering-tools/material-database',
  },
  {
    title: 'V Die Selection Tool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    title: 'Inside Radius Guide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    title: 'Springback Database',
    href: '/engineering-tools/springback-database',
  },
]

const getStandardAutoVDie = (thickness) => {
  if (thickness < 8) return thickness * 8

  if (thickness < 25) return thickness * 10

  return thickness * 12
}

const formatNumber = (value) =>
  Number.isInteger(value)
    ? String(value)
    : value.toFixed(1).replace(/\.0$/, '')

const formatNaturalInsideRadius = (value) =>
  `\u2248 ${value.toFixed(1)} mm`

export default function VDieSelection() {
  const [materialKey, setMaterialKey] = useState('mildSteel')
  const [thickness, setThickness] = useState('')

  const selectedMaterial = materials.find(
    (material) => material.materialKey === materialKey
  ) || materials[0]

  const result = useMemo(() => {
    const thicknessValue = Number(thickness)

    if (!thickness || !Number.isFinite(thicknessValue) || thicknessValue <= 0) {
      return null
    }

    const standardAutoVDie = getStandardAutoVDie(thicknessValue)
    const estimatedNaturalInsideRadius =
      standardAutoVDie * selectedMaterial.naturalInsideRadiusFactor

    return {
      standardAutoVDie: `${formatNumber(standardAutoVDie)} mm`,
      estimatedNaturalInsideRadius: formatNaturalInsideRadius(
        estimatedNaturalInsideRadius
      ),
      minimumSafeInsideRadius: selectedMaterial.minimumSafeInsideRadius,
      recommendedInsideRadius: selectedMaterial.recommendedInsideRadius,
      materialAdjustmentAdvice: selectedMaterial.materialAdjustmentAdvice,
    }
  }, [
    selectedMaterial,
    thickness,
  ])

  const outputRows = [
    [
      'Standard Auto V Die Rule',
      'Follows Calculator logic: 8T / 10T / 12T by thickness range',
    ],
    ['Standard Auto V Die', result?.standardAutoVDie || '--'],
    [
      'Estimated Natural Inside Radius',
      result?.estimatedNaturalInsideRadius || '--',
    ],
    ['Minimum Safe Inside Radius', result?.minimumSafeInsideRadius || '--'],
    ['Recommended Inside Radius', result?.recommendedInsideRadius || '--'],
    ['Material Adjustment Advice', result?.materialAdjustmentAdvice || '--'],
  ]

  return (
    <>
      <style>
        {`
          .zyco-vdie {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family:
              Inter,
              ui-sans-serif,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
            overflow: hidden;
            position: relative;
          }

          .zyco-vdie::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 78%);
            pointer-events: none;
          }

          .zyco-vdie::after {
            content: "";
            position: absolute;
            left: -10%;
            right: -10%;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.9), transparent);
            box-shadow: 0 0 34px rgba(96, 165, 250, 0.55);
            pointer-events: none;
          }

          .zyco-vdie__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-vdie__header,
          .zyco-vdie-card {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-vdie__header {
            margin-bottom: 34px;
            padding: 34px;
          }

          .zyco-vdie__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-vdie__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-vdie__subtitle {
            max-width: 720px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-vdie__engineering-note {
            max-width: 940px;
            margin: 24px 0 0;
            padding: 18px 20px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.24);
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .zyco-vdie__note-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-vdie__note-text {
            margin: 0;
          }

          .zyco-vdie__grid {
            display: grid;
            grid-template-columns: minmax(300px, 0.82fr) minmax(0, 1.18fr);
            gap: 18px;
            align-items: stretch;
          }

          .zyco-vdie-card {
            box-sizing: border-box;
            padding: 24px;
            position: relative;
            overflow: hidden;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
          }

          .zyco-vdie-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-vdie-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-vdie-card__title {
            margin: 0 0 20px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-vdie-form {
            display: grid;
            gap: 18px;
          }

          .zyco-vdie-field {
            display: grid;
            gap: 8px;
          }

          .zyco-vdie-field__label {
            padding-left: 6px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .zyco-vdie-field__control {
            width: 100%;
            height: 58px;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 18px;
            outline: none;
            background: linear-gradient(180deg, #ffffff 0%, #f1f5ff 100%);
            color: #0f172a;
            font-size: 16px;
            font-weight: 700;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-vdie-field__control:focus {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.15),
              0 0 25px rgba(59, 130, 246, 0.15);
          }

          .zyco-vdie-results {
            display: grid;
            gap: 12px;
            margin: 0 0 24px;
          }

          .zyco-vdie-result {
            display: grid;
            grid-template-columns: minmax(180px, 0.7fr) minmax(0, 1.3fr);
            gap: 16px;
            align-items: start;
            padding: 16px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.24);
          }

          .zyco-vdie-result__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-vdie-result__value {
            margin: 0;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.55;
            font-weight: 800;
            overflow-wrap: anywhere;
          }

          .zyco-vdie-card__action {
            min-height: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 20px;
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-vdie-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-vdie__panel {
            margin-top: 22px;
            padding: 24px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-vdie__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-vdie__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-vdie__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-vdie__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-vdie__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          @media (max-width: 900px) {
            .zyco-vdie__grid {
              grid-template-columns: 1fr;
            }

            .zyco-vdie__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-vdie {
              padding: 28px 14px;
            }

            .zyco-vdie__header,
            .zyco-vdie-card {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-vdie__title {
              font-size: 32px;
            }

            .zyco-vdie__subtitle {
              font-size: 16px;
            }

            .zyco-vdie__engineering-note {
              padding: 16px;
              font-size: 13px;
            }

            .zyco-vdie-result {
              grid-template-columns: 1fr;
              gap: 6px;
            }

            .zyco-vdie__faq {
              grid-template-columns: 1fr;
            }

            .zyco-vdie__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-vdie-card__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-vdie'>
        <section className='zyco-vdie__shell'>
          <header className='zyco-vdie__header'>
            <p className='zyco-vdie__eyebrow'>
              Engineering Reference
            </p>

            <h1 className='zyco-vdie__title'>
              V Die Selection Tool
            </h1>

            <p className='zyco-vdie__subtitle'>
              Recommended V-opening guide for sheet metal air bending
            </p>

            <section
              className='zyco-vdie__engineering-note'
              aria-labelledby='vdie-engineering-overview'
            >
              <h2
                className='zyco-vdie__note-title'
                id='vdie-engineering-overview'
              >
                Engineering Overview
              </h2>

              <p className='zyco-vdie__note-text'>
                {engineeringNote}
              </p>
            </section>
          </header>

          <div className='zyco-vdie__grid'>
            <article className='zyco-vdie-card'>
              <h2 className='zyco-vdie-card__title'>
                Input Parameters
              </h2>

              <div className='zyco-vdie-form'>
                <label className='zyco-vdie-field'>
                  <span className='zyco-vdie-field__label'>
                    Material
                  </span>

                  <select
                    className='zyco-vdie-field__control'
                    value={materialKey}
                    onChange={(event) =>
                      setMaterialKey(event.target.value)
                    }
                  >
                    {materials.map((material) => (
                      <option
                        key={material.materialKey}
                        value={material.materialKey}
                      >
                        {material.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className='zyco-vdie-field'>
                  <span className='zyco-vdie-field__label'>
                    Thickness (mm)
                  </span>

                  <input
                    className='zyco-vdie-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={thickness}
                    onChange={(event) =>
                      setThickness(event.target.value)
                    }
                    placeholder='Enter sheet thickness'
                  />
                </label>
              </div>
            </article>

            <article className='zyco-vdie-card'>
              <h2 className='zyco-vdie-card__title'>
                Selection Output
              </h2>

              <dl className='zyco-vdie-results'>
                {outputRows.map(([label, value]) => (
                  <div
                    className='zyco-vdie-result'
                    key={label}
                  >
                    <dt className='zyco-vdie-result__label'>
                      {label}
                    </dt>

                    <dd className='zyco-vdie-result__value'>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                className='zyco-vdie-card__action'
                href={`/engineering-tools/press-brake-calculator?material=${materialKey}`}
              >
                Calculate Bending Force {'\u2192'}
              </a>
            </article>
          </div>

          <section
            className='zyco-vdie__panel'
            aria-labelledby='vdie-faq'
          >
            <h2
              className='zyco-vdie-card__title'
              id='vdie-faq'
            >
              V Die Selection FAQ
            </h2>

            <div className='zyco-vdie__faq'>
              {faqItems.map((item) => (
                <article
                  className='zyco-vdie__faq-item'
                  key={item.question}
                >
                  <h3 className='zyco-vdie__question'>
                    {item.question}
                  </h3>

                  <p className='zyco-vdie__answer'>
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-vdie__panel'
            aria-labelledby='vdie-related-tools'
          >
            <h2
              className='zyco-vdie-card__title'
              id='vdie-related-tools'
            >
              Related Engineering Tools
            </h2>

            <nav
              className='zyco-vdie__tools'
              aria-label='Related engineering tools'
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-vdie-card__action'
                  href={tool.href}
                  key={tool.title}
                >
                  {tool.title}
                </a>
              ))}
            </nav>
          </section>
        </section>
      </main>
    </>
  )
}
