export default (price, locale = 'es-ES', symbol = '€') =>
  !!price && (price = parseFloat(price)) && price != 0 ? [price.toLocaleString(locale, price % 1 != 0 ? {maximumFractionDigits: 2} : {}), symbol].join(" ") : ""
