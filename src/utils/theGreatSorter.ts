import { PortalEntry, SortedPortals } from '../types';

const theGreatSorter = (portals: PortalEntry[]) => {
  const foundPairs = new Set();

  const sortedPortals: SortedPortals = {
    unconnectedPortals: [],
    connectedPortalsPairs: [],
  };

  const portalsSortedByTimestamp = portals.sort(
    (p1, p2) => p1.updatedAt - p2.updatedAt
  );

  for (const portal of portalsSortedByTimestamp) {
    if (foundPairs.has(portal.id)) continue;

    const pair = portalsSortedByTimestamp.find(
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

  // return portals
  //   .sort((p1, p2) => p1.updatedAt - p2.updatedAt)
  //   .reduce<SortedPortals>(
  //     (acc, item, idx, array) => {
  //       const pair = array.find(
  //         (portal) => item.tag === portal.tag && !foundPairs.has(portal.id)
  //       );

  //       if (!pair || item.id === pair.id && foundPairs.has(item.id)) {
  //         acc.unconnectedPortals = [...acc.unconnectedPortals, item];
  //       } else {
  //         foundPairs.add(pair.id);
  //         foundPairs.add(item.id);

  //         acc.connectedPortalsPairs = [
  //           ...acc.connectedPortalsPairs,
  //           [item, pair],
  //         ];
  //       }

  //       return acc;
  //     },
  //     {
  //       unconnectedPortals: [],
  //       connectedPortalsPairs: [],
  //     }
  //   );
};

export default theGreatSorter;
