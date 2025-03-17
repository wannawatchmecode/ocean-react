"use client";

import { useState } from "react";
import { ExecutorPanel } from "../Executor/ExectorPanel";
export interface InfoPanelContentProps {
  hostName: string;
  ifConfig: string;
  top: string;
  netStat: string;
  onSelectedInfoChange: any;
}

export enum InfoPanelContentTypes {
  ifConfig = "ifConfig",
  top = "top",
  netStat = "netStat",
  hostName = "hostName",
  executor = "executor",
}

export function InfoPanelContent(props: InfoPanelContentProps) {
  const { onSelectedInfoChange } = props;
  const [selectedInfoValue, setSelectedInfoValue] = useState(
    InfoPanelContentTypes.ifConfig,
  );

  function setSelectedInfo(type: InfoPanelContentTypes) {
    setSelectedInfoValue(type);
    onSelectedInfoChange(type);
  }

  return (
    <div id="InfoPanelContainer" className="info-panel-container">
      <div id="InfoPannelTopBar" className="info-panel-top-bar">
        <button onClick={() => setSelectedInfo(InfoPanelContentTypes.hostName)}>
          Host
        </button>
        <button onClick={() => setSelectedInfo(InfoPanelContentTypes.ifConfig)}>
          If Config
        </button>
        <button onClick={() => setSelectedInfo(InfoPanelContentTypes.top)}>
          Top
        </button>
        <button onClick={() => setSelectedInfo(InfoPanelContentTypes.netStat)}>
          Net Stat
        </button>
        <button onClick={() => setSelectedInfo(InfoPanelContentTypes.executor)}>
          Executor
        </button>
      </div>

      <div
        id="InfoPanelContentContainer"
        className="info-panel-content-container"
      >
        {
          {
            hostName: <div>{props.hostName}</div>,
            ifConfig: <div>{props.ifConfig}</div>,
            top: <div>{props.top}</div>,
            netStat: <div>{props.netStat}</div>,
            executor: (
              <div>
                <ExecutorPanel hostName={props.hostName}></ExecutorPanel>
              </div>
            ),
          }[selectedInfoValue]
        }
      </div>
    </div>
  );
}
