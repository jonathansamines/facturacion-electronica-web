import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { subDays, startOfMonth, startOfYesterday, differenceInDays, startOfToday } from 'date-fns';

const DIAS_PASADOS_FACTURA = 5;

const FechaEmision = ({ fechaFactura, onSeleccion }) => {
  const inicioMes = startOfMonth(new Date());
  const ayer = startOfYesterday(new Date());

  const desde = differenceInDays(startOfToday(), inicioMes) > DIAS_PASADOS_FACTURA ? inicioMes : undefined;
  const hasta = subDays(ayer, DIAS_PASADOS_FACTURA);

  return (
    <DayPickerInput
      placeholder='Seleccione una fecha'
      value={fechaFactura}
      inputProps={({
        name: 'fecha_factura'
      })}
      dayPickerProps={({
        canChangeMonth: false,
        disabledDays: {
          from: desde,
          to: hasta,
        }
      })}
      onDayChange={onSeleccion} />
  );
};

FechaEmision.propTypes = {
  fechaFactura: PropTypes.instanceOf(Date),
  onSeleccion: PropTypes.func
};


export default FechaEmision;
