import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface IPaymentData {

  [key: string]: any; 
}
export interface IPayment extends IPaymentData {
  id: string;
  paid: boolean;
}

export interface IPaymentsState {
  items: IPayment[];
  addPayment: (payment: IPaymentData) => void;
  removePayment: (id: string) => void;
  togglePaid: (id: string) => void;
}

export const usePaymentsStore = create<IPaymentsState>()(
  persist(
    (set) => ({
      items: [],
      
      addPayment: (payment) =>
        set((state) => ({
          items: [...state.items, { ...payment, id: nanoid(), paid: false }],
        })),
        
      removePayment: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
        
      togglePaid: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, paid: !item.paid } : item
          ),
        })),
    }),
    {
      name: 'payments-storage',
    }
  )
);