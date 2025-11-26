# Mama Mica Peptide Calculator

A beautiful, modern peptide dosage calculator built with React.js featuring a violet gradient theme.

## Features

- Calculate exact units to inject for desired peptide dosage
- Input fields for vial size, reconstitution volume, and desired dosage
- Support for both mcg and mg dosage units
- Real-time calculation of:
  - Units to inject (on insulin syringe)
  - Concentration (mg/ml and mcg per unit)
  - Volume to inject (ml)
- Responsive design that works on all devices
- Beautiful violet gradient theme

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. Enter the **Vial Size** in milligrams (mg) - the amount of peptide in your vial
2. Enter the **Reconstitution Volume** in milliliters (ml) - the amount of BAC water you'll add
3. Enter your **Desired Dosage** and select the unit (mcg or mg)
4. View the calculated results:
   - **Units to Inject**: The number of units to draw on your insulin syringe
   - **Concentration**: The resulting concentration in mg/ml and mcg per unit
   - **Volume to Inject**: The volume in milliliters
   - **Dosage**: Your target dosage

## Technology Stack

- React 18
- Vite
- CSS3 with gradient themes

## License

MIT
