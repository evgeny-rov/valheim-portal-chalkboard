import React from 'react';
import { PortalsPair } from '../types';
import ChainLink from './ChainLink';
import Portal from './Portal';

type Props = {
  portals: Array<PortalsPair>;
};

const ConnectedPortalsSection = ({ portals }: Props) => {
  const isInEmptyState = portals.length === 0;

  const renderPortalsPair = (portalData: PortalsPair) => {
    const [portal1, portal2] = portalData;
    const key = portal1.id + portal2.id;

    return (
      <div key={key} className="grid place-items-center">
        <Portal portalData={portal1} />
        <ChainLink />
        <Portal portalData={portal2} />
      </div>
    );
  };

  if (isInEmptyState) return null;

  return (
    <section className="grid place-items-center gap-10">
      <h1 className="text-4xl text-center">Привязанные порталы</h1>
      <div className="grid grid_layout_portals sm:grid-flow-col gap-12">
        {portals.map(renderPortalsPair)}
      </div>
    </section>
  );
};

export default ConnectedPortalsSection;
