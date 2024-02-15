import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { getAppointment } from '@/api/api';
import appointmentKeys from 'shared/src/queries/appointment/appointmentKeys';
import useAppointmentQuery from './useAppointmentQuery.hook';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/api/api', () => ({
  getAppointment: jest.fn(),
}));

jest.mock('shared/src/queries/appointment/appointmentKeys', () => ({
  detailById: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

function TestComponent({ appointmentId }) {
  const { data, isLoading, isError } = useAppointmentQuery(appointmentId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <div>{data ? data.name : 'No data'}</div>;
}

describe('useAppointmentQuery', () => {
  it('calls useQuery with the correct parameters when appointmentId is provided', async () => {
    const mockAppointmentId = '123';
    const mockData = { id: mockAppointmentId, name: 'Test Appointment' };

    getAppointment.mockResolvedValue(mockData);
    appointmentKeys.detailById.mockReturnValue(['appointment', mockAppointmentId]);
    useQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    const { getByText } = render(<TestComponent appointmentId={mockAppointmentId} />);

    await waitFor(() => {
      expect(getByText('Test Appointment')).toBeInTheDocument();
    });

    expect(appointmentKeys.detailById).toHaveBeenCalledWith(mockAppointmentId);
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['appointment', mockAppointmentId],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it('does not enable useQuery when appointmentId is not provided', () => {
    render(<TestComponent appointmentId={null} />);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
    enabled: false
    }));
  });
});
