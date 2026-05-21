import { useEffect, useMemo, useState } from 'react'

const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    recommendedKFactor: 0.33,
    naturalInsideRadiusFactor: 0.16,
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    recommendedKFactor: 0.33,
    naturalInsideRadiusFactor: 0.16,
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.18,
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.18,
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    recommendedKFactor: 0.4,
    naturalInsideRadiusFactor: 0.14,
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.16,
  },
]

const faqItems = [
  {
    question: 'What is bend allowance?',
    answer:
      'Bend allowance is the arc length of the neutral axis through the bend area. It is used to calculate the flat pattern length of a bent sheet metal part.',
  },
  {
    question: 'What is K-Factor?',
    answer:
      'K-Factor describes the position of the neutral axis relative to the sheet thickness. It varies with material, tooling, inside radius and bending method.',
  },
  {
    question: 'Is K-Factor fixed for one material?',
    answer:
      'No. K-Factor is a practical reference value. It can change with inside radius, V-opening, material condition and bending method.',
  },
  {
    question: 'How is bend deduction different from bend allowance?',
    answer:
      'Bend allowance represents the developed arc length through the bend, while bend deduction is used to subtract from flange dimensions to calculate flat length.',
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
  {
    title: 'Bend Allowance Calculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
]

const formatMillimeters = (value) => `${value.toFixed(2)} mm`
const formatAutoInsideRadius = (value) => `\u2248 ${value.toFixed(1)} mm`
const formatRadiusInput = (value) => value.toFixed(1)

const getStandardAutoVDie = (thickness) => {
  if (thickness < 8) return thickness * 8

  if (thickness < 25) return thickness * 10

  return thickness * 12
}

export default function BendAllowanceCalculator() {
  const [materialKey, setMaterialKey] = useState('mildSteel')
  const [thickness, setThickness] = useState('2')
  const [insideRadius, setInsideRadius] = useState('2.6')
  const [bendAngle, setBendAngle] = useState('90')
  const [kFactor, setKFactor] = useState('0.33')
  const [isManualRadiusOverride, setIsManualRadiusOverride] =
    useState(false)

  useEffect(() => {
    document.title =
      'Bend Allowance Calculator | Sheet Metal Flat Pattern Reference | ZYCO'

    const description =
      'Calculate sheet metal bend allowance, outside setback and bend deduction with material K-Factor references for press brake flat pattern planning.'

    let metaDescription = document.querySelector('meta[name="description"]')

    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute('content', description)
  }, [])

  const selectedMaterial =
    materials.find((material) => material.materialKey === materialKey) ||
    materials[0]

  const autoEstimatedInsideRadius = useMemo(() => {
    const thicknessValue = Number(thickness)
    const bendAngleValue = Number(bendAngle)

    if (!Number.isFinite(thicknessValue) || thicknessValue <= 0) {
      return null
    }

    const standardAutoVDie = getStandardAutoVDie(thicknessValue)
    const baseRadius =
      standardAutoVDie * selectedMaterial.naturalInsideRadiusFactor
    const rawAngleFactor = Number.isFinite(bendAngleValue)
      ? 1 + (bendAngleValue - 90) * 0.002
      : 1
    const angleFactor = Math.min(
      1.08,
      Math.max(0.94, rawAngleFactor)
    )

    return baseRadius * angleFactor
  }, [
    bendAngle,
    selectedMaterial,
    thickness,
  ])

  useEffect(() => {
    if (
      isManualRadiusOverride ||
      autoEstimatedInsideRadius === null
    ) {
      return
    }

    setInsideRadius(formatRadiusInput(autoEstimatedInsideRadius))
  }, [
    autoEstimatedInsideRadius,
    isManualRadiusOverride,
  ])

  const result = useMemo(() => {
    const thicknessValue = Number(thickness)
    const insideRadiusValue = Number(insideRadius)
    const bendAngleValue = Number(bendAngle)
    const kFactorValue = Number(kFactor)

    const hasValidInputs = [
      thicknessValue,
      insideRadiusValue,
      bendAngleValue,
      kFactorValue,
    ].every((value) => Number.isFinite(value) && value > 0)

    if (!hasValidInputs) {
      return null
    }

    const angleRadians = (bendAngleValue * Math.PI) / 180
    const halfAngleRadians = ((bendAngleValue / 2) * Math.PI) / 180
    const bendAllowance =
      angleRadians *
      (insideRadiusValue + kFactorValue * thicknessValue)
    const outsideSetback =
      Math.tan(halfAngleRadians) *
      (insideRadiusValue + thicknessValue)
    const bendDeduction = 2 * outsideSetback - bendAllowance

    return {
      bendAllowance,
      outsideSetback,
      bendDeduction,
    }
  }, [
    bendAngle,
    insideRadius,
    kFactor,
    thickness,
  ])

  const handleMaterialChange = (event) => {
    const nextMaterialKey = event.target.value
    const nextMaterial =
      materials.find((material) => material.materialKey === nextMaterialKey) ||
      materials[0]

    setMaterialKey(nextMaterialKey)
    setKFactor(nextMaterial.recommendedKFactor.toFixed(2))
  }

  const handleInsideRadiusChange = (event) => {
    setInsideRadius(event.target.value)
    setIsManualRadiusOverride(true)
  }

  const useAutoEstimatedRadius = () => {
    if (autoEstimatedInsideRadius === null) {
      return
    }

    setInsideRadius(formatRadiusInput(autoEstimatedInsideRadius))
    setIsManualRadiusOverride(false)
  }

  const outputRows = [
    [
      'Bend Allowance',
      result ? formatMillimeters(result.bendAllowance) : '--',
    ],
    [
      'Outside Setback',
      result ? formatMillimeters(result.outsideSetback) : '--',
    ],
    [
      'Bend Deduction',
      result ? formatMillimeters(result.bendDeduction) : '--',
    ],
  ]

  return (
    <>
      <style>
        {`
          .zyco-bend {
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

          .zyco-bend::before {
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

          .zyco-bend::after {
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

          .zyco-bend__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-bend__header,
          .zyco-bend-card,
          .zyco-bend__panel {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-bend__header {
            margin-bottom: 34px;
            padding: 34px;
          }

          .zyco-bend__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-bend__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-bend__subtitle {
            max-width: 760px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-bend__grid {
            display: grid;
            grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.1fr);
            gap: 18px;
            align-items: stretch;
          }

          .zyco-bend-card,
          .zyco-bend__panel {
            box-sizing: border-box;
            padding: 24px;
            position: relative;
            overflow: hidden;
          }

          .zyco-bend-card {
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
          }

          .zyco-bend-card::before,
          .zyco-bend__panel::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-bend-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-bend-card__title,
          .zyco-bend__panel-title {
            margin: 0 0 20px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-bend-form {
            display: grid;
            gap: 16px;
          }

          .zyco-bend-field {
            display: grid;
            gap: 8px;
          }

          .zyco-bend-field__label {
            padding-left: 6px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .zyco-bend-field__control {
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

          .zyco-bend-field__control:focus {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.15),
              0 0 25px rgba(59, 130, 246, 0.15);
          }

          .zyco-bend-field__hint {
            margin: 0;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 650;
          }

          .zyco-bend-radius-reference {
            display: grid;
            gap: 10px;
            padding: 14px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.24);
          }

          .zyco-bend-radius-reference__value {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.6;
            font-weight: 750;
          }

          .zyco-bend-radius-reference__note {
            margin: 0;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.6;
            font-weight: 650;
          }

          .zyco-bend-radius-reference__status {
            margin: 0;
            color: #facc15;
            font-size: 12px;
            line-height: 1.45;
            font-weight: 900;
            letter-spacing: 0.9px;
            text-transform: uppercase;
          }

          .zyco-bend-results {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin: 0 0 22px;
          }

          .zyco-bend-result {
            padding: 20px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 20px;
            background:
              radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 48%),
              rgba(15, 23, 42, 0.28);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .zyco-bend-result__label {
            margin: 0 0 10px;
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-bend-result__value {
            margin: 0;
            color: #ffffff;
            font-size: 25px;
            line-height: 1.2;
            font-weight: 900;
            overflow-wrap: anywhere;
          }

          .zyco-bend__formula {
            display: grid;
            gap: 10px;
            margin: 0 0 24px;
            padding: 0;
            list-style: none;
          }

          .zyco-bend__formula-item {
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.16);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.22);
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 700;
          }

          .zyco-bend__actions,
          .zyco-bend__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-bend__actions {
            margin-top: 24px;
          }

          .zyco-bend__action {
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

          button.zyco-bend__action {
            border: 0;
            cursor: pointer;
            font-family: inherit;
          }

          .zyco-bend__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-bend__panel {
            margin-top: 22px;
          }

          .zyco-bend__text {
            max-width: 980px;
            margin: 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.75;
            font-weight: 650;
          }

          .zyco-bend__text + .zyco-bend__text {
            margin-top: 12px;
          }

          .zyco-bend__notes {
            display: grid;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .zyco-bend__note {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
          }

          .zyco-bend__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-bend__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-bend__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-bend__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          @media (max-width: 980px) {
            .zyco-bend__grid,
            .zyco-bend-results {
              grid-template-columns: 1fr;
            }

            .zyco-bend__title {
              font-size: 38px;
            }
          }

          @media (max-width: 720px) {
            .zyco-bend__faq {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .zyco-bend {
              padding: 28px 14px;
            }

            .zyco-bend__header,
            .zyco-bend-card,
            .zyco-bend__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-bend__title {
              font-size: 32px;
            }

            .zyco-bend__subtitle {
              font-size: 16px;
            }

            .zyco-bend__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-bend'>
        <section className='zyco-bend__shell'>
          <header className='zyco-bend__header'>
            <p className='zyco-bend__eyebrow'>
              Engineering Calculator
            </p>

            <h1 className='zyco-bend__title'>
              Bend Allowance Calculator
            </h1>

            <p className='zyco-bend__subtitle'>
              Calculate sheet metal bend allowance, bend deduction and flat pattern reference values
            </p>
          </header>

          <div className='zyco-bend__grid'>
            <article className='zyco-bend-card'>
              <h2 className='zyco-bend-card__title'>
                Input Parameters
              </h2>

              <div className='zyco-bend-form'>
                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    Material
                  </span>

                  <select
                    className='zyco-bend-field__control'
                    value={materialKey}
                    onChange={handleMaterialChange}
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

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    Thickness (mm)
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={thickness}
                    onChange={(event) => setThickness(event.target.value)}
                  />
                </label>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    Inside Radius (mm)
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={insideRadius}
                    onChange={handleInsideRadiusChange}
                  />
                </label>

                <div className='zyco-bend-radius-reference'>
                  <p className='zyco-bend-radius-reference__value'>
                    Auto Estimated Inside Radius:{' '}
                    {autoEstimatedInsideRadius === null
                      ? '--'
                      : formatAutoInsideRadius(autoEstimatedInsideRadius)}
                  </p>

                  <p className='zyco-bend-radius-reference__note'>
                    Calculated from standard V-opening, material factor and a
                    small bend-angle adjustment.
                  </p>

                  {isManualRadiusOverride && (
                    <p className='zyco-bend-radius-reference__status'>
                      Manual Radius Override Active
                    </p>
                  )}

                  <button
                    className='zyco-bend__action'
                    type='button'
                    onClick={useAutoEstimatedRadius}
                  >
                    Use Auto Estimated Radius
                  </button>
                </div>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    Bend Angle (degrees)
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={bendAngle}
                    onChange={(event) => setBendAngle(event.target.value)}
                  />
                </label>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    K-Factor
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.01'
                    type='number'
                    value={kFactor}
                    onChange={(event) => setKFactor(event.target.value)}
                  />
                </label>

                <p className='zyco-bend-field__hint'>
                  Recommended K-Factor for {selectedMaterial.name}:{' '}
                  {selectedMaterial.recommendedKFactor.toFixed(2)}
                </p>
              </div>
            </article>

            <article className='zyco-bend-card'>
              <h2 className='zyco-bend-card__title'>
                Calculation Output
              </h2>

              <dl className='zyco-bend-results'>
                {outputRows.map(([label, value]) => (
                  <div
                    className='zyco-bend-result'
                    key={label}
                  >
                    <dt className='zyco-bend-result__label'>
                      {label}
                    </dt>

                    <dd className='zyco-bend-result__value'>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className='zyco-bend-card__title'>
                Formula Reference
              </h3>

              <p className='zyco-bend__text'>
                Bend allowance uses the neutral axis arc length formula:
              </p>

              <ul className='zyco-bend__formula'>
                <li className='zyco-bend__formula-item'>
                  BA = A x pi / 180 x (R + K x T)
                </li>

                <li className='zyco-bend__formula-item'>
                  Where: A = bend angle in degrees, R = inside radius,
                  K = K-factor, T = material thickness
                </li>

                <li className='zyco-bend__formula-item'>
                  Outside setback: OSSB = tan(A / 2) x (R + T)
                </li>

                <li className='zyco-bend__formula-item'>
                  Bend deduction: BD = 2 x OSSB - BA
                </li>
              </ul>

              <p className='zyco-bend__text'>
                These formulas are standard sheet metal development
                references. Actual flat pattern results may vary depending on
                material grade, grain direction, tooling, bend method,
                springback compensation and production tolerance. For
                production parts, trial bending and measurement are
                recommended.
              </p>

              <div className='zyco-bend__actions'>
                <a
                  className='zyco-bend__action'
                  href='/engineering-tools/v-die-selection'
                >
                  Use Estimated Radius from V Die Tool {'\u2192'}
                </a>

                <a
                  className='zyco-bend__action'
                  href={`/engineering-tools/press-brake-calculator?material=${materialKey}`}
                >
                  Calculate Bending Force {'\u2192'}
                </a>
              </div>
            </article>
          </div>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-engineering-overview'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-engineering-overview'
            >
              Engineering Overview
            </h2>

            <p className='zyco-bend__text'>
              Bend allowance is used to estimate the developed length needed
              for a sheet metal flat pattern before press brake forming. It is
              affected by material thickness, inside bend radius, bend angle,
              K-Factor, material ductility and the bending method. In practical
              air bending, the selected V-opening, tooling geometry and
              material condition can shift the neutral axis and change the
              final flat pattern reference value.
            </p>

            <p className='zyco-bend__text'>
              In air bending, the inside radius is mainly determined by the
              V-opening and material properties. Bend angle can slightly
              influence the formed radius, so this calculator applies a
              conservative angle adjustment for engineering reference.
            </p>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-reference-notes'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-reference-notes'
            >
              Engineering Reference Notes
            </h2>

            <ul className='zyco-bend__notes'>
              <li className='zyco-bend__note'>
                K-Factor is an engineering reference value.
              </li>

              <li className='zyco-bend__note'>
                Actual flat pattern results may vary depending on material
                grade, grain direction, tooling, bend method and production
                tolerance.
              </li>

              <li className='zyco-bend__note'>
                For production parts, trial bending and measurement are
                recommended.
              </li>
            </ul>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-faq'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-faq'
            >
              Bend Allowance FAQ
            </h2>

            <div className='zyco-bend__faq'>
              {faqItems.map((item) => (
                <article
                  className='zyco-bend__faq-item'
                  key={item.question}
                >
                  <h3 className='zyco-bend__question'>
                    {item.question}
                  </h3>

                  <p className='zyco-bend__answer'>
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-related-tools'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-related-tools'
            >
              Related Engineering Tools
            </h2>

            <nav
              className='zyco-bend__tools'
              aria-label='Related engineering tools'
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-bend__action'
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
