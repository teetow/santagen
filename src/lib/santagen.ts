type names = string[];

export const prng = (seed: string): number => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h >>>= 0; // Force unsigned 32-bit integer
  }
  h = (h * 16807) % 2147483647;
  return (h - 1) / 2147483646;
};

export function sleep(ms: number) {
  var currentTime = new Date().getTime();

  while (currentTime + ms >= new Date().getTime()) {}
}

export const genSanta = (names: names): Map<string, string> => {
  if (names.length < 2) {
    throw new Error("Need at least two participants");
  }

  if (new Set(names.map((s) => s.toLowerCase().trim())).size !== names.length) {
    throw new Error("No duplicate names allowed");
  }

  const seed = names.sort().join("").toLowerCase();
  const santas = new Map<string, string>();

  let hasDuplicates = true;
  let localSeed = seed;

  while (hasDuplicates) {
    hasDuplicates = false;

    const pseudoRandom = Math.floor(
      (prng(localSeed) * names.length) % names.length
    );

    const shuffled = names
      .slice(pseudoRandom)
      .concat(names.slice(0, pseudoRandom));

    for (let i = 0; i < names.length; i++) {
      if (names[i] === shuffled[i]) {
        hasDuplicates = true;
        localSeed += "A";
        break;
      }
      santas.set(names[i], shuffled[i]);
    }
  }
  return santas;
};
