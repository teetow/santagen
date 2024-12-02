import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { genSanta } from "./lib/santagen";

export function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [target, setTarget] = useState("");
  const [pairings, setPairings] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const urlNames = params.get("names");

    if (urlNames) {
      setNames(urlNames.split(",").map((name) => name.trim()));
    }
  }, [window.location.search]);

  useEffect(() => {
    if (names.length > 0) {
      setPairings(genSanta(names));
    }
  }, [names, setPairings]);

  useEffect(() => {
    let found = false;
    for (let [n, t] of pairings.entries()) {
      if (n.toLowerCase() === name.toLowerCase()) {
        setName(n);
        setTarget(t);
        found = true;
      }
      if (found) {
        break;
      } else {
        setTarget("");
      }
    }
  }, [name, pairings]);

  return (
    <>
      <h1>Secret Santa Allocator</h1>
      <img id="decorative-hat" src="favicon.svg"></img>
      <pre>for {names.join(", ")}</pre>
      <input
        id="name"
        type="text"
        placeholder="Who are you?"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          const input = document.getElementById("name") as HTMLInputElement;
          const name = input.value;
          if (name !== "") {
            setName(name);
            return;
          }
        }}
      >
        Submit
      </button>
      {target.length > 0 && (
        <h3>
          {name}, your target is {target}
        </h3>
      )}
    </>
  );
}
