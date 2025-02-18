import { Edit2, Trash2 } from 'lucide-react';
import { Document } from '../../hooks/useDocuments';
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DocumentCardProps {
  document: Document;
  onEdit: (doc: Document) => void;
  onDelete: (docId: string) => void;
  onClick: (doc: Document) => void;
}

export const DocumentCard = ({ document, onEdit, onDelete, onClick }: DocumentCardProps) => {
  return (
    <Card className="cursor-pointer" onClick={() => onClick(document)}>
      <CardHeader>
        <CardTitle className="text-lg">{document.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 truncate">
          {document.content}
        </p>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onEdit(document) }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onDelete(document.id) }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};