import {useResources} from '../../hooks/useResources';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { format } from 'date-fns';

export default function ProgressLineChart({ startDate, endDate }) {
    const { getProgressChartData } = useResources();
    const chartData = getProgressChartData(startDate, endDate);

    return (
        <VictoryChart //when a theme is applied to VictoryChart, it will be inherited by all child components.
                theme = {VictoryTheme.material}
                domainPadding = {{x: 20, y: 20}}
                alignments = 'middle'
        >
            {/* tickFormat formats the x-axis labels using date-fns,
            specifies how ticks should be displayed;
            “tickvalues” are the set of tick values to draw on the axis*/}
            {/*control how data points are connected to form lines or areas*/}
            <VictoryAxis tickFormat={(t) => t.slice(5)} />
                
            <VictoryAxis dependentAxis tickFormat={(y) => `${Math.round(y)}%`} />
                
                <VictoryLine 
                    data={chartData} 
                    
                    interpolation = "natural" 
                    style={{
                        data: { stroke: "#1EE1FA", strokeWidth: 3 } }}
                />

        </VictoryChart>
    )
}