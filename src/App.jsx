import './App.css'
import { useState, useEffect } from 'react'
import StarsBackground from './StarsBackground'
import click from './soundreality-sound-of-mouse-click-4-478760.mp3'


function playSound () {
  const audio = new Audio(click)
  audio.play()
}

function ISSTracker() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(r => r.json())
      .then(data => setLocation(data))
  }, [])
  return (
    <div className='card'>
      <h2>ISS Position</h2>
      {location ? (
        <p>{location.latitude.toFixed(2)}°,{location.longitude.toFixed(2)}°</p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  )
}

function PeopleSpace() {
  const [people, setPeople] = useState(null)

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className='card'>
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
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
    fetch('https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}')
      .then(r => r.json())
      .then(data => setpic(data))
  }, [])

  return (
    <div className='card'>
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
            ? <img src={pic.url} alt={pic.title} style={{ width: '100%' }} />
            : <a href={pic.url} targent="_blank">Watch video</a>
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
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=Xf5L1imXlGInPcTmHS2CQ5zmYC7oYFrzKLB6YNg9`)
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


function GalaxyMap() {
  const nasaSkyViewUrl = "https://science.nasa.gov/wp-content/uploads/2023/10/edu-solar-system-large.png";

  return (
    <div className="card" style={{ width: '100%' }}>
      <h2>✦ Interactive Galaxy Map ✦</h2>
      <div style={{ marginTop: '15px' }}>
        <h3>Milky Way Observations (NASA SkyView)</h3>
        <iframe
          src={nasaSkyViewUrl}
          title="NASA SkyView Map"
          style={{
            width: '100%',
            height: '500px',
            border: '1px solid rgba(4, 173, 232, 0.4)',
            borderRadius: '8px',
            background: '#000'
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
}


function HubbleGallery() {
  return (
    <div className="card" style={{ width: '100%' }}>
      <h2>✦ More Images ✦</h2>
      <div className="image-gallery-grid">
        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2023/03/hubble_j2034417_freggs_fullsize_0-1.jpg?w=1024" alt="Space 1" />
        </div>

        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2023/03/gsfc_20171208_archive_e002049_orig.jpg?w=1024" alt="Space 2" />
        </div>

        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2023/03/heic1501b_0.jpg?w=1024" alt="Space 3" />
        </div>

        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2024/06/potw2425a.jpg?w=907" alt="Space 4" />
        </div>

        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2023/12/pia04609orig.jpg?w=958" alt="Space 5" />
        </div>

        <div className="gallery-image-wrapper">
          <img src="https://www.nasa.gov/wp-content/uploads/2024/03/hubble-leda42160-potw2411a-1.jpg?w=1024" alt="Space 6" />
        </div>
      </div>
    </div>
  );
}

export default function App() {

  


  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <StarsBackground />
      <div className="app-container">
        <aside className="sidebar">
          <div className="icon" onClick={() => { setActiveTab('home'); playSound(); }}>🏠</div>
        </aside>
        <main className="main-content">
          <div className="dashboard-header">
            <h1>Nune-space-dashboard</h1>
            <p>20.05.2026</p>
          </div>
          {activeTab === 'home' ? (
            <div className="cards-grid">
              <ISSTracker />
              <Asteroids />
              <PeopleSpace />
              <APOD />
            </div>
          ) : activeTab === 'asteroid-risk' ? (
            <div className="custom-page-content">
              <h2>✦ ASTEROID RISK METER ✦</h2>
              <div className="nasa-data-box">
                <Asteroids />
              </div>
            </div>
          ) : activeTab === 'astronaut-cards' ? (
            <div className="custom-page-content">
              <h2>✦ ASTRONAUT CARDS ✦</h2>
              <div className="nasa-data-box">
                <PeopleSpace />
              </div>
            </div>
          ) : activeTab === 'visual-components' ? (
            <div className="custom-page-content">
              <h2>✦ VISUAL COMPONENTS ✦</h2>
              <div className="nasa-data-box">
                <p style={{ color: '#4ade80' }}>🟢 SYSTEM STATUS: ONLINE</p>
                <div className="loading-bar-mock"></div>
              </div>
            </div>
          ) : activeTab === 'space-weather' ? (
            <div className="custom-page-content">
              <h2>✦ SPACE WEATHER ✦</h2>
              <div className="nasa-data-box">
                <p>☀️ Solar Flare Activity: <span style={{ color: '#ef4444' }}>HIGH</span></p>
                <p>🌌 Geomagnetic Storms: G2 (Moderate)</p>
              </div>
            </div>
          ) : activeTab === 'iss-tracker' ? (
            <div className="custom-page-content">
              <h2>✦ ISS LIVE TRACKER ✦</h2>
              <div className="nasa-data-box">
                <ISSTracker />
              </div>
            </div>
          ) : activeTab === 'launch-stats' ? (
            <div className="custom-page-content">
              <h2>✦ LAUNCH STATISTICS ✦</h2>
              <div className="nasa-data-box">
                <p>🚀 Total Launches (2026): 142</p>
                <p>✅ Success Rate: 98.4%</p>
              </div>
            </div>
          ) : activeTab === 'satellite-counter' ? (
            <div className="custom-page-content">
              <h2>✦ SATELLITE COUNTER ✦</h2>
              <div className="nasa-data-box">
                <p>🛰️ Active Satellites in Orbit: 9,451</p>
              </div>
            </div>
          ) : activeTab === 'space-fact' ? (
            <div className="custom-page-content">
              <h2>✦ DAILY SPACE FACT ✦</h2>
              <div className="nasa-data-box">
                <p style={{ fontStyle: 'italic', color: '#4ade80', textAlign: 'center' }}>
                  "One day on Venus is longer than one year on Venus!"
                </p>
              </div>
            </div>
          ) : activeTab === 'space-sounds' ? (
            <div className="custom-page-content">
              <h2>✦ SPACE SOUNDS ✦</h2>
              <div className="nasa-data-box">
                <p> Ambient Cosmic Background Frequencies</p>
              </div>
            </div>
          ) : activeTab === 'galaxy-map' ? (
            <div className="custom-page-content">
              <GalaxyMap />
            </div>
          ) :  activeTab === 'More Images' ? (
            <div className="custom-page-content">
              <HubbleGallery />
            </div>
          ) : null}
          <div className="large-picture-section">
            <h2>PICTURE / VISUALIZATION</h2>
            <div className="picture-placeholder">
              <p>Deep Space Nebula View</p>
            </div>
          </div>
        </main>

        <aside className="info-sidebar">
  <h2>List of other information</h2>
  <ul>
    <li onClick={() => { setActiveTab('asteroid-risk'); playSound(); }}>✦ Asteroid Risk Meter</li>
    <li onClick={() => { setActiveTab('astronaut-cards'); playSound(); }}>✦ Astronaut Cards</li>
    <li onClick={() => { setActiveTab('visual-components'); playSound(); }}>✦ Visual Components</li>
    <li onClick={() => { setActiveTab('space-weather'); playSound(); }}>✦ Space Weather</li>
    <li onClick={() => { setActiveTab('iss-tracker'); playSound(); }}>✦ ISS Live Tracker</li>
    <li onClick={() => { setActiveTab('launch-stats'); playSound(); }}>✦ Launch Statistics</li>
    <li onClick={() => { setActiveTab('satellite-counter'); playSound(); }}>✦ Satellite Counter</li>
    <li onClick={() => { setActiveTab('space-fact'); playSound(); }}>✦ Daily Space Fact</li>
    <li onClick={() => { setActiveTab('space-sounds'); playSound(); }}>✦ Space Sounds</li>
    <li onClick={() => { setActiveTab('galaxy-map'); playSound(); }} style={{ color: '#04ade8' }}>✦ Galaxy Map (New)</li>
    <li onClick={() => { setActiveTab('More Images'); playSound(); }}>✦ More Images</li>
  </ul>
</aside>
      </div>
    </>
  );
}