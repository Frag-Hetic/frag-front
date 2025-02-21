import { Outlet } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Upload } from "lucide-react";
import { FileUploadModal } from "../files/upload/FileUploadModal";
import { useState } from "react";

export default function FileLayout() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex flex-1">
        <section className="p-8 min-h-screen w-full bg-gradient-to-b from-background to-muted">
          <Outlet />
        </section>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => setShowUploadModal(true)}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </ContextMenuItem>
      </ContextMenuContent>

      {/* Controlled Upload Modal */}
      <FileUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
      />
    </ContextMenu>
  );
}
