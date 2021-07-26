export type Portal = {
  tag: string;
  comment: string;
  updatedAt: number;
};

export interface PortalEntry extends Portal {
  id: string;
}

export type PortalsPair = [PortalEntry, PortalEntry];

export type SortedPortals = {
  unconnectedPortals: PortalEntry[];
  connectedPortalsPairs: Array<PortalsPair>;
};
