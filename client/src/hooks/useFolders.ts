import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useToast } from './use-toast';

export interface Folder {
  id: string;
  name: string;
}

export const useFolders = () => {
  const { toast } = useToast();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const data = await api.getFolders();
      setFolders(data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch folders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createFolder = async (name: string) => {
    setIsLoading(true);
    try {
      await api.createFolder(name);
      await fetchFolders();
      toast({
        title: "Success",
        description: "Folder created successfully",
      });
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    setIsLoading(true);
    try {
      await api.deleteFolder(folderId);
      await fetchFolders();
      toast({
        title: "Success",
        description: "Folder deleted successfully"
      });
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return {
    folders,
    isLoading,
    createFolder,
    deleteFolder,
    refreshFolders: fetchFolders
  };
};