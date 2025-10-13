import {useResources} from '../../hooks/useResources';
import { VictoryPie } from 'victory-native';

export default function CategoryBreakdownChart() {
    const { getCategoryBreakdown } = useResources();
    const categoryData = getCategoryBreakdown();

    return (
        <VictoryPie //when a theme is applied to VictoryPie, it will be inherited by all child components.
                data = {categoryData}
                x = "category"
                y = "count"
                colorScale = "qualitative"
                labelRadius = {50}
                style={{
                    labels: { fontSiz: 14, fill: "#C281F7"},
                }}
                alignments = 'middle'
        >

        </VictoryPie>
    )
}