import {
  ImageIcon,
  Video as VideoIcon,
  AudioLines,
  FileText,
  File as FileIcon,
  LucideIcon,
} from "lucide-react";

const ICON_SIZE = "h-12 w-12";

const MIME_TYPE_ICONS: Record<string, LucideIcon> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: AudioLines,
  text: FileText,
} as const;

export const FILE_MIMES = [
  {
    label: "All",
    mimes: [{ label: "all", value: "all" }],
  },
  {
    label: "Images",
    mimes: [
      { label: "jpeg", value: "image/jpeg" },
      { label: "png", value: "image/png" },
      { label: "gif", value: "image/gif" },
      { label: "svg", value: "image/svg+xml" },
      { label: "webp", value: "image/webp" },
      { label: "tiff", value: "image/tiff" },
    ],
  },
  {
    label: "Vidéos",
    mimes: [
      { label: "mp4", value: "video/mp4" },
      { label: "webm", value: "video/webm" },
      { label: "ogg", value: "video/ogg" },
      { label: "avi", value: "video/x-msvideo" },
      { label: "mov", value: "video/quicktime" },
    ],
  },
  {
    label: "Audio",
    mimes: [
      { label: "mp3", value: "audio/mpeg" },
      { label: "wav", value: "audio/wav" },
      { label: "ogg", value: "audio/ogg" },
      { label: "aac", value: "audio/aac" },
      { label: "flac", value: "audio/flac" },
    ],
  },
  {
    label: "Documents",
    mimes: [
      { label: "pdf", value: "application/pdf" },
      { label: "doc", value: "application/msword" },
      {
        label: "docx",
        value:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      { label: "xls", value: "application/vnd.ms-excel" },
      {
        label: "xlsx",
        value:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      { label: "ppt", value: "application/vnd.ms-powerpoint" },
      {
        label: "pptx",
        value:
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
      { label: "txt", value: "text/plain" },
      { label: "csv", value: "text/csv" },
    ],
  },
  {
    label: "Archives",
    mimes: [
      { label: "zip", value: "application/zip" },
      { label: "gzip", value: "application/gzip" },
      { label: "rar", value: "application/x-rar-compressed" },
      { label: "7z", value: "application/x-7z-compressed" },
    ],
  },
] as const;

export function mapMimeTypeToFileIcon(mimeType: string) {
  const IconComponent =
    Object.entries(MIME_TYPE_ICONS).find(([type]) =>
      mimeType.includes(type)
    )?.[1] ?? FileIcon;

  return <IconComponent className={ICON_SIZE} />;
}
