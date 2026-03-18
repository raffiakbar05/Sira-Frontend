'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const LoginPage        = dynamic(() => import('./components/LoginPage'),        { ssr: false });
const HeroCustomization= dynamic(() => import('./components/HeroCustomization'),{ ssr: false });
const Navbar           = dynamic(() => import('./components/Navbar'),           { ssr: false });
const AdventurePage    = dynamic(() => import('./components/Adventure'),        { ssr: false });
const ProfilePage      = dynamic(() => import('./components/ProfilePage'),      { ssr: false });
const WorkshopPage     = dynamic(() => import('./components/WorkshopPage'),     { ssr: false });
const SquadPage        = dynamic(() => import('./components/SquadPage'),        { ssr: false });
const SettingsPage     = dynamic(() => import('./components/SettingsPage'),     { ssr: false });

export default function SIRAApp() {
  // ── Auth state
  const [isLoggedIn,  setIsLoggedIn]  = useState(false);
  const [heroChosen,  setHeroChosen]  = useState(false);

  // ── User state
  const [page,           setPage]           = useState('adventure');
  const [username,       setUsername]       = useState('');
  const [bio,            setBio]            = useState('Aspiring developer | JavaScript enthusiast');
  const [heroClass,      setHeroClass]      = useState('');
  const [heroClassId,    setHeroClassId]    = useState('');
  const [featuredBadges, setFeaturedBadges] = useState([1, 3, 4]);

  // ── STEP 1: Belum login → LoginPage
  if (!isLoggedIn) {
    return (
      <LoginPage onLogin={(name) => {
        setUsername(name);
        setIsLoggedIn(true);
      }} />
    );
  }

  // ── STEP 2: Sudah login tapi belum pilih hero → HeroCustomization
  if (!heroChosen) {
    return (
      <HeroCustomization
        username={username}
        onComplete={(heroId, heroData) => {
          setHeroClassId(heroId);
          setHeroClass(heroData.name);
          setHeroChosen(true);
        }}
      />
    );
  }

  // ── STEP 3: Sudah login + pilih hero → App utama
  const pageMap = {
    adventure: <AdventurePage setPage={setPage} heroClassId={heroClassId} />,
    profile: (
      <ProfilePage
        username={username}
        bio={bio}
        heroClass={heroClass}
        featuredBadges={featuredBadges}
        setPage={setPage}
      />
    ),
    workshop:  <WorkshopPage />,
    squad:     <SquadPage />,
    settings: (
      <SettingsPage
        username={username}       setUsername={setUsername}
        bio={bio}                 setBio={setBio}
        heroClass={heroClass}     setHeroClass={setHeroClass}
        featuredBadges={featuredBadges} setFeaturedBadges={setFeaturedBadges}
      />
    ),
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A' }}>
      <Navbar
        page={page} setPage={setPage}
        username={username}
        onLogout={() => {
          setIsLoggedIn(false);
          setHeroChosen(false);
          setPage('adventure');
        }}
      />
      <div key={page} style={{ animation: 'fade-up 0.3s ease both' }}>
        {pageMap[page]}
      </div>
    </div>
  );
}
