import { ComponentRef, memo, useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { gantt } from 'dhtmlx-gantt';
import { getMoonIllumination } from 'suncalc';

type GanttProps = {};

const Gantt = memo<GanttProps>(() => {
  const ganttContainer = useRef<ComponentRef<'div'>>(null);

  const formatDate = (date: Date) => {
    const { fraction } = getMoonIllumination(date);
    const illumination = Math.round(fraction * 100);

    return `${gantt.date.date_to_str('%d %M %Y')(
      date
    )} <small>${illumination}%</small>`;
  };

  useEffect(() => {
    gantt.config.xml_date = '%Y-%m-%d %H:%i';

    gantt.config.scales = [
      {
        unit: 'day',
        format: formatDate,
      },
      { unit: 'hour', step: 1, date: '%H:%i' },
    ];

    gantt.config.time_step = 60;
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
    <div ref={ganttContainer} style={{ width: '100vw', height: '100vh' }}></div>
  );
});

export default Gantt;
