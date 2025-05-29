import { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormData } from "../_types/form";

const AvailableTimesFormItem = ({
  field,
}: {
  field: ControllerRenderProps<
    FormData,
    "availableFromTime" | "availableToTime"
  >;
}) => {
  return (
    <FormItem className="flex-1">
      <FormLabel>
        Horário {field.name === "availableFromTime" ? "inicial" : "final"} de
        disponibilidade
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um horário" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Manhã</SelectLabel>
            <SelectItem value="05:00:00">05:00</SelectItem>
            <SelectItem value="05:30:00">05:30</SelectItem>
            <SelectItem value="06:00:00">06:00</SelectItem>
            <SelectItem value="06:30:00">06:30</SelectItem>
            <SelectItem value="07:00:00">07:00</SelectItem>
            <SelectItem value="07:30:00">07:30</SelectItem>
            <SelectItem value="08:00:00">08:00</SelectItem>
            <SelectItem value="08:30:00">08:30</SelectItem>
            <SelectItem value="09:00:00">09:00</SelectItem>
            <SelectItem value="09:30:00">09:30</SelectItem>
            <SelectItem value="10:00:00">10:00</SelectItem>
            <SelectItem value="10:30:00">10:30</SelectItem>
            <SelectItem value="11:00:00">11:00</SelectItem>
            <SelectItem value="11:30:00">11:30</SelectItem>
            <SelectItem value="12:00:00">12:00</SelectItem>
            <SelectItem value="12:30:00">12:30</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Tarde</SelectLabel>
            <SelectItem value="13:00:00">13:00</SelectItem>
            <SelectItem value="13:30:00">13:30</SelectItem>
            <SelectItem value="14:00:00">14:00</SelectItem>
            <SelectItem value="14:30:00">14:30</SelectItem>
            <SelectItem value="15:00:00">15:00</SelectItem>
            <SelectItem value="15:30:00">15:30</SelectItem>
            <SelectItem value="16:00:00">16:00</SelectItem>
            <SelectItem value="16:30:00">16:30</SelectItem>
            <SelectItem value="17:00:00">17:00</SelectItem>
            <SelectItem value="17:30:00">17:30</SelectItem>
            <SelectItem value="18:00:00">18:00</SelectItem>
            <SelectItem value="18:30:00">18:30</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Noite</SelectLabel>
            <SelectItem value="19:00:00">19:00</SelectItem>
            <SelectItem value="19:30:00">19:30</SelectItem>
            <SelectItem value="20:00:00">20:00</SelectItem>
            <SelectItem value="20:30:00">20:30</SelectItem>
            <SelectItem value="21:00:00">21:00</SelectItem>
            <SelectItem value="21:30:00">21:30</SelectItem>
            <SelectItem value="22:00:00">22:00</SelectItem>
            <SelectItem value="22:30:00">22:30</SelectItem>
            <SelectItem value="23:00:00">23:00</SelectItem>
            <SelectItem value="23:30:00">23:30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default AvailableTimesFormItem;
