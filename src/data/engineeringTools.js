export const engineeringTools = [
  {
    key: 'pressBrakeCalculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    key: 'pressBrakeCapacityCalculator',
    href: '/engineering-tools/press-brake-capacity-calculator',
  },
  {
    key: 'bendAllowanceCalculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
  {
    key: 'kFactorGuide',
    href: '/engineering-tools/k-factor-guide',
  },
  {
    key: 'bendDeductionGuide',
    href: '/engineering-tools/bend-deduction-guide',
  },
  {
    key: 'materialDatabase',
    href: '/engineering-tools/material-database',
  },
  {
    key: 'springbackDatabase',
    href: '/engineering-tools/springback-database',
  },
  {
    key: 'springbackCompensationGuide',
    href: '/engineering-tools/springback-compensation-guide',
  },
  {
    key: 'vDieSelectionTool',
    href: '/engineering-tools/v-die-selection-tool',
  },
  {
    key: 'vDieSelectionChart',
    href: '/engineering-tools/press-brake-v-die-selection-chart',
  },
  {
    key: 'insideRadiusGuide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    key: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
  },
  {
    key: 'bottomingVsCoiningGuide',
    href: '/engineering-tools/bottoming-vs-coining-guide',
  },
  {
    key: 'bendSequenceGuide',
    href: '/engineering-tools/bend-sequence-guide',
  },
  {
    key: 'pressBrakeTonnageGuide',
    href: '/engineering-tools/press-brake-tonnage-guide',
  },
  {
    key: 'vDieOpeningGuide',
    href: '/engineering-tools/how-to-choose-press-brake-v-die-opening',
  },
  {
    key: 'minimumFlangeLengthGuide',
    href: '/engineering-tools/minimum-flange-length-guide',
  },
  {
    key: 'toolingSelectionGuide',
    href: '/engineering-tools/press-brake-tooling-selection-guide',
  },
  {
    key: 'controllerSelectionGuide',
    href: '/engineering-tools/press-brake-controller-selection-guide',
  },
  {
    key: 'crowningGuide',
    href: '/engineering-tools/press-brake-crowning-guide',
  },
  {
    key: 'stainlessSteelBendingGuide',
    href: '/engineering-tools/stainless-steel-bending-guide',
  },
  {
    key: 'aluminumBendingGuide',
    href: '/engineering-tools/aluminum-bending-guide',
  },
]

export const engineeringHubTools = engineeringTools.map((tool) => ({
  ...tool,
  status: 'active',
}))

export const relatedEngineeringToolTuples = engineeringTools.map(
  ({ key, href }) => [key, href]
)

export const relatedEngineeringToolsWithLabelKey = engineeringTools.map(
  ({ key, href }) => ({
    labelKey: key,
    href,
  })
)
