import styled, { css } from "styled-components";

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled("div").attrs({
  className: "dropzone",
})<any>`
  position: relative;
  min-width: 250px;
  min-height: 250px;
  border: 1px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: height 1s ease, border-color 0.2s;
  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}
`;
const messageOptions = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};
export const UploadMessage = styled.p<{ type?: "error" | "success"}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: ${(props) => messageOptions[props.type || "default"]};
`;
