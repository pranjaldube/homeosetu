"use client";

import { useState } from "react";
import { File, Download, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileViewerProps {
  attachment: {
    id: string;
    name: string;
    url: string;
  };
}

export const FileViewer = ({ attachment }: FileViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileExtension = attachment.name.split('.').pop()?.toLowerCase();
  const isPDF = fileExtension === 'pdf';
  const isDOCX = fileExtension === 'docx' || fileExtension === 'doc';
  const isViewable = isPDF || isDOCX;

  const handleView = () => {
    setIsOpen(true);
    setIsLoading(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const getFileIcon = () => {
    if (isPDF) return "📄";
    if (isDOCX) return "📝";
    return "📎";
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 w-full bg-sky-200 border text-sky-700 rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getFileIcon()}</span>
          <p className="line-clamp-1 font-medium">
            {attachment.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isViewable && (
            <Button
              onClick={handleView}
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-sky-700 hover:bg-sky-300"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          )}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-sky-700 hover:bg-sky-300"
          >
            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-1" />
              Download
            </a>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getFileIcon()}</span>
                <h2 className="text-lg font-semibold">{attachment.name}</h2>
              </div>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-700 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading document...</p>
                  </div>
                </div>
              )}
              
              {isPDF && (
                <iframe
                  src={`${attachment.url}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  title={attachment.name}
                />
              )}
              
              {isDOCX && (
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(attachment.url)}&embedded=true`}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  title={attachment.name}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 