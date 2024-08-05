import optionsData from '../data/names.json';

export interface OptionType {
  id: string;
  icon: string;
  text: string;
}

export const fetchOptions = async (): Promise<OptionType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(optionsData as OptionType[]), 500);
  });
};
