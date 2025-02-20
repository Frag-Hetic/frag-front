import { formatSizeToMbSize, mapStringToDateFormat } from "@/lib/utils";
import { File, FileDTO } from "../types";

export const fileMapper = {
  toFile: (dto: FileDTO): File => ({
    id: dto.id,
    filename: dto.filename,
    fileSize: formatSizeToMbSize(dto.fileSize),
    mimeType: dto.mimeType,
    chunkNumber: dto.filesChunks.length,
    createdAt: mapStringToDateFormat(dto.createdAt),
    updatedAt: mapStringToDateFormat(dto.updatedAt),
  }),

  toFileList: (dtos: FileDTO[]): File[] => dtos.map(fileMapper.toFile),
};
