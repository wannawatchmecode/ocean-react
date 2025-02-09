"use client";

import { useState, useEffect } from "react";
import { InfoPanelContent } from "./InfoPanel/Content";
import { io } from "socket.io-client";

// TODO: pull out into own file
// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:6476";
//process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL);

export interface IDevicesProps {
  name?: string;
}

export interface Device {
  id: string;
  hostname: string;
  ifconfig: string;
  netstat: string;
  top: string;
  receiveTime: string;
}

export function Devices(props: IDevicesProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentDevice, setCurrentDevice] = useState<Device>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onHealthEvent(value: {
      id: string;
      hostname: string;
      ifconfig: string;
      netstat: string;
      top: string;
    }) {
      setDevices((previous) => [
        ...previous,
        { ...value, receiveTime: new Date().toUTCString() },
      ]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("healthEvent", onHealthEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("healthEvent", onHealthEvent);
    };
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className="status-container">
            <label>Ocean Connection: </label>
            <span
              className={`status ${isConnected ? "connected" : "disconnected"}`}
            >
              {isConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
          {
            <InfoPanelContent
              hostName={currentDevice?.hostname ?? "Unknown"}
              ifConfig={currentDevice?.ifconfig ?? "N/A"}
              top={currentDevice?.top ?? "N/A"}
              netStat={currentDevice?.netstat ?? "N/A"}
            />
          }

          <label>Health Events</label>
          <div className="device-list">
            {devices.map(function (device: Device) {
              return (
                <div
                  className="device-list-item"
                  key={device.id}
                  onClick={() => setCurrentDevice(device)}
                >
                  {device.hostname} - {device.receiveTime}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
