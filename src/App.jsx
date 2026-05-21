 import './App.css'
 
 
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

    </div>
    
   )
 }


