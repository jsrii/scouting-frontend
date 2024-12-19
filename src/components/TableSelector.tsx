import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TableSelectorProps {
  eventChanger: Function;
}

function TableSelector({ eventChanger }: TableSelectorProps) {
  const [tableArray, setTableArray] = useState([""]);

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      const res = await axios.get("http://192.168.1.40:7777/getevents", {
        headers: {
          "api-key": "97feee36-7fd0-46ab-a80e-8b8e24fc7a2e",
        },
      });
      console.log(res.data);
      setTableArray(res.data);
    } catch (error) {
      toast.error("Error fetching tables! " + error);
    }
  }

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Select an event"
        className="max-w-xs"
        onChange={(value) => eventChanger(value)}
      >
        {tableArray.map((events) => (
          <SelectItem key={events["Tables_in_scouting_db (2%)"]}>
            {events["Tables_in_scouting_db (2%)"]}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default TableSelector;
