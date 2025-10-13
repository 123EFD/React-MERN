import {useResources} from '../../hooks/useResources';
import { VictoryBar } from 'victory-native';

export default function StatusBreakdownBar() {
    const { getStatusBreakdown } = useResources();
    const statusData = getStatusBreakdown();

    return (
        <div>
            {/* when a theme is applied to VictoryBar, it will be inherited by all child components. */}
            <VictoryBar 
                data={statusData}
                x="project"
                y="incomplete"
            />
            
            {/* when a theme is applied to VictoryBar, it will be inherited by all child components. */}
            <VictoryBar 
                data={statusData}
                x="project"
                y="complete"
                //add a label to mention the number of completed tasks
                labels={({datum}) => `${datum.y}%`}
                labelComponent={<VictoryLabel dy={-10} />}
            />
        </div>
    )
}