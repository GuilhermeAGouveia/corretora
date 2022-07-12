import { CircularProgressbar } from "react-circular-progressbar";

interface ProgressUploadProps {
  progress: number;
  strokeColor?: string;
  textColor?: string;
  circleSize?: number;
}

export default function ProgressUpload({
  progress,
  strokeColor = "white",
  textColor = "white",
  circleSize = 30,
}: ProgressUploadProps) {
  return (
    <CircularProgressbar
      styles={{
        root: {
          width: circleSize,
          margin: "0 10px",
        },
        path: {
          stroke: strokeColor,
          transition: "stroke-dashoffset 0.3s ease",
        },
        trail: {
          stroke: "white",
          opacity: 0.3,
        },
        text: {
          fill: textColor,
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
