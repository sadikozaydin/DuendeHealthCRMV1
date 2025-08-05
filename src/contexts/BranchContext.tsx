import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Branch {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
}

interface BranchSettings {
  isMultiBranch: boolean;
}

interface BranchContextType {
  branchSettings: BranchSettings;
  branches: Branch[];
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
    isMultiBranch: false
  });

  const [branches] = useState<Branch[]>([
    {
      id: '1',
      name: 'Ana Merkez',
      address: 'İstanbul, Türkiye',
      isActive: true
    },
    {
      id: '2',
      name: 'Ankara Şubesi',
      address: 'Ankara, Türkiye',
      isActive: true
    },
    {
      id: '3',
      name: 'İzmir Şubesi',
      address: 'İzmir, Türkiye',
      isActive: false
    }
  ]);

  const toggleMultiBranch = () => {
    setBranchSettings(prev => ({
      ...prev,
      isMultiBranch: !prev.isMultiBranch
    }));
  };

  return (
    <BranchContext.Provider value={{
      branchSettings,
      branches,
      toggleMultiBranch
    }}>
      {children}
    </BranchContext.Provider>
  );
};