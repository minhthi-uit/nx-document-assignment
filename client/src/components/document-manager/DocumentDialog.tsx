import { Document } from '../../hooks/useDocuments';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DocumentDialogProps {
  currentDocument: Document | null;
  setCurrentDocument: (document: Document | null) => void;
}

export const DocumentDialog = ({ currentDocument, setCurrentDocument }: DocumentDialogProps) => {
  if (!currentDocument) return null;

  return (
    <Dialog open={!!currentDocument} onOpenChange={() => setCurrentDocument(null)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{currentDocument.title}</DialogTitle>
        </DialogHeader>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: currentDocument.content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
