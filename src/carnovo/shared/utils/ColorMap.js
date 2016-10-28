const colorMap = {
  "white": "white",
  "marfil": "white",
  "alpinweiß": "white",
  "blanco": "white",
  "red": "red",
  "rojo": "red",
  "black": "black",
  "negro": "black",
  "yellow": "yellow",
  "amarillo": "yellow",
  "silver": "silver",
  "titansilber": "silver",
  "blue": "blue",
  "azul": "blue",
  "green": "green",
  "orange": "orange",
  "naranja": "orange",
  "violet": "violet",
  "violeta": "violet",
  "lila": "violet",
  "verde": "verde",
  "marron": "maroon",
  "marrón": "maroon",
  "grey": "grey",
  "gris": "grey",
  "plata": "grey"
};

export default function getMappedColor(fullName) {
  if (!!fullName) {
    for (var key in colorMap) {
      if(colorMap.hasOwnProperty(key)){
        var colorSearch = fullName.toLowerCase();
        if (colorSearch.indexOf(key) > -1) {
          return colorMap[key];
        }
      }
    }
  }
  return 'grey';
};
