 import './App.css'
 import { useState, useEffect } from 'react'
 import StarsBackground from './StarsBackground'
 

 function ISSTracker(){
  const [location,setLocation] = useState(null)

  useEffect(() => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(r=> r.json())
      .then(data => setLocation(data))
  }, [])
  return (
    <div className='card'>
      <h2>ISS Position</h2>
      {location ?(
        <p>{location.latitude.toFixed(2)}°,{location.longitude.toFixed(2)}°</p>
      ):(
        <p>Loading ...</p>
      )}
    </div>
  )
}

function PeopleSpace () {
  const [people, setPeople ] = useState(null)

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
     .then(r => r.json())
     .then(data => setPeople(data.people))
  },[])

  return (
    <div className='card'>
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person =>(
            <li key={person.name}>
              {person.name} - {person.craft}
            </li>
          ))}
        </ul>
      ) : <p>Loading...</p>

      }
    </div>
  )

}

function APOD() {
  const [pic, setpic] = useState(null)

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(r => r.json())
    .then(data => setpic(data))
  }, [])

  return (
    <div className = 'card'>
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
          ?<img src={pic.url} alt = {pic.title} style={{width:'100%'}} />
          :<a href={pic.url} targent="_blank">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
 
function Asteroids() {
const [rocks, setRocks] = useState(null)
useEffect(() => {
const today = new Date().toISOString().split('T')[0]
fetch(
`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=D
EMO_KEY`
)
.then(r => r.json())
.then(data => {
setRocks(data.near_earth_objects[today])
})
}, [])
return (
<div className="card">
<h2>Asteroids Today</h2>
{rocks ? (
<ul>
{rocks.map(rock => (
<li key={rock.id}>
<h3>{rock.name}</h3>
<p>
Max Diameter:
{' '}
{rock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
m
</p>
<p>
Hazardous:
{' '}
{rock.is_potentially_hazardous_asteroid
? 'Yes'
: 'No'}
</p>
</li>

))}
</ul>
) : (
<p>Loading...</p>
)}
</div>
)
}
 
export default function App() {

  const mySound = new Audio('/Users/user/Nune-space-dashboard/src/assets/soundreality-sound-of-mouse-click-4-478760.mp3');
  mySound.play();

  return (
    <>
      <StarsBackground />
      <div className="dashboard">
        <h1>Nune-space-dashboard</h1>
        <p>20.05.2026</p>
        
        <div className="grid">
          <ISSTracker />
          <PeopleSpace />
          <APOD />
          <Asteroids />
        </div>
      </div>
    </>
  );
}


