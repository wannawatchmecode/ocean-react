export interface InfoBannerProps {
  hostName: string;
  ip: string;
  port: number;
  lastHealthCheck: Date;
}

type healthColors = "GREEN" | "YELLOW" | "RED";

export function InfoBanner(props: InfoBannerProps): any {
  function getHealthState(lastHealthCheck: Date): healthColors {
    const time = (lastHealthCheck as any) - (new Date() as any);
    return time < 60_000 ? "GREEN" : time < 5 * 60_000 ? "YELLOW" : "RED";
  }

  return (
    <div>
      <label>Host Name:</label>
      <div>{props.hostName}</div>
      <label>IP</label>
      <div>{props.ip}</div>
      <label>Port</label>
      <div>{props.port}</div>
      <label>Last Health Check</label>
      <div>{props.lastHealthCheck.toLocaleString()}</div>
      <div>({getHealthState(props.lastHealthCheck)})</div>
    </div>
  );
}
