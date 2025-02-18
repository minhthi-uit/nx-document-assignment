import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Textarea } from "../ui/textarea";
import { DocumentCard } from './DocumentCard';
import { DocumentDialog } from './DocumentDialog';
import { FolderList } from './FolderList';
import { RecentDocuments } from './RecentDocument';
import { SearchBar } from './SearchBar';

export function DocumentManager() {
  const { toast } = useToast();
  const { folders } = useFolders();
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const { documents, createDocument, deleteDocument, updateDocument } = useDocuments(currentFolder?.id ?? null);
  const { recentDocuments, addToHistory } = useHistory();
  const { createFolder, deleteFolder, refreshFolders } = useFolders();
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Document[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const { register, handleSubmit, reset } = useForm<{ title: string; content: string }>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults(null);
      return;
    }
    try {
      const results = await api.searchDocuments(query);
      setSearchResults(results);
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

  const handleDocumentDelete = async (docId: string) => {
    try {
      await deleteDocument(docId);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: { title: string; content: string }) => {
    if (!currentFolder) return;
    try {
      await createDocument(data);
      toast({
        title: "Success",
        description: "Document created successfully",
      });
      setIsCreateDocumentOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
    }
  };

  const handleCreateFolder = async (name: string) => {
    try {
      await createFolder(name);
      refreshFolders();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive"
      });
    }
  };

  const handleUpdateDocument = async (docId: string, content: string) => {
    try {
      await updateDocument(docId, content);
      setEditingDocument(null);
      toast({
        title: "Success",
        description: "Document updated successfully"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!folderId) return;

    try {
      await deleteFolder(folderId);

      // Reset current folder if deleted
      if (currentFolder?.id === folderId) {
        setCurrentFolder(null);
      }

      toast({
        title: "Success",
        description: "Folder deleted successfully"
      });

    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive"
      });
    }
  };

  const documentsToDisplay = searchResults || documents;

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r p-4 bg-gray-50">
        <SearchBar value={searchQuery} onChange={handleSearch} />
        <RecentDocuments documents={recentDocuments} onDocumentClick={handleDocumentClick} />
        <FolderList
          folders={folders}
          currentFolder={currentFolder}
          onFolderClick={setCurrentFolder}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
        />
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          {searchQuery ? 'Search Results' : currentFolder ? currentFolder.name : 'All Documents'}
        </h1>

        {currentFolder && (
          <Dialog open={isCreateDocumentOpen} onOpenChange={setIsCreateDocumentOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input placeholder="Document Title" {...register("title")} />
                <Textarea
                  placeholder="Document Content (Markdown supported)"
                  className="min-h-[200px]"
                  {...register("content")}
                />
                <Button type="submit">Create Document</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
        {editingDocument && (<Dialog open={!!editingDocument} onOpenChange={() => setEditingDocument(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Document: {editingDocument?.title}</DialogTitle>
            </DialogHeader>
            <Textarea
              defaultValue={editingDocument?.content}
              className="min-h-[200px]"
              onChange={(e) => {
                if (editingDocument) {
                  handleUpdateDocument(editingDocument.id, e.target.value);
                }
              }}
            />
            <Button onClick={() => setEditingDocument(null)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>)}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentsToDisplay?.map((doc: Document) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={() => handleDocumentClick(doc)}
              onEdit={() => setEditingDocument(doc)}
              onDelete={() => handleDocumentDelete(doc.id)}
            />
          ))}
        </div>
      </div>

      {currentDocument && (
        <DocumentDialog
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
        />
      )}
    </div>
  );
}

export default DocumentManager;