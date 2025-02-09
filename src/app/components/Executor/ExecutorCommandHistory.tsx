import {
  ExecutorCommandHistoryRecord,
  ExecutorCommandHistoryRecordProps,
} from "./ExecutorCommandHistoryRecord";

export interface ExecutorCommandHistoryProps {
  histories: ExecutorCommandHistoryRecordProps[];
}

export function ExecutorCommandHistory(props: ExecutorCommandHistoryProps) {
  return (
    <>
      <div className="ExecutorCommandHistory">
        {props.histories.map((history: ExecutorCommandHistoryRecordProps) => {
          return (
            <ExecutorCommandHistoryRecord
              key={history.requestId}
              {...history}
            ></ExecutorCommandHistoryRecord>
          );
        })}
      </div>
    </>
  );
}
