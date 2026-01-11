import { create } from 'zustand';

type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
    open: boolean;
    content: string;
    type: AlertType;
    // 动作
    showAlert: (content: string, type: AlertType) => void;
    // hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    open: false,
    content: "",
    type: "info",
    showAlert: (content, type) => {
        set({ content, type, open: true });

        setTimeout(() => {
            set({ content: "", type: "info", open: false });
        }, 3000);
    }
}))