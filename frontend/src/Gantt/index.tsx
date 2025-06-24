import { Stack } from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { ComponentRef, memo, useEffect, useRef } from 'react';
import { formatDay, formatHour } from './utils';

type GanttProps = {};

const Gantt = memo<GanttProps>(() => {
  const ganttContainer = useRef<ComponentRef<'div'>>(null);

  useEffect(() => {
    gantt.config.scales = [
      {
        unit: 'day',
        format: formatDay,
        css: () => 'day',
      },
      {
        unit: 'hour',
        format: formatHour,
      },
    ];

    gantt.config.start_date = startOfDay(new Date());
    gantt.config.end_date = endOfDay(new Date());

    gantt.config.show_grid = false;

    if (ganttContainer.current) gantt.init(ganttContainer.current);

    return () => {
      gantt.clearAll();
    };
  }, []);

  return (
    <Stack
      sx={{
        '.gantt_task_scale': { borderWidth: '0' },
        '& .gantt_scale_line:has(.day)': {
          backgroundColor: 'red',
          lineHeight: '2em !important',
          height: '2em !important',
          color: 'white',
        },
      }}
      ref={ganttContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
});

export default Gantt;
