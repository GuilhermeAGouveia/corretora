import React from "react";
import { UploadedFile } from "..";
import { Container, DeleteButton, Preview } from "./styles";

interface FileListProps {
  uploadedFiles: UploadedFile[];
  onDelete: (id: string) => void;
}

interface FileListState {
  mouseover: false;
}

export default class FileList extends React.Component<
  FileListProps,
  FileListState,
  any
> {
  constructor(props: FileListProps) {
    super(props);
    this.state = {
      mouseover: false,
    };
  }

  render() {
    const { uploadedFiles, onDelete } = this.props;
    return (
      <Container>
        {uploadedFiles.map((files) => (
          <li key={files.id}>
            <Preview src={files.preview} />
            <DeleteButton onClick={() => onDelete(files.id)}>
              Excluir
            </DeleteButton>
          </li>
        ))}
      </Container>
    );
  }
}
