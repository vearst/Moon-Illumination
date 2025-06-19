import { ComponentRef, memo, useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { gantt } from "dhtmlx-gantt";
import { Stack } from "@mui/material";

type GanttProps = {};

const Gantt = memo<GanttProps>(() => {
  const ganttContainer = useRef<ComponentRef<"div">>(null);

  useEffect(() => {
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.scale_unit = "month";
    gantt.config.date_scale = "%F %Y";
    gantt.config.subscales = [{ unit: "day", step: 1, date: "%j %D" }];

    if (ganttContainer.current) gantt.init(ganttContainer.current);

    gantt.parse({
      data: [
        {
          id: 1,
          text: "Project start",
          start_date: "2025-06-19",
          duration: 5,
          progress: 0.6,
        },
        {
          id: 2,
          text: "Development",
          start_date: "2025-06-24",
          duration: 8,
          progress: 0.3,
        },
        {
          id: 3,
          text: "Testing",
          start_date: "2025-07-03",
          duration: 4,
          progress: 0.1,
        },
      ],
    });

    return () => {
      gantt.clearAll();
    };
  }, []);

  return (
    <Stack
      ref={ganttContainer}
      style={{ width: "100%", height: "100vh" }}
    ></Stack>
  );
});

export default Gantt;
