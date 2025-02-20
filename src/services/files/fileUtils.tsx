import {
  ImageIcon,
  Video as VideoIcon,
  AudioLines,
  FileText,
  File as FileIcon,
} from "lucide-react";
import { ReactNode } from "react";

export function mapMimeTypeToFileIcon(mimeType: string): ReactNode {
  const iconClassName = "h-20 w-20";

  if (mimeType.includes("image")) {
    return <ImageIcon className={iconClassName} />;
  }
  if (mimeType.includes("video")) {
    return <VideoIcon className={iconClassName} />;
  }
  if (mimeType.includes("audio")) {
    return <AudioLines className={iconClassName} />;
  }
  if (mimeType.includes("text")) {
    return <FileText className={iconClassName} />;
  }
  return <FileIcon className={iconClassName} />;
}
