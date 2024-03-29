let nextPersonId = 0;
export const firstNames = [
  "Aaliyah",
  "Aaron",
  "Abigail",
  "Adam",
  "Addison",
  "Adrian",
  "Aiden",
  "Alexa",
  "Alexandra",
  "Alexis",
  "Alice",
  "Allison",
  "Alyssa",
  "Amelia",
  "Andrew",
  "Angel",
  "Anna",
  "Annabelle",
  "Anthony",
  "Aria",
  "Ariana",
  "Arianna",
  "Asher",
  "Ashley",
  "Aubree",
  "Aubrey",
  "Audrey",
  "Austin",
  "Autumn",
  "Ava",
  "Avery",
  "Ayden",
  "Bella",
  "Benjamin",
  "Bentley",
  "Blake",
  "Brandon",
  "Brayden",
  "Brianna",
  "Brody",
  "Brooklyn",
  "Caleb",
  "Camden",
  "Cameron",
  "Camila",
  "Caroline",
  "Carson",
  "Carter",
  "Charles",
  "Charlotte",
  "Chase",
  "Chloe",
  "Christian",
  "Christopher",
  "Claire",
  "Colton",
  "Connor",
  "Cooper",
  "Daniel",
  "David",
  "Dominic",
  "Dylan",
  "Easton",
  "Eleanor",
  "Eli",
  "Elijah",
  "Elizabeth",
  "Ella",
  "Ellie",
  "Emily",
  "Emma",
  "Eva",
  "Evan",
  "Evelyn",
  "Faith",
  "Gabriel",
  "Gabriella",
  "Gavin",
  "Genesis",
  "Gianna",
  "Grace",
  "Grayson",
  "Hadley",
  "Hailey",
  "Hannah",
  "Harper",
  "Henry",
  "Hudson",
  "Hunter",
  "Ian",
  "Isaac",
  "Isabella",
  "Isabelle",
  "Isaiah",
  "Jace",
  "Jack",
  "Jackson",
  "Jasmine",
  "Jason",
  "Jaxon",
  "Jaxson",
  "Jayden",
  "Jeremiah",
  "John",
  "Jonathan",
  "Jordan",
  "Jose",
  "Joseph",
  "Joshua",
  "Josiah",
  "Juan",
  "Julia",
  "Julian",
  "Justin",
  "Katherine",
  "Kayden",
  "Kaylee",
  "Kennedy",
  "Kevin",
  "Khloe",
  "Kylie",
  "Landon",
  "Lauren",
  "Layla",
  "Leah",
  "Leo",
  "Levi",
  "Lillian",
  "Lily",
  "Lincoln",
  "Logan",
  "London",
  "Lucas",
  "Lucy",
  "Luis",
  "Luke",
  "Lydia",
  "Mackenzie",
  "Madeline",
  "Madelyn",
  "Madison",
  "Matthew",
  "Maya",
  "Melanie",
  "Mia",
  "Mila",
  "Naomi",
  "Natalie",
  "Nathan",
  "Nathaniel",
  "Nevaeh",
  "Nicholas",
  "Nolan",
  "Nora",
  "Oliver",
  "Olivia",
  "Owen",
  "Paisley",
  "Parker",
  "Penelope",
  "Peyton",
  "Piper",
  "Riley",
  "Robert",
  "Ruby",
  "Ryan",
  "Ryder",
  "Sadie",
  "Samantha",
  "Samuel",
  "Sarah",
  "Savannah",
  "Scarlett",
  "Sebastian",
  "Serenity",
  "Skylar",
  "Sofia",
  "Sophia",
  "Sophie",
  "Stella",
  "Taylor",
  "Thomas",
  "Tristan",
  "Tyler",
  "Victoria",
  "Violet",
  "Vivian",
  "Wyatt",
  "Xavier",
  "Zachary",
  "Zoe",
  "Zoey",
];
export const lastNames = [
  "Avey",
  "Crofoot",
  "Flor",
  "Barletta",
  "Zoller",
  "Rosson",
  "Coomes",
  "Wilken",
  "Withey",
  "Ojeda",
  "Mennella",
  "Gauer",
  "Puccio",
  "Zimmerer",
  "Cottrell",
  "Bridgman",
  "Gershman",
  "Tinoco",
  "Ayoub",
  "Fournier",
  "Marcella",
  "Melrose",
  "Lafontaine",
  "Cathcart",
  "Cioffi",
  "Sands",
  "Lei",
  "Cardoso",
  "Dela",
  "Metcalfe",
  "Ethridge",
  "Fryer",
  "Warden",
  "Madson",
  "Gonsales",
  "Tobey",
  "Knecht",
  "Gallion",
  "Thibault",
  "Brockington",
  "Baney",
  "Haddox",
  "Kang",
  "Galyean",
  "Riccio",
  "Lake",
  "Mirabella",
  "Frechette",
  "Rearick",
  "Carmouche",
];
const statuses = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
  "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.",
  "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the.",
];

const posterWidth = 400;
const posterHeight = 400;
let _canvas: HTMLCanvasElement;
function makePoster(color: string) {
  if (!_canvas) {
    _canvas = document.createElement("canvas");
    _canvas.width = posterWidth;
    _canvas.height = posterHeight;
  }
  const ctxt = _canvas.getContext("2d");
  if (ctxt) {
    ctxt.fillStyle = color;
    ctxt.fillRect(0, 0, posterWidth, posterHeight);
    return _canvas.toDataURL();
  } else {
    throw new Error("Unable to get 2D context from canvas");
  }
}

const posterColors = [
  [68, 34, 87],
  [100, 66, 119],
  [132, 98, 151],
  [164, 162, 165],
  [196, 194, 197],
  [228, 226, 229],
  [220, 77, 6],
  [252, 109, 38],
  [255, 141, 70],
];
const posters = posterColors.map(function (color) {
  return makePoster("rgb(" + color.join(", ") + ")");
});

function randomInt(first: number, last: number) {
  return Math.round(Math.random() * (last - first)) + first;
}

function randomElement(array: string[] | number[]) {
  return array[randomInt(0, array.length - 1)];
}

function genArray(
  minLength: number,
  maxLength: number,
  genElement: () => void
) {
  const len = randomInt(minLength, maxLength);
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = genElement();
  }
  return result;
}

function genName() {
  return randomElement(firstNames) + " " + randomElement(lastNames);
}

function genPhoneNumber() {
  return "555-0" + randomInt(100, 199);
}

function genPerson() {
  return {
    id: nextPersonId++,
    name: genName(),
    status: randomElement(statuses),
    statusHoursAgo: randomElement([2, 3, 4, 5, 6, 7, 8, 9]),
    picture: randomElement(posters),
    mobilePhone: genPhoneNumber(),
    workPhone: genPhoneNumber(),
  };
}

const personCount = 50;

export const people = genArray(personCount, personCount, genPerson);
