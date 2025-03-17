import { HealthCheck } from "../Devices";

export interface HealthCheckListProps {
  hostName: string;
  healthCheckRecords: HealthCheck[];
  setCurrentHealthRecord: any;
}

export function HealthCheckList(props: HealthCheckListProps) {
  const { healthCheckRecords, hostName, setCurrentHealthRecord } = props;
  return (
    <div>
      <div>Health Check Records</div>
      {healthCheckRecords.map((val) => {
        return (
          <div key={val.id}>
            <div onClick={() => setCurrentHealthRecord(val)}>
              {hostName} : {val.receivedTime}
            </div>
          </div>
        );
      })}
    </div>
  );
}
