export type Portal = {
  tag: string;
  comment: string;
  updatedAt: number;
};

export interface PortalEntry extends Portal {
  id: string;
}

export type SortedPortals = {
  unconnectedPortals: PortalEntry[];
  connectedPortalsPairs: Array<[PortalEntry, PortalEntry]>;
};
