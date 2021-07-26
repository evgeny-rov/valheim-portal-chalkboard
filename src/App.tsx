import React, { useEffect, useState } from 'react';
import { db } from './services/firebase';
import theGreatSorter from './utils/theGreatSorter';
import { PortalEntry, SortedPortals } from './types';
import bg from './assets/bg.jpg';

import Header from './components/Header';
import UnconnectedPortalsSection from './components/UnconnectedPortalsSection';
import ConnectedPortalsSection from './components/ConnectedPortalsSections';

function App() {
  const [portalsData, setPortalsData] = useState<SortedPortals>({
    connectedPortalsPairs: [],
    unconnectedPortals: [],
  });

  useEffect(() => {
    const unsubscribe = db.portals.onSnapshot((snap) => {
      const portals: PortalEntry[] = [];
      snap.forEach((entry) => portals.push({ id: entry.id, ...entry.data() }));
      const sortedPortals = theGreatSorter(portals);
      setPortalsData(sortedPortals);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="fixed w-full h-full">
      <img
        src={bg}
        alt="background"
        className="absolute object-cover w-full h-full z-0"
      />
      <div className="relative z-50 w-full h-full overflow-y-auto">
        <Header />
        <main className="px-10 py-5 grid gap-6">
          <UnconnectedPortalsSection portals={portalsData.unconnectedPortals} />
          <ConnectedPortalsSection
            portals={portalsData.connectedPortalsPairs}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
