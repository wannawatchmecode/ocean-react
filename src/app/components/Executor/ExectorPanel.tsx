"use client";

import { useState } from "react";
import { ExecutorControl } from "./ExectorControl";
import { ExecutorCommandHistory } from "./ExecutorCommandHistory";
export interface ExecutorPanelProps {}

export function ExecutorPanel(props: ExecutorPanelProps) {
  const [commands, setCommands] = useState<Map<string, any>>(
    new Map<string, any>(),
  );

  function addNewlyExecutedCommand(command: any) {
    console.log(command);
    setCommands((last) => {
      const map = new Map<string, any>(last);
      map.set(command.requestId, command);
      return map;
    });
  }
  return (
    <>
      <div>
        <h1>Commands</h1>
        <ExecutorControl
          postbackExecution={addNewlyExecutedCommand}
        ></ExecutorControl>
        <h2>History</h2>
        <ExecutorCommandHistory
          histories={commands.values().toArray()}
        ></ExecutorCommandHistory>
      </div>
    </>
  );
}
