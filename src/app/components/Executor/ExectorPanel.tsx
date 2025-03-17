"use client";

import { useState } from "react";
import { ExecutorControl } from "./ExectorControl";
import { ExecutorCommandHistory } from "./ExecutorCommandHistory";
export interface ExecutorPanelProps {
  hostName?: string;
}

export function ExecutorPanel(props: ExecutorPanelProps) {
  const hostName = props.hostName;
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
          hostName={hostName}
        ></ExecutorControl>
        <h2>History</h2>
        <ExecutorCommandHistory
          histories={Array.from(commands.values())}
        ></ExecutorCommandHistory>
      </div>
    </>
  );
}
