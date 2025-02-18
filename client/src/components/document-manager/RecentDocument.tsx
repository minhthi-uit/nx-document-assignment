import { Clock } from 'lucide-react';
import { HistoryItem } from '../../hooks/useHistory';

interface RecentDocumentsProps {
  documents: HistoryItem[];
  onDocumentClick: (doc: HistoryItem) => void;
}

export const RecentDocuments = ({ documents, onDocumentClick }: RecentDocumentsProps) => {
  return (
    <div className="mb-6 mt-2">
      <h2 className="text-sm font-semibold mb-2">Recent Documents</h2>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => onDocumentClick(doc)}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm truncate">{doc.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};