export interface FileDTO {
  id: number;
  fileName: string;
  fileSize: number;
  compressedFileSize: number;
  mimeType: string;
  windowSize: number;
  chunkMinSize: number;
  chunkMaxSize: number;
  breakpointMask: string;
  processingTime: string;
  checkhash: string;
  createdAt: string;
  updatedAt: string;
  filesChunks: FileChunkDTO[];
}

interface FileChunkDTO {
  id: number;
  chunk: {
    id: number;
    hash: string;
    sizeOriginal: number;
    sizeCompressed: number;
    compressionType: string;
    createdAt: string;
    updatedAt: string;
  };
  chunkOrder: number;
  offsetStart: number;
  createdAt: string;
  updatedAt: string;
}

interface BaseFileInfo {
  id: number;
  filename: string;
  fileIcon: React.ReactNode;
  mimeType: string;
}

export interface FileStats {
  originalSize: string;
  compressedSize: string;
  compressionRatio: string;
  spaceSaved: number;
  processingTime: string;
}

export interface FileConfig {
  windowSize: string;
  minChunkSize: string;
  maxChunkSize: string;
  breakpointMask: string;
}

export interface FileListItem extends BaseFileInfo {
  stats: FileStats;
  chunksCount: number;
  dates: {
    created: string;
    updated: string;
  };
  config: FileConfig;
}

export interface DetailedFile extends BaseFileInfo {
  stats: FileStats;
  config: FileConfig;
  chunksDetails: ChunkDetailInfo[];
  chunkNumber: number;
}

export interface ChunkDetailInfo {
  id: number;
  hash: string;
  order: number;
  originalSize: string;
  compressedSize: string;
  compressionRatio: string;
  spaceSaved: string;
  isExpanded: boolean;
  compressionType: string;
}

export interface UploadFileConfig {
  windowSize: number;
  chunkMinSize: number;
  chunkMaxSize: number;
  breakpointMask: string;
}

export interface UploadFileData {
  file: File;
  config: UploadFileConfig;
}

export interface UploadFileResponse {
  status: "success" | "error";
  message: string;
  data?: {
    id: number;
    filename: string;
    fileSize: number;
    compressedFileSize: number;
    mimeType: string;
    windowSize: number;
    chunkMinSize: number;
    chunkMaxSize: number;
    breakpointMask: string;
    processingTime: string;
    checkhash: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DownloadFileParams {
  id: number;
  filename: string;
}
