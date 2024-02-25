import { shorteners } from './shortener.model';

export const shortenerProviders = [
  {
    provide: 'SHORTENER_REPOSITORY',
    useValue: shorteners,
  },
];
