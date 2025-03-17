"use client";

import { useState, useEffect } from "react";
import { InfoPanelContent, InfoPanelContentTypes } from "./InfoPanel/Content";
import { io } from "socket.io-client";
import { HealthCheckList } from "./InfoPanel/HealthCheckList";
import { randomUUID } from "crypto";
import { hostname } from "os";

// TODO: pull out into own file
// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:6476";
//process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

//export const socket = io(URL);

export interface IDevicesProps {
  name?: string;
}

export interface DeviceRecord {
  device: Device;
  /**
   * HealthCheckId, healthCheckRecord
   * */
  healthChecks: Map<string, HealthCheck>;
}

export interface Device {
  id: string;
  hostname: string;
  /*ifconfig: string;
  netstattstat: string;
  top: string;
  receiveTime: string;*/
}

export interface HealthCheck {
  id: string;
  hostId: string;
  ifconfig: string;
  netstat: string;
  top: string;
  receivedTime: string;
}

export function Devices(props: IDevicesProps) {
  const [devices, setDevices] = useState<Map<string, Device>>(
    new Map<string, Device>(),
  );

  const [healthCheckRecords, setHealthCheckRecords] = useState<
    Map<string, HealthCheck[]>
  >(new Map<string, HealthCheck[]>());

  const [currentHealthCheck, setCurrentHealthCheck] = useState<
    HealthCheck | undefined
  >(undefined);

  const [currentDevice, setCurrentDevice] = useState<Device>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showExecutor, setShowExecutor] = useState(false);


  function changeCurrentDevice(device: Device) {
    setCurrentDevice(device);
    const healthArray = healthCheckRecords.get(device.hostName) ??[] undefined;
    const health = healthArray.length > 0 ? healthArray[0] : undefined;
    setCurrentHealthCheck(health);
  }
  useEffect(() => {
    async function onConnect() {
      console.debug("Socket connected");
      setIsConnected(true);
    }

    async function onDisconnect() {
      console.debug("Socket disconnected");
      setIsConnected(false);
    }

    function onHealthEvent(value: {
      id: string;
      hostname: string;
      ifconfig: string;
      netstat: string;
      top: string;
    }) {
      console.debug("HealthEvent received");
      setDevices((previous) => {
        const newMap = new Map<string, Device>(previous);
        newMap.set(value.hostname, {
          ...value,
          id: value.hostname,
          //          receiveTime: new Date().toUTCString(),
        });
        return newMap;
      });

      setHealthCheckRecords((previous) => {
        const newMap = new Map<string, HealthCheck[]>(previous);
        const newList = [...newMap.get(value.hostname)??[]];
        newList.push({
          id: crypto.randomUUID(),
          hostId: value.hostname,
          receivedTime: new Date().toUTCString(),
          ifconfig: value.ifconfig,
          netstat: value.netstat,
          top: value.top,
          //          receiveTime: new Date().toUTCString(),
        });
        newMap.set(value.hostname, newList);
        return newMap;
      });
      setIsConnected(true);
    }

    const socket = io(URL);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("healthEvent", onHealthEvent);
    //socket.on("error", () => {console.debug("Socket error");})
    console.debug("Socket hooks set");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("healthEvent", onHealthEvent);
    };
  },[]);

  function onInfoPanelSelectedContentChange(selected: InfoPanelContentTypes) {
    if (selected == InfoPanelContentTypes.executor) {
      setShowExecutor(true);
    } else {
      setShowExecutor(false);
    }
  }

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
<label>Devices</label>
          <div className="device-list">
            {[...devices.values()].map(function (device: Device) {
              return (
                <div
                  className="device-list-item"
                  key={device.id}
                 // onClick={() => setCurrentDevice(device)}
                  onClick={() => changeCurrentDevice(device)}
                >
                  {device.hostname} - {/*device.receiveTime*/}
                </div>
              );
            })}
          </div>

          {
            <div>
              {" "}
              <InfoPanelContent
                hostName={currentDevice?.hostname ?? "Unknown"}
                ifConfig={currentHealthCheck?.ifconfig ?? "N/A"}
                top={currentHealthCheck?.top ?? "N/A"}
                netStat={currentHealthCheck?.netstat ?? "N/A"}
                onSelectedInfoChange={onInfoPanelSelectedContentChange}
              />
              {!showExecutor &&
              <HealthCheckList
                hostName={currentDevice?.hostname ?? "N/A"}
                healthCheckRecords={
                  (currentDevice &&
                    healthCheckRecords.get(currentDevice?.id)) ??
                  []
                }
                setCurrentHealthRecord={setCurrentHealthCheck}
              ></HealthCheckList>
              }
            </div>
          }

                  </div>
      </div>
    </div>
  );
}
