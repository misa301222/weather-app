import { useState } from "react";
import DatePicker from "react-datepicker";

function YearPicker(props: any) {
    const [startDate, setStartDate] = useState<any | null>(new Date());

    const setDate = (date: any) => {
        setStartDate(date);
        props.onChange(date);
    }

    return (
        <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setDate(date)}
            showYearPicker
            dateFormat="yyyy"
            value={startDate}
        />
    );
}

export default YearPicker;