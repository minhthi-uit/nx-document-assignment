import { Folder, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Folder as FolderType } from '../../hooks/useFolders';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface FolderListProps {
  folders: FolderType[];
  currentFolder: FolderType | null;
  onFolderClick: (folder: FolderType) => void;
  onCreateFolder: (name: string) => Promise<void>;
  onDeleteFolder: (folderId: string) => Promise<void>;
}

export const FolderList = ({
  folders,
  currentFolder,
  onFolderClick,
  onCreateFolder,
  onDeleteFolder,
}: FolderListProps) => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = async () => {
    if (!newFolderName) return;
    await onCreateFolder(newFolderName);
    setNewFolderName('');
    setIsCreateFolderOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Folders</h2>
        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Button onClick={handleCreateFolder}>
                Create Folder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`flex items-center justify-between p-2 rounded ${currentFolder?.id === folder.id ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
          >
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onFolderClick(folder)}
            >
              <Folder className="w-4 h-4" />
              <span className="text-sm">{folder.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(folder.id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};