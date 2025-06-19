import { ComponentRef, memo, useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { gantt } from 'dhtmlx-gantt';
import { getMoonIllumination, getTimes } from 'suncalc';
import { Stack } from '@mui/material';

type GanttProps = {};

//TODO: have a normal timeline display instead of this ugly shit
const Gantt = memo<GanttProps>(() => {
  const ganttContainer = useRef<ComponentRef<'div'>>(null);

  const formatDate = (date: Date) => {
    const { fraction } = getMoonIllumination(date);
    const illumination = Math.round(fraction * 100);
    const { sunrise, sunset } = getTimes(new Date(), 31.7769, 35.2224);

    return `${gantt.date.date_to_str('%m-%d')(
      date
    )} <small>${illumination}%</small>
    <small>(${sunrise.getHours()}:${sunrise.getMinutes()}-${sunset.getHours()}:${sunset.getMinutes()})</small>`;
  };

  useEffect(() => {
    gantt.config.xml_date = '%Y-%m-%d';

    gantt.config.scales = [
      {
        unit: 'day',
        format: formatDate,
        css: (date) => 'bob',
      },
    ];

    gantt.setWorkTime({ hours: [0, 24] });

    gantt.config.start_date = new Date();
    gantt.config.end_date = new Date(2025, 6, 10);

    gantt.config.show_grid = false;

    if (ganttContainer.current) gantt.init(ganttContainer.current);

    gantt.parse({
      data: [],
    });

    return () => {
      gantt.clearAll();
    };
  }, []);

  return (
    <Stack
      sx={{
        '& div:has(span)': {
          minWidth: '90px',
          minHeight: '70px',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& .bob': {
          width: '1em',
          whiteSpace: 'normal',
          overflow: 'visible',
        },
      }}
      ref={ganttContainer}
      style={{ width: '100vw', height: '100vh' }}
    ></Stack>
  );
});

export default Gantt;
