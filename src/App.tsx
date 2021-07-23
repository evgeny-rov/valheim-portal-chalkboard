import React, { useEffect, useState } from 'react';
import { db } from './services/firebase';
import Header from './components/Header';
import Portal from './components/Portal';
import { PortalEntry, SortedPortals } from './types';
import theGreatSorter from './utils/theGreatSorter';

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
      <div className="w-2 h-10 bg-red-600 rounded-md flex-shrink-0"></div>
      <Portal portalData={secondPortal} />
    </div>
  );
};

function App() {
  const [portalsData, setPortalsData] = useState<SortedPortals>({
    unconnectedPortals: [],
    connectedPortalsPairs: [],
  });

  console.log(portalsData)

  useEffect(() => {
    db.portals.onSnapshot((snap) => {
      const portals: PortalEntry[] = [];
      snap.forEach((entry) => portals.push({ id: entry.id, ...entry.data() }));
      setPortalsData(theGreatSorter(portals));
    });
  }, []);

  return (
    <div className="">
      <Header />
      <main className="p-10">
        <section className="my-10">
          <div>
            <h1 className="text-white text-4xl font-bold">
              Непривязанные порталы
            </h1>
            <ul className="my-10 grid grid-cols-10 sm:grid-cols-2 md:grid-cols-8 gap-6">
              {portalsData.unconnectedPortals.map((portalData) => (
                <Portal key={portalData.id} portalData={portalData} />
              ))}
            </ul>
          </div>
        </section>
        <section className="my-10">
          <div>
            <h1 className="text-white text-4xl font-bold">
              Привязанные порталы
            </h1>
            <ul className="my-10 grid grid_layout gap-32">
              {portalsData.connectedPortalsPairs.map((portals, idx) => (
                <Pair key={idx} portals={portals} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
