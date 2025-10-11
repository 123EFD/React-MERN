import { saturate } from "@shopify/react-native-skia";
import { parseISO, format, eachDayOfInterval } from "date-fns";

//helper for progress calculation
export function calculationProgress({ progressMode, unitsCompleted = 0, totalUnits = 0 }) {
    if (progressMode === "percent") {
        //unitsCompleted is already a percentage
        return Math.min(100, Math.max(0, unitsCompleted)); //clamp result between 0 and 100
    }
    if (!totalUnits || totalUnits <= 0) return 0; 
    // pages/time mode: percent = (unitsCompleted / totalUnits) * 100
    return Math.min(100, Math.max(0, (unitsCompleted/totalUnits) * 100));
}

//Aggregate progress for charting (line/bar chart)
// resources = [{ updatedAt: '2025-10-01T12:00:00Z', progressPercent: 20 }, ...]
export function aggregateProgressByDay(resources, startDate, endDate) {
    const daysOfWeek = eachDayOfInterval({start: parseISO(startDate),end: parseISO(endDate)})
        .map(d => format(d, "yyyy-MM-dd"));

        //Map: date -> [progressPercent values]
        //For each resource, use its “updatedAt” to group into time buckets
        const dayMap = {} 
        for (const r of resources) {
            const day = format(parseISO(r.updateAt), "yyyy-MM-dd");
            if (!dayMap[day]) dayMap[day] = []; //init array of progressPercent if not exist
            dayMap[day].push(r.progressPercent); 
        }

        //Format as { x: date, y: avgPercent } for line/bar charts.
        //reduce accumulate sum of array into single value
        return daysOfWeek.map(date => ({
            date,
            avgPercent: dayMap[date] ? (dayMap[date].reduce((a,b) => a + b,0) / dayMap[date].length) : 0,
            //Or sumPercent, or countCompleted
        }))
    }

        //category/status breakdown for pie/bar chart
        // Returns: [{ category, count }]
        export function breakdownResourcesByCategory(resources) {
            const map = {};
            resources.forEach(r => {
                if (r.categories && Array.isArray(r.categories)) {
                    r.categories.forEach(cat => {
                        if (!map[cat]) map[cat] = 0;
                        //count only finished resources (progressPercent => 100)
                        if (r.progressPercent >= 100 || r.status === 'finished') 
                            map[cat] += 1;
                    
            });
        }
    });
    //Object.entries(obj): An array of the given object's own 
    // enumerable string-keyed property key-value pairs
    // e.g. {a:1,b:2} => [['a',1],['b',2]]
    return Object.entries(map).map(([category, count]) => ({ category, count })); 
}

//status breakdown
export function breakdownResourcesByStatus(resources) {
    const status = {};
    resources.forEach(r => {
        const status = r.status || "unknown";
        if (!map[status]) map[status] = 0;
        map[status] += 1;
    });
    return Object.entries(map).map(([status, count]) => ({ status, count }));
}