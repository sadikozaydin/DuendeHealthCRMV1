import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  isActive: boolean;
  createdAt: string;
}

interface BranchSettings {
  isMultiBranch: boolean;
  defaultBranch?: string;
}

interface BranchContextType {
  branches: Branch[];
  currentBranch: Branch | null;
  branchSettings: BranchSettings;
  addBranch: (branch: Omit<Branch, 'id' | 'createdAt'>) => void;
  updateBranch: (id: string, branch: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  setCurrentBranch: (branch: Branch | null) => void;
  updateBranchSettings: (settings: BranchSettings) => void;
  toggleMultiBranch: () => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

interface BranchProviderProps {
  children: ReactNode;
}

export const BranchProvider: React.FC<BranchProviderProps> = ({ children }) => {
  const [branchSettings, setBranchSettings] = useState<BranchSettings>({
    isMultiBranch: false,
    defaultBranch: undefined
  });

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: uuidv4(),
      name: 'Ana Merkez',
      address: 'Nişantaşı, İstanbul',
      phone: '+90 212 123 45 67',
      email: 'anamerkez@sagliktur.com',
      manager: 'Dr. Mehmet Yılmaz',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [currentBranch, setCurrentBranch] = useState<Branch | null>(
    branchSettings.isMultiBranch ? null : branches[0]
  );

  const addBranch = (branchData: Omit<Branch, 'id' | 'createdAt'>) => {
    const newBranch: Branch = {
      ...branchData,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBranches(prev => [...prev, newBranch]);
  };

  const updateBranch = (id: string, branchData: Partial<Branch>) => {
    setBranches(prev => 
      prev.map(branch => 
        branch.id === id ? { ...branch, ...branchData } : branch
      )
    );
  };

  const deleteBranch = (id: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
    if (currentBranch?.id === id) {
      setCurrentBranch(null);
    }
  };

  const updateBranchSettings = (settings: BranchSettings) => {
    setBranchSettings(settings);
    if (!settings.isMultiBranch && branches.length > 0) {
      setCurrentBranch(branches[0]);
    }
  };

  const toggleMultiBranch = () => {
    const newSettings = { 
      ...branchSettings, 
      isMultiBranch: !branchSettings.isMultiBranch 
    };
    updateBranchSettings(newSettings);
  };

  return (
    <BranchContext.Provider value={{
      branches,
      currentBranch,
      branchSettings,
      addBranch,
      updateBranch,
      deleteBranch,
      setCurrentBranch,
      updateBranchSettings,
      toggleMultiBranch
    }}>
      {children}
    </BranchContext.Provider>
  );
};