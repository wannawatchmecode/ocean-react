"use client";

import { Devices } from "./components/Devices";
//import { ExecutorControl } from "./components/Executor/ExectorControl";
import { ExecutorPanel } from "./components/Executor/ExectorPanel";
import { useState } from "react";

enum ViewableId {
  executorPanel,
  devices,
}

export default function Home() {
  const [visibleId, setVisibleId] = useState(ViewableId.devices);

  function setViewable(id: ViewableId) {
    setVisibleId(id);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <button onClick={() => setViewable(ViewableId.executorPanel)}>
            Commands
          </button>
          <button onClick={() => setViewable(ViewableId.devices)}>
            Devices
          </button>
        </div>
        <div
          style={
            visibleId == ViewableId.executorPanel ? {} : { display: "none" }
          }
        >
          <ExecutorPanel></ExecutorPanel>
        </div>
        <div style={visibleId == ViewableId.devices ? {} : { display: "none" }}>
          <Devices />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
