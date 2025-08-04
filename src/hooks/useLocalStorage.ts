import { useState, useEffect } from 'react';
import LocalStorageManager, { StorageKeys } from '../services/localStorageService';

// LocalStorage hook'u - otomatik kaydetme ve okuma
export function useLocalStorage<T>(
  key: keyof StorageKeys,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State'i localStorage'dan başlat
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = LocalStorageManager.getItem<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Değer güncelleme fonksiyonu
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Fonksiyon ise çalıştır, değilse direkt kullan
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // State'i güncelle
      setStoredValue(valueToStore);
      
      // localStorage'a kaydet
      LocalStorageManager.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Sadece okuma için localStorage hook'u
export function useLocalStorageRead<T>(key: keyof StorageKeys): T | null {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const item = LocalStorageManager.getItem<T>(key);
    setValue(item);
  }, [key]);

  return value;
}

// Otomatik senkronizasyon hook'u
export function useAutoSync<T>(
  key: keyof StorageKeys,
  data: T,
  enabled: boolean = true,
  delay: number = 2000
) {
  useEffect(() => {
    if (!enabled) return;

    const timeoutId = setTimeout(() => {
      LocalStorageManager.setItem(key, data);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [key, data, enabled, delay]);
}

// Çoklu localStorage hook'u
export function useMultipleLocalStorage<T extends Record<string, any>>(
  keys: (keyof StorageKeys)[],
  initialValues: T
): [T, (updates: Partial<T>) => void] {
  const [values, setValues] = useState<T>(() => {
    const result = { ...initialValues };
    
    keys.forEach((key, index) => {
      const keyName = Object.keys(initialValues)[index];
      const item = LocalStorageManager.getItem(key);
      if (item !== null) {
        result[keyName as keyof T] = item;
      }
    });
    
    return result;
  });

  const updateValues = (updates: Partial<T>) => {
    setValues(prev => {
      const newValues = { ...prev, ...updates };
      
      // Her güncellenen değeri localStorage'a kaydet
      Object.entries(updates).forEach(([key, value], index) => {
        const storageKey = keys[Object.keys(initialValues).indexOf(key)];
        if (storageKey) {
          LocalStorageManager.setItem(storageKey, value);
        }
      });
      
      return newValues;
    });
  };

  return [values, updateValues];
}