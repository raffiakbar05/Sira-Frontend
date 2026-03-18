export const questsData = [
  { id: 1, title: 'Hello World',    desc: 'Print your first message',      xp: 100, status: 'done',   region: 'coastal',   x: 120, y: 180 },
  { id: 2, title: 'Variables',      desc: 'Learn JavaScript variables',    xp: 150, status: 'done',   region: 'coastal',   x: 260, y: 120 },
  { id: 3, title: 'Functions',      desc: 'Master functions & parameters', xp: 200, status: 'active', region: 'coastal',   x: 400, y: 170 },
  { id: 4, title: 'Arrays',         desc: 'Work with arrays & methods',    xp: 200, status: 'locked', region: 'coastal',   x: 520, y: 110 },
  { id: 5, title: 'Objects',        desc: 'Understand objects & properties',xp: 250, status: 'locked', region: 'coastal',  x: 640, y: 175 },
  { id: 6, title: 'Async/Await',    desc: 'Master async programming',      xp: 300, status: 'locked', region: 'coastal',   x: 760, y: 115 },
  { id: 7, title: 'ML Basics',      desc: 'Intro to machine learning',     xp: 350, status: 'locked', region: 'highlands', x: 200, y: 340 },
  { id: 8, title: 'Neural Nets',    desc: 'Build your first neural net',   xp: 500, status: 'locked', region: 'highlands', x: 380, y: 300 },
  { id: 9, title: 'Logic Gates',    desc: 'Boolean logic foundations',     xp: 180, status: 'locked', region: 'citadel',   x: 580, y: 340 },
];

export const connections = [
  [1,2],[2,3],[3,4],[4,5],[5,6],[1,7],[7,8],[4,9],
];

export const badgesData = [
  { id: 1, name: 'First Steps',   icon: '⚡', desc: 'Complete first lesson',  earned: true,  rarity: 'common'    },
  { id: 2, name: 'Week Warrior',  icon: '🔥', desc: '7-day streak',           earned: false, rarity: 'rare'      },
  { id: 3, name: 'Code Master',   icon: '⚔️', desc: 'Complete 5 lessons',     earned: true,  rarity: 'rare'      },
  { id: 4, name: 'Swift Learner', icon: '💨', desc: 'Complete in 10 mins',    earned: true,  rarity: 'common'    },
  { id: 5, name: 'Night Owl',     icon: '🦉', desc: 'Code after midnight',    earned: false, rarity: 'epic'      },
  { id: 6, name: 'Bug Hunter',    icon: '🐛', desc: 'Fix 10 errors',          earned: false, rarity: 'legendary' },
];

export const squadsData = [
  { id: 1, name: 'Code Warriors',      members: 24, level: 'Advanced', xp: 12450, joined: true  },
  { id: 2, name: 'JavaScript Juniors', members: 18, level: 'Beginner', xp: 3200,  joined: false },
  { id: 3, name: 'Web Masters',        members: 42, level: 'Expert',   xp: 28500, joined: false },
];

export const leaderboard = [
  { rank: 1, name: 'Alex Dev',    lvl: 8, xp: 15420 },
  { rank: 2, name: 'Sarah Code',  lvl: 7, xp: 12890 },
  { rank: 3, name: 'John Coder',  lvl: 7, xp: 11230 },
  { rank: 4, name: 'Emma Hack',   lvl: 6, xp: 9870  },
  { rank: 5, name: 'You',         lvl: 1, xp: 0, isYou: true },
];

export const regionColors = {
  coastal:   '#22D3EE',
  highlands: '#A78BFA',
  citadel:   '#F59E0B',
};

export const levelColor = {
  Beginner: '#22D3EE',
  Advanced: '#A78BFA',
  Expert:   '#F59E0B',
};