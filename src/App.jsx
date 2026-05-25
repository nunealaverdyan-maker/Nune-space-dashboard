import './App.css'
import { useState, useEffect } from 'react'
import StarsBackground from './StarsBackground'
import click from './soundreality-sound-of-mouse-click-4-478760.mp3'


function playSound() {
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
  const galleryData = [
    {
      id: 1,
      src: "https://www.nasa.gov/wp-content/uploads/2023/03/hubble_j2034417_freggs_fullsize_0-1.jpg?w=1024",
      title: "frEGGs in Cygnus (Dark Molecular Hydrogen)",
      telescope: "Hubble Space Telescope",
      desc: "This image shows 'frEGGs' (Free-floating Evaporating Gaseous Globules) in the constellation Cygnus. These are dense pockets of interstellar gas where new stars are actively forming, protected from harsh stellar radiation."
    },
    {
      id: 2,
      src: "https://www.nasa.gov/wp-content/uploads/2023/03/gsfc_20171208_archive_e002049_orig.jpg?w=1024",
      title: "Cassiopeia A (Supernova Remnant)",
      telescope: "Chandra & Hubble Combined",
      desc: "A famous supernova remnant located 11,000 light-years away. This image shows the glowing remains of a massive star that exploded around 330 years ago, scattering heavy elements into deep space."
    },
    {
      id: 3,
      src: "https://www.nasa.gov/wp-content/uploads/2023/03/heic1501b_0.jpg?w=1024",
      title: "Pillars of Creation (Visible Light View)",
      telescope: "Hubble Space Telescope",
      desc: "One of the most iconic space photographs ever taken. Located in the Eagle Nebula, these giant pillars are composed of interstellar gas and dust, acting as a massive nursery for newborn stars."
    },
    {
      id: 4,
      src: "https://www.nasa.gov/wp-content/uploads/2024/06/potw2425a.jpg?w=907",
      title: "Irregular Galaxy NGC 5238",
      telescope: "Hubble Advanced Camera",
      desc: "A dwarf irregular galaxy located 14.5 million light-years away. It lacks a defined structure and looks like a bright swarm of stars, helping astronomers study the early stages of galactic evolution."
    },
    {
      id: 5,
      src: "https://www.nasa.gov/wp-content/uploads/2023/12/pia04609orig.jpg?w=958",
      title: "Andromeda Galaxy Core (M31)",
      telescope: "Spitzer Space Telescope (Infrared)",
      desc: "This infrared view pierces through cosmic dust to reveal the dense, crowded core of our nearest major galactic neighbor, the Andromeda Galaxy, highlighting old stellar populations."
    },
    {
      id: 6,
      src: "https://www.nasa.gov/wp-content/uploads/2024/03/hubble-leda42160-potw2411a-1.jpg?w=1024",
      title: "Spiral Galaxy LEDA 42160",
      telescope: "Hubble Space Telescope",
      desc: "A spiral galaxy undergoing 'ram-pressure stripping' as it moves through a dense galaxy cluster. Gas and dust are being forced out of the galaxy, leaving a trailing tail of material."
    },
    {
      id: 7,
      src: "https://www.nasa.gov/wp-content/uploads/2025/06/m31.jpg?w=1024",
      title: "Andromeda's Star Clusters & Dust Lanes",
      telescope: "Hubble / Webb Composite",
      desc: "A high-resolution view of M31's outer spiral arms, showing thousands of blue star clusters embedded within deep, dark lanes of complex interstellar dust networks."
    },
    {
      id: 8,
      src: "https://www.nasa.gov/wp-content/uploads/2025/03/helix.jpg?w=1024",
      title: "The Helix Nebula (NGC 7293)",
      telescope: "NASA Great Observatories",
      desc: "Often called the 'Eye of God,' the Helix Nebula is a planetary nebula formed by a dying intermediate-mass star, shedding its outer layers into space to create a glowing ring."
    },
    {
      id: 9,
      src: "https://www.nasa.gov/wp-content/uploads/2024/07/chandrawebb3-macs.jpg?w=1024",
      title: "MACS J0416.1-2403 (Galaxy Cluster)",
      telescope: "James Webb & Chandra X-ray",
      desc: "A massive cluster of galaxies that acts as a gravitational lens, magnifying and distorting the light of much more distant galaxies behind it, allowing a glimpse into the early universe."
    },
    {
      id: 10,
      src: "https://www.nasa.gov/wp-content/uploads/2016/03/frontier_macsj0717.jpg?w=1024",
      title: "MACS J0717.5+3745 (Cosmic Collision)",
      telescope: "Hubble Frontier Fields",
      desc: "One of the most complex and distorted galaxy clusters known. It is a site where four separate galaxy clusters are actively colliding, generating massive amounts of dark matter turbulence."
    }
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="card" style={{ width: '100%' }}>
      <h2>✦ More Images ✦</h2>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px', fontFamily: 'monospace' }}>
        ℹ️ Click on any image to inspect active NASA mission telemetry and deep space analysis.
      </p>
      <div className="image-gallery-grid">
        {galleryData.map((img) => (
          <div 
            key={img.id} 
            className="gallery-image-wrapper"
            onClick={() => setSelectedImage(img)}
            style={{ cursor: 'pointer' }}
          >
            <img src={img.src} alt={img.title} />
            <div className="gallery-hover-overlay">
              <span>View Data</span>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="nasa-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="nasa-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>✕</button>
            
            <div className="modal-body-layout">
              <div className="modal-img-container">
                <img src={selectedImage.src} alt={selectedImage.title} />
              </div>
              
              <div className="modal-info-sidebar">
                <span className="nasa-badge">NASA DATA LOG</span>
                <h3>{selectedImage.title}</h3>
                <p className="modal-telemetry">
                  <strong>🔭 Observatory:</strong> <span style={{ color: '#04ade8' }}>{selectedImage.telescope}</span>
                </p>
                <hr className="modal-divider" />
                <p className="modal-description">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MarsRover() {
  const [roverPic, setRoverPic] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          setRoverPic(data.photos[0]);
        }
      })
      .catch((err) => console.error("Mars Rover error:", err));
  }, []);

  return (
    <div className="card">
      <h2>✦ Mars Rover Live Photo ✦</h2>
      {roverPic ? (
        <div className="mars-rover-container">
          <h3>Rover: {roverPic.rover.name} ({roverPic.camera.full_name})</h3>
          <p>Earth Date: {roverPic.earth_date} | Status: {roverPic.rover.status}</p>
          <img
            src={roverPic.img_src}
            alt="Mars Surface"
            className="mars-rover-img"
          />
        </div>
      ) : (
        <p className="mars-loading-text">📡 Connecting to Curiosity Rover... Loading Mars Photo...</p>
      )}
    </div>
  );
}

function SatelliteTracker() {
  return (
    <div className="card">
      <h2>✦ NASA Eyes on the Earth — Live 3D Simulation ✦</h2>
      <div className="satellite-tracker-container">
        <iframe
          src="https://eyes.nasa.gov/apps/earth/"
          title="NASA Eyes on the Earth"
          className="satellite-iframe"
          allowFullScreen
          allow="autoplay; gyroscope; accelerometer"
        />
        <p>
          🌍 3D Interactive Visualization: Rotate the Earth, track ISS, and monitor global vital signs live.
        </p>
      </div>
    </div>
  );
}

function SolarSystem() {
  return (
    <div className="card">
      <h2>✦ NASA Eyes on the Solar System — Live 3D Orrery ✦</h2>
      <div className="satellite-tracker-container">
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/"
          title="NASA Eyes on the Solar System"
          className="satellite-iframe"
          allowFullScreen
          allow="autoplay; gyroscope; accelerometer"
        />
        <p>
          ☀️ Explore planets, moons, and NASA spacecraft in real-time as they orbit through our cosmic neighborhood.
        </p>
      </div>
    </div>
  );
}

function SatelliteCounter() {
  return (
    <div className="card">
      <h2>✦ NASA Satellite Database & Mission Monitor ✦</h2>
      <div className="satellite-tracker-container">
        <iframe
          src="https://eyes.nasa.gov/apps/earth/#/sc/active_satellites"
          title="NASA Active Satellites Data"
          className="satellite-iframe"
          style={{ height: '550px' }}
          allowFullScreen
        />
        <p>
          🛰️ <strong>Current Database:</strong> Exploring 9,451+ active payloads. Click on different satellite categories inside the tracker to filter by mission type (Weather, Communications, or Deep Space Research).
        </p>
      </div>
    </div>
  );
}

function AsteroidRadar() {
  const asteroidsData = [
    { name: "Apophis (99942)", size: "370 meters", speed: "26.7 km/s", danger: "High Monitoring" },
    { name: "Bennu (101955)", size: "492 meters", speed: "22.8 km/s", danger: "Potentially Hazardous" },
    { name: "2026 JL2", size: "45 meters", speed: "14.2 km/s", danger: "Safe Pass" },
    { name: "2026 KW1", size: "110 meters", speed: "19.5 km/s", danger: "Low Risk" },
  ];

  return (
    <div className="card asteroid-vertical-layout">
      <div className="asteroid-header-block">
        <h2>☄️ NEO (Near-Earth Objects) Data Desk</h2>
        <p className="panel-desc">
          NASA's Planetary Defense Coordination Office tracks thousands of asteroids to calculate their impact probabilities.
        </p>
        <div className="info-cards-mini">
          <div className="mini-card green-glow">
            <h4>Total Tracked</h4>
            <span className="stat-number">34,512</span>
          </div>
          <div className="mini-card red-glow">
            <h4>Potentially Hazardous</h4>
            <span className="stat-number">2,418</span>
          </div>
        </div>
      </div>
      <div className="asteroid-table-block">
        <h3>📊 Close Approach Live List</h3>
        <table className="nasa-table">
          <thead>
            <tr>
              <th>Object Name</th>
              <th>Est. Size</th>
              <th>Velocity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {asteroidsData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.speed}</td>
                <td className={`status-${item.danger.toLowerCase().replace(' ', '-')}`}>{item.danger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="asteroid-map-block">
        <h3>✦ 3D Orbital Trajectory Radar ✦</h3>
        <iframe
          src="https://eyes.nasa.gov/apps/asteroids/"
          title="NASA Asteroid Radar"
          className="satellite-iframe"
          style={{ height: '550px' }}
          allowFullScreen
          allow="autoplay; gyroscope; accelerometer"
        />
      </div>
    </div>
  );
}

function SpaceWeather() {
  return (
    <div className="card weather-vertical-layout">
      <div className="weather-status-block">
        <h2>☀️ Live Space Weather Alert Desk</h2>
        <p className="panel-desc">
          Monitoring real-time solar activity, coronal mass ejections (CMEs), and geomagnetic solar winds impacting Earth.
        </p>
        <div className="info-cards-mini">
          <div className="mini-card red-glow">
            <h4>Solar Flare Activity</h4>
            <span className="stat-number">HIGH (X-Class)</span>
          </div>
          <div className="mini-card orange-glow">
            <h4>Geomagnetic Storms</h4>
            <span className="stat-number">G2 (Moderate)</span>
          </div>
        </div>
      </div>
      <div className="weather-map-block">
        <h3>✦ NASA Solar Dynamics Observatory — 3D Helioviewer ✦</h3>
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/sun"
          title="NASA Live Sun Monitor"
          className="satellite-iframe"
          style={{ height: '550px' }}
          allowFullScreen
          allow="autoplay; gyroscope; accelerometer"
        />
        <p className="weather-footnote">
          ℹ️ <strong>Interactive View:</strong> Rotate the Sun to view current sunspots, solar magnetic loops, and active coronal holes captured by NASA's SDO spacecraft.
        </p>
      </div>
    </div>
  );
}

function LaunchStats() {
  return (
    <div className="card launch-vertical-layout">
      <div className="launch-status-block">
        <h2>🚀 Global Space Launch Mission Control</h2>
        <p className="panel-desc">
          Tracking global orbital launch attempts, payload deployments, and rocket booster recovery metrics.
        </p>

        <div className="info-cards-mini">
          <div className="mini-card cyan-glow">
            <h4>Total Launches (2026)</h4>
            <span className="stat-number">142</span>
          </div>
          <div className="mini-card green-glow">
            <h4>Success Rate</h4>
            <span className="stat-number">98.4%</span>
          </div>
        </div>
      </div>
      <div className="launch-map-block">
        <h3>✦ Live Spaceport Schedule & Next Missions ✦</h3>
        <iframe
          src="https://nextspaceflight.com/launches/widgets/"
          title="Rocket Launch Schedule"
          className="satellite-iframe"
          style={{ height: '500px', background: '#05050a' }}
          allowFullScreen
        />
        <p className="launch-footnote">
          📅 <strong>Launch Calendar:</strong> Scroll inside the widget to see upcoming countdowns, rocket models (Falcon 9, SLS, Electron), and launch pad locations worldwide.
        </p>
      </div>
    </div>
  );
}

function DailyFact() {
  return (
    <div className="card fact-vertical-layout">
      <div className="fact-header-block">
        <h2>✦ Cosmic Fact of the Day ✦</h2>
        <div className="main-fact-box">
          <p className="primary-fact">
            🚀 "One day on Venus is longer than one year on Venus!"
          </p>
          <p className="fact-explanation">
            <strong>Why?</strong> Venus rotates on its axis incredibly slowly, taking 243 Earth days to complete just one full spin. However, it takes only 225 Earth days to travel all the way around the Sun.
          </p>
        </div>
      </div>
      <div className="fact-interactive-grid">
        <div className="fact-image-panel">
          <h3>🛸 Interactive Venus Globe</h3>
          <iframe
            src="https://solarsystem.nasa.gov/gltf_embed/2343/"
            title="NASA 3D Venus Model"
            className="satellite-iframe"
            style={{ height: '320px', background: '#000' }}
            allowFullScreen
          />
        </div>

        <div className="more-facts-panel">
          <h3>📊 More Fast Space Facts</h3>
          <ul className="space-facts-list">
            <li>🌌 <strong>Space is completely silent:</strong> Sound waves need a medium (like air or water) to travel through, and space is a vacuum.</li>
            <li>🧥 <strong>A full NASA space suit costs:</strong> Around $12,000,000 (though 70% of that cost is for the backpack and control module).</li>
            <li>☀️ <strong>The Sun's mass:</strong> Accounts for 99.86% of the entire solar system's weight.</li>
          </ul>
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
              <AsteroidRadar />
            </div>
          ) : activeTab === 'space-weather' ? (
            <div className="custom-page-content">
              <SpaceWeather />
            </div>
          ) : activeTab === 'launch-stats' ? (

            <div className="custom-page-content">
              <LaunchStats />
            </div>
          ) : activeTab === 'satellite-counter' ? (
            <div className="custom-page-content">
              <SatelliteCounter />
            </div>
          ) : activeTab === 'space-fact' ? (
            <div className="custom-page-content">
              <DailyFact />
            </div>
          ) : activeTab === 'galaxy-map' ? (
            <div className="custom-page-content">
              <SolarSystem />
            </div>
          ) : activeTab === 'More Images' ? (
            <div className="custom-page-content">
              <HubbleGallery />
            </div>
          ) : activeTab === 'mars-rover' ? (
            <div className="custom-page-content">
              <MarsRover />
            </div>
          ) : (
            <div className="large-picture-section">
              <h2>PICTURE / VISUALIZATION</h2>
              <div className="picture-placeholder">
                <p>Deep Space Nebula View</p>
              </div>
            </div>
          )}
        </main>

        <aside className="info-sidebar">
          <h2>List of other information</h2>
          <ul>
            <li onClick={() => { setActiveTab('asteroid-risk'); playSound(); }}>✦ Asteroid Risk Meter</li>
            <li onClick={() => { setActiveTab('astronaut-cards'); playSound(); }}>✦ Astronaut Cards</li>
            <li onClick={() => { setActiveTab('visual-components'); playSound(); }}>✦ Visual Components</li>
            <li onClick={() => { setActiveTab('space-weather'); playSound(); }}>✦ Space Weather</li>
            <li onClick={() => { setActiveTab('launch-stats'); playSound(); }}>✦ Launch Statistics</li>
            <li onClick={() => { setActiveTab('satellite-counter'); playSound(); }}>✦ Satellite Counter</li>
            <li onClick={() => { setActiveTab('space-fact'); playSound(); }}>✦ Daily Space Fact</li>
            <li onClick={() => { setActiveTab('galaxy-map'); playSound(); }}>✦ Galaxy Map</li>
            <li onClick={() => { setActiveTab('More Images'); playSound(); }}>✦ More Images</li>
            <li onClick={() => { setActiveTab('mars-rover'); playSound(); }}>✦ Mars Rover Photos </li>
          </ul>
        </aside>
      </div>
    </>
  );
}