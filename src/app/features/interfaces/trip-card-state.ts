import { CardInterface } from './card-interface';

export interface TripCardState {
  tripCards: CardInterface[];
  loading: boolean;
  error: boolean;
}
