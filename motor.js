
const AMOUNT_MINIMUM_MALE = {
  '26': {
    'A': 100,
    'B': 1000,
    'C': 400,
    'D': 400,
  },
  '27': {
    'A': 400,
    'B': 600,
    'C': 200,
    'D': 300,
  },
  '28': {
    'A': 900,
    'B': 1000,
    'C': 200,
    'D': 500,
  },
  '29': {
    'A': 100,
    'B': 1000,
    'C': 1000,
    'D': 900,
  },
  '30': {
    'A': 600,
    'B': 1000,
    'C': 600,
    'D': 1000,
  },
}
const AMOUNT_MINIMUM_FEMALE = {
  '24': {
    'A': 800,
    'B': 800,
    'C': 200,
    'D': 500,
  },
  '25': {
    'A': 800,
    'B': 700,
    'C': 900,
    'D': 1000,
  },
  '26': {
    'A': 800,
    'B': 100,
    'C': 700,
    'D': 600,
  },
  '27': {
    'A': 600,
    'B': 600,
    'C': 800,
    'D': 400,
  },
  '28': {
    'A': 200,
    'B': 700,
    'C': 100,
    'D': 700,
  },
}
const AMOUNT_MAXIMUM_MALE = {
  '26': {
    'A': 4900,
    'B': 4700,
    'C': 5000,
    'D': 4400,
  },
  '27': {
    'A': 4700,
    'B': 4400,
    'C': 4700,
    'D': 4700,
  },
  '28': {
    'A': 4600,
    'B': 5000,
    'C': 5000,
    'D': 4300,
  },
  '29': {
    'A': 4600,
    'B': 4400,
    'C': 4200,
    'D': 4900,
  },
  '30': {
    'A': 4500,
    'B': 4900,
    'C': 4600,
    'D': 4300,
  },
}
const AMOUNT_MAXIMUM_FEMALE = {
  '24': {
    'A': 4000,
    'B': 4700,
    'C': 4600,
    'D': 5000,
  },
  '25': {
    'A': 4200,
    'B': 4200,
    'C': 4900,
    'D': 4900,
  },
  '26': {
    'A': 4100,
    'B': 4500,
    'C': 4600,
    'D': 4700,
  },
  '27': {
    'A': 4200,
    'B': 4300,
    'C': 4700,
    'D': 5000,
  },
  '28': {
    'A': 4500,
    'B': 4400,
    'C': 4000,
    'D': 4300,
  },
}

const getMonthsSinceFirstJob = (firstJobDate) => {

  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!firstJobDate || !regex.test(firstJobDate)) throw new Error('Invalid first job date')

  const [day, month, year] = firstJobDate.split('/');

  const todayTime = new Date().getTime()
  const firstJobTime = new Date(`${year}-${month}-${day}`).getTime();

  const MONTH = (1000 * 60 * 60 * 24 * 30);

  return Math.floor((todayTime - firstJobTime) / MONTH)
}

const getAmountsForMale = (totalMonths, tipoNomina) => {

  if (typeof value === 'number' && !isNaN(value))
    throw new Error('the total number of months since you got your first job is required')

  let amountMaximum = null;
  let amountMinimum = null;

  if (totalMonths <= 26) {
    amountMaximum = AMOUNT_MAXIMUM_MALE['26'][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_MALE['26'][tipoNomina]
  } else if (totalMonths > 29) {
    amountMaximum = AMOUNT_MAXIMUM_MALE['30'][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_MALE['30'][tipoNomina]
  } else {
    amountMaximum = AMOUNT_MAXIMUM_MALE[`${totalMonths}`][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_MALE[`${totalMonths}`][tipoNomina]
  }

  return { max: amountMaximum, min: amountMinimum }
}

const getAmountsForFemale = (totalMonths, tipoNomina) => {

  if (typeof value === 'number' && !isNaN(value))
    throw new Error('The total number of months since you got your first job is required')

  let amountMaximum = null;
  let amountMinimum = null;

  if (totalMonths <= 24) {
    amountMaximum = AMOUNT_MAXIMUM_FEMALE['24'][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_FEMALE['24'][tipoNomina]
  } else if (totalMonths > 27) {
    amountMaximum = AMOUNT_MAXIMUM_FEMALE['28'][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_FEMALE['28'][tipoNomina]
  } else {
    amountMaximum = AMOUNT_MAXIMUM_FEMALE[`${totalMonths}`][tipoNomina]
    amountMinimum = AMOUNT_MINIMUM_FEMALE[`${totalMonths}`][tipoNomina]
  }

  return { max: amountMaximum, min: amountMinimum }
}

const getLineaRecommendation = (amountMax, amountMin) => {

  const p1 = amountMin + (Math.sqrt((amountMax - amountMin)))
  const p2 = amountMin + (0.0175 * (amountMax - amountMin))

  return Math.max(p1, p2)
}

function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {

  const monthsSinceFirstJob = getMonthsSinceFirstJob(fechaPrimerEmpleo)

  if (!(['m', 'f'].includes(genero))) throw new Error('Invalid genre');

  const amount = genero === 'm'
    ? getAmountsForMale(monthsSinceFirstJob, tipoNomina)
    : getAmountsForFemale(monthsSinceFirstJob, tipoNomina)

  const recommendationLinea = getLineaRecommendation(amount.max, amount.min)

  return {
    'montoMinimo': amount.max,
    'montoMáximo': amount.min,
    'recomendacionLinea': recommendationLinea
  }

}

console.log('\n')
console.log('A', '12/06/2022', 'f')
console.table(calculoMotor('A', '12/06/2022', 'f')) // { montoMinimo: 4000, 'montoMáximo': 800, recomendacionLinea: 856.5685424949238 }

console.log('B', '30/12/1993', 'f')
console.table(calculoMotor('B', '30/12/1993', 'f')) // { montoMinimo: 4400, 'montoMáximo': 700, recomendacionLinea: 764.75 }

console.log('C', '19/09/2020', 'm')
console.table(calculoMotor('C', '19/09/2020', 'm')) // { montoMinimo: 4600, 'montoMáximo': 600, recomendacionLinea: 670 }

console.log('D', '15/01/2019', 'm')
console.table(calculoMotor('D', '15/01/2019', 'm')) // { montoMinimo: 4300, 'montoMáximo': 1000, recomendacionLinea: 1057.75 }