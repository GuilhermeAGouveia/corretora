import { CircularProgressbar } from "react-circular-progressbar";

export default function ProgressUpload({ progress }: { progress: number }) {
  return (
    <CircularProgressbar
      styles={{
        root: {
          width: 30,
          margin: "0 10px",
        },
        path: {
          stroke: "white",
          transition: "stroke-dashoffset 0.3s ease",
        },
        trail: {
          stroke: "white",
          opacity: 0.3,
        },
        text: {
          fill: "white",
          fontSize: "25px",
          textAnchor: "middle",
          dominantBaseline: "central",
        },
      }}
      strokeWidth={10}
      value={progress}
      text={`${progress}%`}
    />
  );
}
