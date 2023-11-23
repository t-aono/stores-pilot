export interface MatchedItem {
  variationId: string;
  inventory: string[];
  zaiko: string[];
}

export function useDataMatcher() {
  const getMatches = (inventory: string[][], zaiko: string[][]) => {
    if (!inventory || !zaiko) return [];
    let matches: MatchedItem[] = [];
    for (let row = 1; row < inventory.length; row++) {
      if (inventory[row].length === 0) continue;
      const variationId = inventory[row][0];
      if (!variationId) continue;
      for (let r = 0; r < zaiko.length; r++) {
        if (!zaiko[r][3]) continue;
        if (variationId === zaiko[r][3]) {
          matches.push({
            variationId,
            inventory: inventory[row],
            zaiko: zaiko[r],
          });
        }
      }
    }
    return matches;
  };

  return { getMatches };
}
