import mime from "mime";

export const getFileNameAndType=(uri: string)=>{
  const fileName = uri.split('/').pop() || 'feedback_file';
  const fileType = mime.getType(uri) || 'application/octet-stream';
  return {fileName , fileType }
}