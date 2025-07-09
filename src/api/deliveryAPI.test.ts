import { deliveryCheck } from './deliveryAPI';

describe('deliveryCheck', () => {
  it('should return success for a valid delivery path', () => {
    const output = deliveryCheck([['A', 'B'], ['C', 'D']], ['A', 'C', 'B', 'D']);
    const result = JSON.parse(output);
    expect(result.status).toBe('success');
  });

  it('should return error for missing address in path', () => {
    const output = deliveryCheck([['A', 'B'], ['C', 'D']], ['A', 'B', 'D']);
    const result = JSON.parse(output);
    expect(result.error_code).toBe('delivery_address_not_in_path');
  });

  it('should return error for dropoff before pickup', () => {
    const output = deliveryCheck([['A', 'B']], ['B', 'A']);
    const result = JSON.parse(output);
    expect(result.error_code).toBe('delivery_dropoff_before_pickup');
  });

  it('should handle non-delivery addresses in path', () => {
    const output = deliveryCheck([['A', 'B']], ['A', 'X', 'B']);
    const result = JSON.parse(output);
    expect(result.status).toBe('success');
    expect(result.steps.some((step: any) => step.action === null)).toBe(true);
  });
});