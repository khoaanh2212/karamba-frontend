export const FREE_DELIVERY_100 = "FREE_DELIVERY_100";
export const FREE_DELIVERY_300 = "FREE_DELIVERY_300";
export const FREE_DELIVERY_AT_DEALERSHIP = "FREE_DELIVERY_AT_DEALERSHIP";
export const FREE_TRAVEL_TO_DEALER = "FREE_TRAVEL_TO_DEALER";
export const FREE_TRANSPORT = "FREE_TRANSPORT";
export const FULL_GAS = "FULL_GAS";
export const AGENCY_EXPENSES_INCLUDED = "AGENCY_EXPENSES_INCLUDED";

const GeneralConditions = [
  {
    type: FREE_DELIVERY_100,
    text: "Entrega gratuita hasta 100Kms"
  },
  {
    type: FREE_DELIVERY_300,
    text: "Entrega gratuita hasta 300Kms"
  },
  {
    type: FREE_TRANSPORT,
    text: "Entrega gratuita a nivel nacional"
  },
  {
    type: FREE_DELIVERY_AT_DEALERSHIP,
    text: "Depósito lleno incluido si el vehículo es recogido en el concesionario"
  },
  {
    type: FULL_GAS,
    text: "Depósito lleno en la entrega"
  },
  {
    type: FREE_TRAVEL_TO_DEALER,
    text: "Tu desplazamiento hasta el concesionario gratis"
  },
  {
    type: AGENCY_EXPENSES_INCLUDED,
    text: "Gastos de gestoría incluidos"
  }
];

export const GeneralConditionMap = (condition) => {
  let text = "";
  if (condition) {
    GeneralConditions.map((con)=>{
      if (condition == con.type) {
        text = con.text
      }
    })
  }
  return text
};
