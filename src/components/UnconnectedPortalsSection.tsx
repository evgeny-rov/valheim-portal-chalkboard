import React from 'react';
import { PortalEntry } from '../types';
import Portal from './Portal';

type Props = {
  portals: PortalEntry[];
};

const UnconnectedPortalsSection = ({ portals }: Props) => {
  const isInEmptyState = portals.length === 0;

  if (isInEmptyState) return null;

  return (
    <section className="grid place-items-center gap-10">
      <h1 className="text-4xl text-center">Непривязанные порталы</h1>
      <div className="grid grid_layout_portals sm:grid-flow-col gap-12">
        {portals.map((portalData) => (
          <Portal key={portalData.id} portalData={portalData} />
        ))}
      </div>
    </section>
  );
};

export default UnconnectedPortalsSection;
