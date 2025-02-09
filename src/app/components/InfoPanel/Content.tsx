"use client";

import { useState } from "react";
export interface InfoPanelContentProps {
  hostName: string;
  ifConfig: string;
  top: string;
  netStat: string;
}

enum InfoPanelContentTypes {
  ifConfig = "ifConfig",
  top = "top",
  netStat = "netStat",
  hostName = "hostName",
}

export function InfoPanelContent(props: InfoPanelContentProps) {
  const [selectedInfo, setSelectedInfo] = useState(
    InfoPanelContentTypes.ifConfig,
  );

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
          }[selectedInfo]
        }
      </div>
    </div>
  );
}
