import ProgressLineChart from "../../../components/Charts/ProgressLineChart";
import StatusBarChart from "../../../components/Charts/StatusBarChart";
import CategoryPieChart from "../../../components/Charts/CategoryPieChart";
import ThemeText from "../../../components/ThemeText";
import Spaces from "../../../components/Spaces";
import { format } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../../../constants/Colors";

export function ProgressChartScreen() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const weekAgo = format(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    
    return (
        <ScrollView style={{flex: 1, padding: 10}}>

            <ThemeText style={{fontWeight: "bold", color: Colors.primary}}>Progress Overview</ThemeText>
            <Spaces/>

            <ThemeText>Weekly Progress</ThemeText>
            <ProgressLineChart startDate={weekAgo} endDate={today} />

            <ThemeText>Completed by Category</ThemeText>
            <CategoryPieChart />

            <ThemeText>Status Breakdown</ThemeText>
            <StatusBarChart />
        </ScrollView>
    )
}

export default ProgressChartScreen;
//6*24*60*60*1000 gets the date 6 days ago, so the range is 7 days including today