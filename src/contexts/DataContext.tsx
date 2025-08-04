import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import LocalStorageManager from '../services/localStorageService';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DataContextType {
  // Lead verileri
  leads: any[];
  setLeads: (leads: any[]) => void;
  addLead: (lead: any) => void;
  updateLead: (id: string, lead: any) => void;
  deleteLead: (id: string) => void;
  
  // Hasta verileri
  patients: any[];
  setPatients: (patients: any[]) => void;
  addPatient: (patient: any) => void;
  updatePatient: (id: string, patient: any) => void;
  deletePatient: (id: string) => void;
  
  // Teklif verileri
  offers: any[];
  setOffers: (offers: any[]) => void;
  addOffer: (offer: any) => void;
  updateOffer: (id: string, offer: any) => void;
  deleteOffer: (id: string) => void;
  
  // Randevu verileri
  appointments: any[];
  setAppointments: (appointments: any[]) => void;
  addAppointment: (appointment: any) => void;
  updateAppointment: (id: string, appointment: any) => void;
  deleteAppointment: (id: string) => void;
  
  // Sistem ayarları
  systemSettings: any;
  updateSystemSettings: (settings: any) => void;
  
  // Veri yönetimi
  exportAllData: () => string;
  importAllData: (jsonData: string) => boolean;
  clearAllData: () => void;
  getStorageInfo: () => { used: number; total: number; percentage: number };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // LocalStorage hook'ları ile veri yönetimi
  const [leads, setLeads] = useLocalStorage('leads', []);
  const [patients, setPatients] = useLocalStorage('patients', []);
  const [offers, setOffers] = useLocalStorage('offers', []);
  const [appointments, setAppointments] = useLocalStorage('appointments', []);
  const [systemSettings, setSystemSettings] = useLocalStorage('systemSettings', {
    theme: 'light',
    language: 'tr',
    notifications: true,
    autoSave: true
  });

  // Lead işlemleri
  const addLead = (lead: any) => {
    const newLead = {
      ...lead,
      id: lead.id || `lead_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, leadData: any) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id 
        ? { ...lead, ...leadData, updated_at: new Date().toISOString() }
        : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // Hasta işlemleri
  const addPatient = (patient: any) => {
    const newPatient = {
      ...patient,
      id: patient.id || `patient_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setPatients(prev => [newPatient, ...prev]);
  };

  const updatePatient = (id: string, patientData: any) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id 
        ? { ...patient, ...patientData, updated_at: new Date().toISOString() }
        : patient
    ));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  // Teklif işlemleri
  const addOffer = (offer: any) => {
    const newOffer = {
      ...offer,
      id: offer.id || `offer_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const updateOffer = (id: string, offerData: any) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { ...offer, ...offerData, updated_at: new Date().toISOString() }
        : offer
    ));
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(offer => offer.id !== id));
  };

  // Randevu işlemleri
  const addAppointment = (appointment: any) => {
    const newAppointment = {
      ...appointment,
      id: appointment.id || `appointment_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const updateAppointment = (id: string, appointmentData: any) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === id 
        ? { ...appointment, ...appointmentData, updated_at: new Date().toISOString() }
        : appointment
    ));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  // Sistem ayarları güncelleme
  const updateSystemSettings = (settings: any) => {
    setSystemSettings(prev => ({ ...prev, ...settings }));
  };

  // Veri yönetimi fonksiyonları
  const exportAllData = (): string => {
    return LocalStorageManager.exportData();
  };

  const importAllData = (jsonData: string): boolean => {
    return LocalStorageManager.importData(jsonData);
  };

  const clearAllData = () => {
    LocalStorageManager.clearAll();
    // State'leri de sıfırla
    setLeads([]);
    setPatients([]);
    setOffers([]);
    setAppointments([]);
    setSystemSettings({
      theme: 'light',
      language: 'tr',
      notifications: true,
      autoSave: true
    });
  };

  const getStorageInfo = () => {
    return LocalStorageManager.getStorageSize();
  };

  // Otomatik temizleme (sayfa yüklendiğinde)
  useEffect(() => {
    // 30 günden eski verileri temizle
    LocalStorageManager.cleanupOldData(30);
  }, []);

  const value: DataContextType = {
    // Lead verileri
    leads,
    setLeads,
    addLead,
    updateLead,
    deleteLead,
    
    // Hasta verileri
    patients,
    setPatients,
    addPatient,
    updatePatient,
    deletePatient,
    
    // Teklif verileri
    offers,
    setOffers,
    addOffer,
    updateOffer,
    deleteOffer,
    
    // Randevu verileri
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    
    // Sistem ayarları
    systemSettings,
    updateSystemSettings,
    
    // Veri yönetimi
    exportAllData,
    importAllData,
    clearAllData,
    getStorageInfo
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};