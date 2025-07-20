import { TestBed } from '@angular/core/testing';

import { TripCardService } from './trip-card.service';

describe('TripCardService', () => {
  let service: TripCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getAllTrips method', () => {
    expect(typeof service.getAllTrips).toBe('function');
  });

  it('should call supabaseClient.from("trip").select() in getAllTrips', async () => {
    const spy = spyOn(service.supabaseClient, 'from').and.callThrough();
    await service.getAllTrips();
    expect(spy).toHaveBeenCalledWith('trip');
  });

  it('should call supabaseClient.from("trip").insert() in addTrip', async () => {
    const spy = spyOn(service.supabaseClient, 'from').and.returnValue({
      insert: () => Promise.resolve(),
    } as any);
    await service.addTrip({
      name: 'Test',
      startDate: '',
      endDate: '',
      backgroundImg: '',
      food: '',
      view: '',
      nature: '',
      random: '',
    });
    expect(spy).toHaveBeenCalledWith('trip');
  });

  it('should set tripSelected when editTrip is called', () => {
    const trip = {
      id: '1',
      name: 'Test',
      startDate: '',
      endDate: '',
      backgroundImg: '',
      user_id: 'test-user',
      food: '',
      view: '',
      nature: '',
      random: '',
    };
    service.editTrip(trip);
    expect(service.tripSelected).toEqual(trip);
  });

  it('should call supabaseClient.from("trip").delete() in deleteTrip', async () => {
    const spy = spyOn(service.supabaseClient, 'from').and.returnValue({
      delete: () => ({
        eq: () => Promise.resolve(),
      }),
    } as any);
    // snackbar action
    spyOn(service['snackBar'], 'open').and.returnValue({
      onAction: () => ({
        subscribe: (fn: Function) => fn(),
      }),
    } as any);
    await service.deleteTrip('1');
    expect(spy).toHaveBeenCalledWith('trip');
  });

  it('should call supabaseClient.from("trip").select("*").eq("id", ...) in getTripById', async () => {
    const spy = spyOn(service.supabaseClient, 'from').and.returnValue({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: { id: '1' } }),
        }),
      }),
    } as any);
    const result = await service.getTripById('1');
    expect(spy).toHaveBeenCalledWith('trip');
    expect(result).toEqual({ id: '1' });
  });

  it('should call supabaseClient.from("trip").update() in updateTripRatings', async () => {
    const spy = spyOn(service.supabaseClient, 'from').and.returnValue({
      update: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    } as any);
    const error = await service.updateTripRatings('1', {
      r_food: 1,
      r_people: 2,
      r_scenery: 3,
      r_vibe: 4,
    });
    expect(spy).toHaveBeenCalledWith('trip');
    expect(error).toBeNull();
  });
});
