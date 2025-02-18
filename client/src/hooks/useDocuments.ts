import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useToast } from './use-toast';

export interface Document {
  id: string;
  title: string;
  content: string;
  folderId: string;
}

export const useDocuments = (folderId: string | null) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  const fetchDocuments = async () => {
    if (!folderId) return;
    setIsLoading(true);
    try {
      const data = await api.getDocuments(folderId);
      setDocuments(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createDocument = async (document: { title: string; content: string }) => {
    if (!folderId) return false;
    setIsLoading(true);
    try {
      await api.createDocument({ ...document, folderId });
      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document created successfully",
      });
      return true;
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await api.deleteDocument(docId);
      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  const openDocument = async (docId: string) => {
    try {
      const data = await api.getDocument(docId);
      setCurrentDocument(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to open document",
        variant: "destructive",
      });
    }
  };

  const updateDocument = async (docId: string, content: string) => {
    try {
      await api.updateDocument(docId, content);
      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document updated successfully"
      });
      return true;
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    if (folderId) {
      fetchDocuments();
    }
  }, [folderId]);

  return {
    documents,
    isLoading,
    currentDocument,
    setCurrentDocument,
    createDocument,
    deleteDocument,
    openDocument,
    updateDocument,
    refreshDocuments: fetchDocuments
  };
};