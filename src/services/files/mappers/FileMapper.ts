import { formatSizeToBytes, mapStringToDateFormat } from "@/lib/utils";
import {
  DetailedFile,
  FileDTO,
  FileListItem,
  FileStats,
  FileConfig,
} from "../types";
import { mapMimeTypeToFileIcon } from "../fileUtils";

const calculateCompressionMetrics = (
  fileSize: number,
  compressedSize: number
) => {
  const compressionRatio = (compressedSize / fileSize) * 100;
  const spaceSaved = 100 - compressionRatio;

  return {
    compressionRatio: `${compressionRatio.toFixed(2)}%`,
    spaceSaved: parseFloat(spaceSaved.toFixed(2)),
  };
};

const mapBaseFileInfo = (dto: FileDTO) => ({
  id: dto.id,
  filename: dto.filename,
  fileIcon: mapMimeTypeToFileIcon(dto.mimeType),
  mimeType: dto.mimeType,
});

const mapFileStats = (dto: FileDTO): FileStats => {
  const metrics = calculateCompressionMetrics(
    dto.fileSize,
    dto.compressedFileSize
  );

  return {
    originalSize: formatSizeToBytes(dto.fileSize),
    compressedSize: formatSizeToBytes(dto.compressedFileSize),
    compressionRatio: metrics.compressionRatio,
    spaceSaved: metrics.spaceSaved,
    processingTime: dto.processingTime,
  };
};

const mapFileConfig = (dto: FileDTO): FileConfig => ({
  windowSize: formatSizeToBytes(dto.windowSize),
  minChunkSize: formatSizeToBytes(dto.chunkMinSize),
  maxChunkSize: formatSizeToBytes(dto.chunkMaxSize),
  breakpointMask: dto.breakpointMask,
});

export const fileMapper = {
  toFileList: (dtos: FileDTO[]): FileListItem[] =>
    dtos.map((dto) => ({
      ...mapBaseFileInfo(dto),
      stats: mapFileStats(dto),
      chunksCount: dto.filesChunks.length,
      dates: {
        created: mapStringToDateFormat(dto.createdAt),
        updated: mapStringToDateFormat(dto.updatedAt),
      },
      config: mapFileConfig(dto),
    })),

  toDetailedFile: (dto: FileDTO): DetailedFile => ({
    ...mapBaseFileInfo(dto),
    stats: mapFileStats(dto),
    config: mapFileConfig(dto),
    chunkNumber: dto.filesChunks.length,
    chunksDetails: dto.filesChunks.map((chunk) => ({
      id: chunk.id,
      hash: chunk.chunk.hash,
      order: chunk.chunkOrder,
      originalSize: formatSizeToBytes(chunk.chunk.sizeOriginal),
      compressedSize: formatSizeToBytes(chunk.chunk.sizeCompressed),
      compressionRatio: (
        (chunk.chunk.sizeCompressed / chunk.chunk.sizeOriginal) *
        100
      ).toFixed(2),
      compressionType: chunk.chunk.compressionType,
    })),
  }),
};
