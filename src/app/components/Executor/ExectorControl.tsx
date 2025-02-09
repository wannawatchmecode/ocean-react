"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios, { Axios } from "axios";

export interface ExecutorControlProps {
  postbackExecution: (record: any) => void;
}

export interface ExecutorCommand {}

const URL = "http://localhost:6477";
const REST_URL = "http://localhost:3005"; // TODO: pull out

export const socket = io(URL);

export function ExecutorControl(props: ExecutorControlProps) {
  const client: Axios = axios.create({});
  const [commands, setCommands] = useState<ExecutorCommand[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [hostName, setHostName] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onStatusUpdated(value: ExecutorCommand) {
      props.postbackExecution(value);
      setCommands((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("eventStatusChangeEvent", onStatusUpdated);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("eventStatusChangeEvent", onStatusUpdated);
    };
  }, []);

  async function executeCommand() {
    const executionRequest = {
      requestorId: "jaymoney",
      hostName,
      command,
    };
    const result = await client.put(
      `${REST_URL}/command/execute`,
      executionRequest,
      /*{
      requestorId: "jaymoney",
      hostName,
      command,
    }*/
    );

    //const { requestId } = result.data;
    //props.postbackExecution({ requestId, ...executionRequest });
    console.log(result.data);
    props.postbackExecution(result.data);
  }
  return (
    <div>
      <label>Ocean Connection:</label>
      <span className={`status ${isConnected ? "connected" : "disconnected"}`}>
        {isConnected ? "Connected" : "Not Connected"}
      </span>
      <label>Command: </label>
      <input
        type="text"
        placeholder="command"
        onChange={(val) => setCommand(val.target.value)}
      />
      <label>HostName: </label>
      <input
        type="text"
        placeholder="HostName"
        onChange={(val) => setHostName(val.target.value)}
      />
      <button onClick={() => executeCommand()}>Execute command</button>
    </div>
  );
}
