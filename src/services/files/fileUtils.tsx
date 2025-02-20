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

export function mapMimeTypeToFileIcon(mimeType: string) {
  const IconComponent =
    Object.entries(MIME_TYPE_ICONS).find(([type]) =>
      mimeType.includes(type)
    )?.[1] ?? FileIcon;

  return <IconComponent className={ICON_SIZE} />;
}
