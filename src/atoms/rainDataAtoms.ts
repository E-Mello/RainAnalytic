import { atom } from 'jotai';

// Carregar os dados do db de todas as tabelas abaixo
export const fazendasAtom = atom<{ id: any; nome: any }[]>([]);
export const talhoesAtom = atom<{ id: any; nome: any }[]>([]);
export const pluviometersAtom= atom<{ id: any; nome: any }[]>([]);

// Selecionar as opcoes
export const selectedFazendaAtom = atom<{ id: any; nome: any } | undefined>(undefined);
export const selectedTalhaoAtom = atom<{ id: any; nome: any } | undefined>(undefined);
export const selectedPluviometerAtom = atom<{ id: any; nome: any } | undefined>(undefined);