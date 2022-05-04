import React from "react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export default class Upload extends React.Component<UploadProps> {
  returnTextState(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage>Clique ou arraste imagens aqui...</UploadMessage>;
    }
    if (isDragReject) {
      return (
        <UploadMessage type={"error"}>Arquivo não suportado</UploadMessage>
      );
    }
    return (
      <UploadMessage type={"success"}>Solte os arquivos aqui</UploadMessage>
    );
  }
  render() {
    const { onUpload } = this.props;
    return (
      <Dropzone
        accept={{
          "image/*": [".jpeg", ".png"],
        }}
        onDropAccepted={onUpload}
      >
        {({ getInputProps, getRootProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {this.returnTextState(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
