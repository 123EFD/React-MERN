import { createContext, useEffect, useState, useCallback} from "react";
import { databases ,client, ids } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import {
    calculationProgress,
    aggregateProgressByDay,
    breakdownResourcesByCategory,
    breakdownResourcesByStatus
} from "../helpers/progress";

//Constants for enum values for filtering
export const RESOURCE_TYPES = ["book", "video", "course", "pdf", "link"];
export const STATUS = ["to-read", "reading", "finished"];
export const PRIORITIES = ["low","medium" ,"high" ];
export const PROGRESS_MODES = ["pages","chapters", "percent", "videos", "lessons", "minutes", "hours"];

export const ResourcesContext = createContext();

export function ResourcesProvider( {children} ) {
    const { user } = useUser();
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState({
        type:null, //book,video,course
        status:null, //to-read, reading,finished
        priority:null, //low~high
        category:null, //fiction, non-fiction, programming
        q:"", //search query (keyword)
    });

    //build appwrite queries based on the filters,passed to 
    // listDocuments method, callback to memorize the function
    const buildQueries = useCallback(() => {
        //always filter by the current user 
        const q = [Query.equal("userId", user.$id), Query.limit(100), Query.orderDesc("$createdAt")];
        if (filter.type) q.push(Query.equal("type", filter.type));
        if (filter.status) q.push(Query.equal("status", filter.status));
        if (filter.priority) q.push(Query.equal("priority", filter.priority));
        if (filter.category) q.push(Query.contains("categories", filter.category));
        if (filter.q) q.push(Query.search("title", filter.q));

        return q;
    }, [user, filter]);
    
    //upload file
    async function fetchResources() {
        try {
            const queries = buildQueries();
            const res = await databases.listDocuments(
                ids.databaseId,
                ids.resourcesCollectionId,
                queries
            );
            setResources(res.documents);
        } catch (e) {
            console.error(e.message);
        }
    }

    // get metadata for a file
    async function createResources(data) {
        const doc = await databases.createDocument(
            ids.databaseId,
            ids.resourcesCollectionId,
            ID.unique(),
            {...data, userId: user.$id},
            [
                Permission.read(Role.user(user.$id)), //only user can read
                Permission.update(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id)),
            ]
        );
        setResources((prev) => [doc, ...prev]);
        return doc;
    }

    async function updateResources(id, data) {
        const updated = await databases.updateDocument(
            ids.databaseId,
            ids.resourcesCollectionId,
            id,
            data
        );
        setResources((prev) => prev.map((r) => (r.$id === updated.$id ? updated : r)));
        return updated;
    }

    //list all fields in a bucket
    async function deleteResources(id) {
        await databases.deleteDocument(ids.databaseId, ids.resourcesCollectionId, id);
        setResources((prev) => prev.filter((r) => r.$id !== id));
    }

    async function fetchResourcesById(id) {
        return databases.getDocument(
            ids.databaseId,
            ids.resourcesCollectionId,
            id
        );
    }
    
    useEffect(() => {
        //real-time listener to listen to any changes in the book collection
        if (!user) {
            setResources([]); //clear state when user log out
            return;
        }
        fetchResources();

        //channel(identifier to service on the server we want to subcribe to such database events)
        // for subcribe path format in the books collections
        const channel = `databases.${ids.databaseId}.collections.${ids.resourcesCollectionId}.documents`
        const unsubscribe = client.subscribe(channel, (response) => {
                const {payload, events} = response //payload contain data associated with event such added or deleted book event
                //.some iterates through every event in the events array;
                //.endsWith precisely targets the actual event type suffix
                if (!payload || payload.userId !== user.$id) return;
                const isCreate = events.some((e) => e.endsWith(".create"));
                const isDelete = events.some((e) => e.endsWith(".delete"));
                const isUpdate = events.some((e) => e.endsWith(".update"));

                if (isCreate) {
                    setResources((prev) => {
                        if (prev.find((b) => b.$id === payload.$id)) return prev;
                        return [payload, ...prev];
                    });

                    //filter out the book that was deleted using the payload.$id
                    } else if (isDelete) {
                    setResources((prev) => prev.filter((b) => b.$id !== payload.$id));

                    //update book state using payload
                    } else if (isUpdate) {
                    setResources((prev) => prev.map((b) => (b.$id === payload.$id ? payload : b)));
                    }
                });
        
                return() => {
                    if (unsubscribe) unsubscribe() //clean up function to unsubscribe from the real-time listener
                };
            }, [user, buildQueries]); //re-run the effect when user or buildQueries change

            //Add normalized progress for charts/UI
            const normalizedResources = resources.map(r => ({
                ...r,
                progressPercent: calculationProgress({
                    progressMode: r.progressMode,
                    unitsCompleted: r.unitsCompleted,
                    totalUnits: r.totalUnits
                }),
            }));

            //chart data helpers
            function getProgressChartData(startDate, endDate) {
                return aggregateProgressByDay(normalizedResources, startDate, endDate);
            }
            function getCategoryBreakdown() {
                return breakdownResourcesByCategory(normalizedResources);
            }
            function getStatusBreakdown(startDate, endDate) {
                return breakdownResourcesByStatus(normalizedResources);
            }
        
    return (
        <ResourcesContext.Provider
            value={{
                filter,
                setFilter,
                fetchResources,
                createResources,
                updateResources,
                deleteResources,
                fetchResourcesById,
                resources: normalizedResources,
                getProgressChartData,
                getCategoryBreakdown,
                getStatusBreakdown,
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
}
