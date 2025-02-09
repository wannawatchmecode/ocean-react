export interface ExecutorCommandHistoryRecordProps {
  requestId: string;
  requestorId: string;
  status: string;
  hostName: string;
  command: string;
  statusCode: string;
  consoleOutput: string;
}

export function ExecutorCommandHistoryRecord(
  props: ExecutorCommandHistoryRecordProps,
) {
  return (
    <>
      <div>
        <label>RequestId: </label>
        {props.requestId}
      </div>
      <div>
        <label>RequestorId: </label>
        {props.requestorId}
      </div>
      <div>
        <label>Status: </label>
        {props.status}
      </div>
      <div>
        <label>HostName: </label>
        {props.hostName}
      </div>
      <div>
        <label>Command: </label>
        {props.command}
      </div>
      <div>
        <label>StatusCode: </label>
        {props.statusCode}
      </div>
      <div>
        <label>Console Output: </label>
        {props.consoleOutput}
      </div>
    </>
  );
}
