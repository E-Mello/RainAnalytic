import { atom } from 'jotai';

// Carregar os dados do db de todas as tabelas abaixo
export const fazendasAtom = atom<{ id: any; nome: any }[]>([]);
export const talhoesAtom = atom<{ id: any; nome: any }[]>([]);
export const pluviometersAtom= atom<{ id: any; nome: any }[]>([]);

// Selecionar as opcoes
export const selectedFazendaAtom = atom<{ id: any; nome: any } | undefined>(undefined);
export const selectedTalhaoAtom = atom<{ id: any; nome: any } | undefined>(undefined);
export const selectedPluviometerAtom = atom<{ id: any; nome: any } | undefined>(undefined);

// Constantes default
export const defaultFazendaAtom = atom<{ id: any; nome: any }>({ id: 14, nome: 'testefazenda 3' });
export const defaultTalhaoAtom = atom<{ id: any; nome: any }>({ id: 52, nome: 'mais um talhao aqui' });
export const defaultPluviometerAtom = atom<{ id: any; nome: any }>({ id: 21, nome: 'Pluviometrozinho de teste' });