import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useToast } from '../../hooks/use-toast';
import { Document, useDocuments } from '../../hooks/useDocuments';
import { Folder, useFolders } from '../../hooks/useFolders';
import { HistoryItem, useHistory } from '../../hooks/useHistory';
import { api } from '../../utils/api';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from "../ui/textarea";
import { DocumentCard } from './DocumentCard';
import { FolderList } from './FolderList';
import { RecentDocuments } from './RecentDocument';
import { SearchBar } from './SearchBar';

interface AppState {
  currentFolder: Folder | null;
  searchQuery: string;
  searchResults: Document[] | null;
}

interface EditingState {
  document: Document | null;
  content: string;
}

interface MarkdownPreviewProps {
  content: string | undefined;
}

const MarkdownPreview = ({ content }: MarkdownPreviewProps) => (
  <div className="prose prose-sm max-w-none dark:prose-invert">
    <ReactMarkdown>{content || ''}</ReactMarkdown>
  </div>
);

export function DocumentManager() {
  const [state, setState] = useState<AppState>({
    currentFolder: null,
    searchQuery: '',
    searchResults: null
  });

  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);
  const [editingState, setEditingState] = useState<EditingState>({
    document: null,
    content: ''
  });
  const [activeTab, setActiveTab] = useState('edit');

  const { toast } = useToast();
  const { folders, createFolder, deleteFolder } = useFolders();
  const { documents, createDocument, deleteDocument, updateDocument } = useDocuments(state.currentFolder?.id ?? null);
  const { recentDocuments, addToHistory } = useHistory();

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    if (!query) {
      setState(prev => ({ ...prev, searchResults: null }));
      return;
    }
    try {
      const results = await api.searchDocuments(query);
      setState(prev => ({ ...prev, searchResults: results }));
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to search documents",
        variant: "destructive"
      });
    }
  };

  const handleDocumentClick = async (doc: HistoryItem) => {
    try {
      const document = await api.getDocument(doc.id);
      setCurrentDocument(document);
      await addToHistory(doc);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to open document",
        variant: "destructive"
      });
    }
  };

  const handleCreateDocument = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.currentFolder) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      title: String(formData.get('title')),
      content: String(formData.get('content'))
    };

    try {
      await createDocument(data);
      toast({
        title: "Success",
        description: "Document created successfully",
      });
      setIsCreateDocumentOpen(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
    }
  };

  const handleEditDocument = (document: Document) => {
    setEditingState({
      document,
      content: document.content
    });
  };

  const handleUpdateDocument = async () => {
    if (!editingState.document) return;

    try {
      await updateDocument(editingState.document.id, editingState.content);
      setEditingState({ document: null, content: '' });
      toast({
        title: "Success",
        description: "Document updated successfully"
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive"
      });
    }
  };

  const handlePreviewContent = (): string => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    return textarea?.value || '';
  };

  const documentsToDisplay = state.searchResults || documents;

  return (
    <div className="flex h-screen">
      {/* Keep existing sidebar */}
      <div className="w-64 border-r p-4 bg-gray-50">
        <SearchBar
          value={state.searchQuery}
          onChange={handleSearch}
        />
        <RecentDocuments
          documents={recentDocuments}
          onDocumentClick={handleDocumentClick}
        />
        <FolderList
          folders={folders}
          currentFolder={state.currentFolder}
          onFolderClick={(folder) => setState(prev => ({ ...prev, currentFolder: folder }))}
          onCreateFolder={createFolder}
          onDeleteFolder={deleteFolder}
        />
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          {state.searchQuery ? 'Search Results' : state.currentFolder ? state.currentFolder.name : 'All Documents'}
        </h1>

        {/* Create Document Dialog with Markdown */}
        {state.currentFolder && (
          <Dialog
            open={isCreateDocumentOpen}
            onOpenChange={setIsCreateDocumentOpen}
          >
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateDocument} className="space-y-4">
                <Input name="title" placeholder="Document Title" />
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-2">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit" className="mt-0">
                    <Textarea
                      name="content"
                      placeholder="Document Content (Markdown supported)"
                      className="min-h-[400px] font-mono"
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-0">
                    <div className="min-h-[400px] p-4 border rounded-md bg-white">
                      <MarkdownPreview content={handlePreviewContent()} />
                    </div>
                  </TabsContent>
                </Tabs>
                <Button type="submit">Create Document</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Document Dialog with Markdown */}
        <Dialog
          open={!!editingState.document}
          onOpenChange={(open) => !open && setEditingState({ document: null, content: '' })}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Document: {editingState.document?.title}</DialogTitle>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-0">
                <Textarea
                  value={editingState.content}
                  className="min-h-[400px] font-mono"
                  onChange={(e) => setEditingState(prev => ({ ...prev, content: e.target.value }))}
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <div className="min-h-[400px] p-4 border rounded-md bg-white">
                  <MarkdownPreview content={editingState.content} />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingState({ document: null, content: '' })}>
                Cancel
              </Button>
              <Button onClick={handleUpdateDocument}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentsToDisplay?.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={() => handleDocumentClick(doc)}
              onEdit={() => handleEditDocument(doc)}
              onDelete={() => deleteDocument(doc.id)}
            />
          ))}
        </div>
      </div>

      {/* Document View Dialog with Markdown */}
      {currentDocument && (
        <Dialog open={!!currentDocument} onOpenChange={(open) => !open && setCurrentDocument(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{currentDocument.title}</DialogTitle>
            </DialogHeader>
            <div className="min-h-[400px] p-4 border rounded-md bg-white">
              <MarkdownPreview content={currentDocument.content} />
            </div>
            <Button variant="outline" onClick={() => setCurrentDocument(null)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default DocumentManager;