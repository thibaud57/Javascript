//Declaration de variables
let operator = "+";
const plus = "+";
const moins = "-";
const multi = "*";
const div = "/";
const point = ".";
const neg = "-";
let num1 = "0";
let num2 = "0";


const screen = document.getElementById("screen");

//fonction clear // sera également appellée lors de l'utilisation de C
function clear() {
  const dernier = screen.value; //on enregistre les élements de l'écran dans une variable
  screen.value = dernier.substr(0, dernier.length - 1); //on retire enfin le dernier élément à cette valeur d'écran
}

//fonction qui check si doublon
function double() {
  const str = screen.value;
  let test = false;
  let dernier = str.substr(-1);
  let avantd = str.substr(-2, 1); //on cherche le dernier caractere
  if (
    (dernier == plus ||
      dernier == moins ||
      dernier == multi ||
      dernier == div ||
      dernier == point 
      ) &&
    (avantd == plus ||
      avantd == moins ||
      avantd == multi ||
      avantd == div ||
      avantd == point 
      )
  ) {
    //tester si deux opérateurs se suivent
    test = true;
  }
  return test;
}

//check double neg
function doubleneg(test) {
  const str = screen.value;
  let dernier = str.substr(-1);
  let avantd = str.substr(-2, 1); //on cherche le dernier caractere
  if (
    (dernier == neg) && (avantd != neg)
  ) {
    test = true;
  }
  return test;
}

//fonction principale
function calculer(type, valeur) {
  const screen = document.getElementById("screen");

  switch (type) {
    case "num": //ajouter les numeros à l'écran
      if (screen.value == "0") {
        //enlever la valeur 0 initiale
        screen.value = "";
      }
      screen.value += valeur;
      break;

    case "deci": //ajouter la virgule
      let pointla = screen.value.indexOf("."); //si pas de point présent
      if (pointla == -1) {
        screen.value += valeur; //alors on ajoute
      }
      break;

    case "ope": //ajouter les opérateurs
      num1 = screen.value; //on garde le premier num en mémoire
      operator = valeur; //on stock l'opérateur dans une variable
      screen.value += valeur;
      test = double(); // on test si double grace a la fonction
      if (test == true) {
        screen.value = parseFloat(num1); //on efface l'opérateur
      }

      break;

    case "spe": //travail sur les touches spéciales
      switch (
        valeur //selon que la valeur de la touche
      ) {
        case "CE": //clear all
          screen.value = 0; //on remet 0
          break;

        case "C": //clear jusqu'à l'opérateur
          const str = screen.value;
          let dernier = str.substr(-1, 1); //on cherche le dernier caractere
          for (let i = 0; i < dernier.length; i++) {
            //boucle for jusqu'à la longeur de la chaine
            if (dernier != operator) {
              //si le dernier caractere n'est pas un opérateur
              screen.value = num1; //on retire les chiffres apres l'opérateur
            } else {
              screen.value = num1; //on retire ensuite l'opérateur
            }
          }

          break;

        case "->": //clear le dernier
          clear(); //appel de la fonction clear

          if (screen.value == "") {
            //si la valeur devient nulle
            screen.value = "0"; //on indique 0
          }
          break;
      }
      break;

    //la touche neg
    case "neg":
      if (screen.value == "0") {
        //enlever la valeur 0 initiale
        screen.value = "";
      }
     test = doubleneg();
     if (test == true){
       clear();
     }
      screen.value+= valeur;


      break;

    //Les opérations mathématiques

    case "egal": //calculer les valeurs
      num2 = parseFloat(screen.value.substring(num1.length + 1, screen.length)); //recupere num2 soit la valeur apres num1 et qui va jusqu'à la longeur max de la chaine

      switch (
        operator //selon que l'opératuer
      ) {
        case "+": //additione
          screen.value = parseFloat(num1) + parseFloat(num2);

          break;
        case "-": //soustrait
          screen.value = num1 - num2;
          break;
        case "*": //multiplie
          screen.value = num1 * num2;

          break;
        case "/": //divise
          if (num2 == 0) {
            screen.value = "3/5";
          } else {
            screen.value = num1 / num2;
          }

          break;
      }
      break;
  }
}
