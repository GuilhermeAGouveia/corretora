import { CircularProgressbar } from "react-circular-progressbar";

export default function ProgressUpload({ progress }: { progress: number }) {
  return (
    <CircularProgressbar
      styles={{
        root: { width: 24, margin: "0 10px" },
        path: { stroke: "white" },
      }}
      strokeWidth={10}
      
      value={progress}
    />
  );
}
