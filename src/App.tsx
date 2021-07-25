import React, { useEffect, useState } from 'react';
import { db } from './services/firebase';
import Header from './components/Header';
import Portal from './components/Portal';
import { PortalEntry } from './types';
import theGreatSorter from './utils/theGreatSorter';

import chainlink from './assets/link.svg';
import ChainLink from './components/ChainLink';

const mockedData: PortalEntry = {
  id: 'ff',
  tag: '3',
  comment: 'test comment',
  updatedAt: 0,
};

const Pair = ({ portals }: { portals: [PortalEntry, PortalEntry] }) => {
  const [firstPortal, secondPortal] = portals;

  return (
    <div className="flex flex-col justify-center items-center">
      <Portal portalData={firstPortal} />
      {/* <div className="w-2 h-10 bg-red-600 rounded-md flex-shrink-0"></div> */}
      <ChainLink />
      <Portal portalData={secondPortal} />
    </div>
  );
};

function App() {
  const [unconnectedPortals, setUnconnectedPortals] = useState<PortalEntry[]>(
    []
  );
  const [connectedPortals, setConnectedPortals] = useState<
    Array<[PortalEntry, PortalEntry]>
  >([]);

  useEffect(() => {
    const unsubscribe = db.portals.onSnapshot((snap) => {
      const portals: PortalEntry[] = [];
      snap.forEach((entry) => portals.push({ id: entry.id, ...entry.data() }));
      const sortedPortals = theGreatSorter(portals);
      setConnectedPortals(sortedPortals.connectedPortalsPairs);
      setUnconnectedPortals(sortedPortals.unconnectedPortals);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <Header />
      <main className="p-10 grid gap-14">
        <section className="grid gap-14">
          <h1 className="text-4xl text-center">Непривязанные порталы</h1>
          <div className="grid grid_layout_unconnected gap-12">
            {unconnectedPortals.map((portalData) => (
              <Portal key={portalData.id} portalData={portalData} />
            ))}
          </div>
        </section>
        <section className="grid gap-14">
          <h1 className="text-4xl text-center">Привязанные порталы</h1>
          <div className="grid grid_layout_connected gap-20">
            {connectedPortals.map((portals, idx) => (
              <Pair key={portals[0].id + portals[1].id} portals={portals} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
