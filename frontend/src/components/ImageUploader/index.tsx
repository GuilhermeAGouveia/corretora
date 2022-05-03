import filesize from "filesize";
import { uniqueId } from "lodash";
import React from "react";
import FileList from "./FileList";
import { Container } from "./styles";
import Upload from "./Uploader";

export interface UploadedFile {
  file: any;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  uploaded: boolean;
  error: boolean;
  url: string | null;
  progress: number;
}

interface ImageUploaderState {
  uploadedFiles: UploadedFile[];
}

class ImageUploader extends React.Component<any, ImageUploaderState> {
  state = {
    uploadedFiles: [] as UploadedFile[],
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview as string)
    );
  }
  handleUpload = (files: File[]) => {
    console.log(this.state.uploadedFiles);
    const uploadedFiles: UploadedFile[] = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      uploaded: false,
      error: false,
      progress: 0,
      url: null,
    }));
    this.setState({
      uploadedFiles: [...this.state.uploadedFiles, ...uploadedFiles],
    });
    //uploadedFiles.forEach(this.processUpload);
  };

  handleDelete = async (id: string) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(
        (files) => files.id !== id
      ),
    });
  };
  /*  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append("file", uploadedFile.file, uploadedFile.name);
    api
      .post("uploadFile", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.path,
        });
      })
      .catch((error) => {
        this.updateFile(uploadedFile.id, {
          error: true,
          errorString: `${error}`,
        });
      });
  }; */
  render() {
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <Upload onUpload={this.handleUpload}></Upload>
        {!!uploadedFiles.length && (
          <FileList
            onDelete={this.handleDelete}
            uploadedFiles={uploadedFiles}
          ></FileList>
        )}
      </Container>
    );
  }
}

export default ImageUploader;
