import { PortalEntry, SortedPortals } from '../types';

const theGreatSorter = (portals: PortalEntry[]) => {
  const foundPairs = new Set();

  const sortedPortals: SortedPortals = {
    unconnectedPortals: [],
    connectedPortalsPairs: [],
  };

  const portalsOrderedByUpdateRelevance = portals.sort(
    (p1, p2) => p1.updatedAt - p2.updatedAt
  );

  for (const portal of portalsOrderedByUpdateRelevance) {
    if (foundPairs.has(portal.id)) continue;

    const pair = portalsOrderedByUpdateRelevance.find(
      (portalPair) =>
        portal.tag === portalPair.tag &&
        !foundPairs.has(portalPair.id) &&
        portal.id !== portalPair.id
    );

    if (pair) {
      sortedPortals.connectedPortalsPairs = [
        ...sortedPortals.connectedPortalsPairs,
        [portal, pair],
      ];
      foundPairs.add(portal.id);
      foundPairs.add(pair.id);
    } else {
      sortedPortals.unconnectedPortals = [
        ...sortedPortals.unconnectedPortals,
        portal,
      ];
    }
  }

  return sortedPortals;
};

export default theGreatSorter;
