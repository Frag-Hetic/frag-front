export interface FileDTO {
  id: number;
  filename: string;
  fileSize: number;
  mimeType: string;
  checkhash: string;
  filesChunks: FileChunk[];
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: number;
  filename: string;
  fileSize: string;
  mimeType: string;
  chunkNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface FileChunk {
  id: number;
  file: File;
  chunk: Chunk;
  chunkOrder: number;
  offsetStart: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chunk {
  id: number;
  hash: string;
  sizeOriginal: number;
  sizeCompressed: number;
  data: Uint8Array;
  compressionType: string;
  filesChunks: FileChunk[];
  createdAt: string;
  updatedAt: string;
}
