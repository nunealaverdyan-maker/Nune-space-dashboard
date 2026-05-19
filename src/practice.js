// const name = "Nune"
// let count = 0

// console.log(name)
// console.log(count)


// function formatmiles(km) {
//     return km * 0.621
// }

// console.log(formatmiles(408))


// function describeAstronaut(name,craft) {
//     return name + " is " + craft
// }

// console.log(describeAstronaut("Alice", "currently aboard the ISS"))


// const issPosition = {
//     latitude: 800,
//     longitude: 750   
// }

// console.log(issPosition)
// console.log(issPosition.latitude)
// console.log(issPosition.longitude)


const asteroids = [
    { name: "2024 AB1", diameter: 120, hazardous: false},
    { name: "2024 CD2", diameter: 45, hazardous: true },
    { name: "2024 EF3", diameter: 890, hazardous: false },
    { name: "2024 GH4", diameter: 23, hazardous: true }
]

const names = asteroids.map(person => person.name)
console.log(names)

const issOnly = asteroids.filter(person => person.diameter)
console.log(issOnly)

const firstTwo = asteroids.slice(0, 2)
console.log(firstTwo)

const hazardousnames = asteroids.filter(person => person.hazardous).map(person => person.name)
console.log(hazardousnames)