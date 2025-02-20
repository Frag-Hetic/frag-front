export const FileDetailHeader = ({ file }: FileDetailHeaderProps) => {
  return (
    <div className="px-6 pb-4">
      <div className="flex items-center justify-center mb-4">
        <div className="p-4 bg-primary/5 rounded-full">{file.fileIcon}</div>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-center">{file.filename}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {file.mimeType}
        </p>
      </div>
    </div>
  );
};
