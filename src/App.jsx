 import './App.css'
 import { useState } from 'react'
 

 function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
 }


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
      { location ?(
        <p>{location.latitude.toFixed(2)}°,{location.longitude.toFixed(2)}°</p>
      ):(
        <p>Loading ...</p>
      )}
    </div>
  )
}
 
 function ISSCard(){
  return (
    <div className = "card">
      <h2>ISS Position</h2>
      <p>Latitude: 42.36</p>
      <p>Longitude: -71.05</p>
    </div>
  )
 }

 function MissionBadge() {
  return (
    <div className = "card">
      <p>Altitude: 1.000.000</p>
      <p>Velocity: 1000</p>
    </div>
  )
 }
 
 
 export default function App() {
   return (
    <div className = "dashboard">
      <h1>Nune-space-dashboard</h1>
      <p>20.05.2026</p>
      <ISSCard />
      <MissionBadge />
      <ISSCard latitude = "42.36" longitude="-71.05" />
      <MissionBadge name = "Artemis II" status="Active" />
      <Counter />
      <ISSTracker />
    </div>
    
   )
 }


