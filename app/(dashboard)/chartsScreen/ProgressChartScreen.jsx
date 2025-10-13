import ProgressLineChart from "../../../components/Charts/ProgressLineChart";
import { format } from "date-fns";

export function ProgressChartScreen() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const weekAgo = format(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    
    return (
        <ProgressLineChart startDate={weekAgo} endDate={today} />
    )
}

//6*24*60*60*1000 gets the date 6 days ago, so the range is 7 days including today