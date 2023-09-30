import { atom } from 'jotai';

// Atoms referente aos formulariosdo relatorio
export const selectedFazendaAtom = atom<string | null>(null);
export const selectedTalhaoAtom = atom<string | null>(null);
export const selectedPluviometerAtom = atom<number[] | null>([]);
export const reportFormatAtom = atom<'pdf' | 'csv' | null>(null);
export const fazendasAtom = atom<{ id: any; nome: any }[]>([]);
export const talhoesAtom = atom<{ id: any; nome: any }[]>([]);
export const pluviometersAtom= atom<{ id: any; nome: any }[]>([]);
export const buttonDisabledAtom = atom(true);

// Atoms para o CustomDatePicker
export const selectedDateAtom = atom<Date | null>(null);
export const selectedStartDateAtom = atom<Date | null>(null);
export const selectedEndDateAtom = atom<Date | null>(null);
export const datePickerVisibleAtom = atom(false);
export const selectedDayAtom = atom<string | null>(null);
export const startDateAtom = atom(new Date());
export const endDateAtom = atom(new Date());

// Atoms referente ao modal de escolher o tipo do relatorio
export const selectedReportTypeAtom = atom<'pdf' | 'csv' | null>(null);
export const reportModelVisibleAtom = atom<boolean>(false);
export const isGeneratingReportAtom = atom<boolean>(false);


// Atom para controlar a desabilitação do botão
export const isButtonDisabledAtom = atom<boolean>(true); // Inicializado como true
