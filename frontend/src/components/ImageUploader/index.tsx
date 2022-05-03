import filesize from "filesize";
import { uniqueId } from "lodash";
import React, { useEffect } from "react";
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

interface ImageUploaderProps {
  uploaded: [UploadedFile[], (files: UploadedFile[]) => void];
}

function ImageUploader({ uploaded }: ImageUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = uploaded;

  const handleUpload = (files: File[]) => {
    const newUploadedFiles: UploadedFile[] = files.map((file) => ({
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

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
    //uploadedFiles.forEach(processUpload);
  };

  const handleDelete = async (id: string) => {
    setUploadedFiles(uploadedFiles.filter((files) => files.id !== id));
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) =>
        URL.revokeObjectURL(file.preview as string)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Upload onUpload={handleUpload}></Upload>
      {!!uploadedFiles.length && (
        <FileList
          onDelete={handleDelete}
          uploadedFiles={uploadedFiles}
        ></FileList>
      )}
    </Container>
  );
}

export default ImageUploader;
