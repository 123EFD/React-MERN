//dynamic routes for book page based on book id
//When access the book details, we need to access the ID of the book from the route(to use bookID to fetch the database)
import { StyleSheet} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { useResources } from '../../../hooks/useResources'
import MultiSelect from 'react-native-multiple-select'


//theme components
import ThemeView from '../../../components/ThemeView'
import ThemeText from '../../../components/ThemeText'
import ThemeCard from '../../../components/ThemeCard'
import ThemeLoader from '../../../components/ThemeLoader'
import Spaces from '../../../components/Spaces'
import ThemeButton from '../../../components/ThemeButton'
import { Colors } from '../../../constants/Colors'
import ThemeTextInput from '../../../components/ThemeTextInput'

import { RESOURCE_TYPES, STATUS, PRIORITIES, PROGRESS_MODES } from '../../../contexts/ResourcesContext'

const categoriesOptions = [
  "AI", "Computer Organization", "Programming", "Computing Math", "Human Computer Interaction", 
  "Data Science", "Web Development", "Mobile Development", "Game Development", "Cybersecurity", 
  "Networking", "Databases", "Cloud Computing", "Software Engineering", "Operating Systems", 
  "DevOps", "Project Management", "Agile Methodologies", "UI/UX Design", "Digital Marketing", 
  "Tech News"
];

const resourcesDetailScreen = () => {
  const [resources, setResources] = useState(null)
  const [ isEditing, setIsEditing ] = useState(false)

  //Resource fileds for editing
  const [title, setTitle] = useState('')
  const [authorOrProvider, setAuthorOrProvider] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [categories, setaCategories] = useState([])
  // { hours: { completed: 2, total: 10 }, videos: { completed: 5, total: 20 } }
  const [unitsCompleted, setUnitsCompleted] = useState({}) //Object dynamic numeric inputs per mode
  const [progressMode, setProgressMode ] = useState([])

    //inside the curly braces, any of the route parameter 
    // can be destructured within the routes(which matches the [id] in the file name)
    const { id } = useLocalSearchParams() 

    const {updateResources,deleteResources,fetchResourcesById, } = useResources() //from the ResourceContext

    const router = useRouter()

    const handleDelete = async () => {
      await deleteResources(id)
      setResources(null)
      router.push('/resources') //redirect to book list after delete
    }

    const startEdit = () => {
      if (!resources) return
      //set book's details as initial values
      setTitle(resources.title ?? '')
      setAuthorOrProvider(resources.authorOrProvider ?? '')
      setNotes(resources.notes ?? '')
      setStatus(resources.status ?? '')
      setPriority(resources.priority ?? '')
      setaCategories(resources.categories ?? [])
      setProgressMode(resources.progressMode ?? [])
      setUnitsCompleted(resources.unitsCompleted ?? {})
      setIsEditing(true)
    }

    //"cancel" button to exit edit mode
    const cancelEdit = () => {
      setIsEditing(false)
    }
    
    const saveEdit = async () => {
      const data = {
        title: title?.trim(),
        authorOrProvider: authorOrProvider?.trim(),
        notes: notes?.trim(),
        status,
        priority,
        categories,
        progressMode,
        unitsCompleted: Number(unitsCompleted),
      };
      const updated = await updateResources(id, data)
      setResources(updated)
      setIsEditing(false) //exit edit mode
    }
    //useEffect to run the first loads component and when the ID value changes 
    useEffect(() => {
          //fetch book needed
          async function loadResources() {
            const resourcesData = await fetchResourcesById(id)
            setResources(resourcesData) //update the resources state     
          }

          loadResources()
    }, [id])
  
    //If the book is null, we will show the loader. If have, it will rerender and show the book page
    if (!resources) {
      return (
        <ThemeView safe={true} style={styles.container}>
          <ThemeLoader/>
        </ThemeView>
      );
    }

    //Helper to display progress for each mode
    const renderProgressDetails = () => {
      if (!resources.progressMode || !resources.unitsCompleted) return null;
      return resources.progressMode.map(mode => {
        const modeData = resources.unitsCompleted[mode] || {};
        return(
          <ThemeText key={mode}>
            {mode} : {modeData.completed ?? 0} / {modeData.total ?? 0} ({modelData.total ? Math.round((modeData.completed ?? 0) / modeData.total * 100) : 0}%)
          
          </ThemeText>
        ) 
      })
    }

  return (
    <ThemeView safe={true} style={styles.container}>
      <ThemeCard style={styles.card}>
        {!isEditing ? (
          <>
            <ThemeText style={styles.title}>{resources.title}</ThemeText>
            <ThemeText>Provided by {resources.authorOrProvider}</ThemeText>
            <Spaces/>

            <ThemeText>Type: {resources.type}</ThemeText>
            <ThemeText>Status: {resources.status}</ThemeText>
            <ThemeText>Priority: {resources.priority}</ThemeText>
            <ThemeText>Categories: {resources.categories?.join(', ')}</ThemeText> 
            <ThemeText>Progress Modes: {resources.progressMode?.join(', ')}</ThemeText>
            {renderProgressDetails()}
          
            <progressMode className="map"></progressMode>

            {/*Show the resource link*/} 
            {resources.url && (
              <ThemeText>
              Link: <ThemeText style= {{ color:'#784CFC' }}>{resources.url}</ThemeText>
              </ThemeText>
            )}
            {/*show uploaded file downlaod link*/}
            {resources.fileRef && (
              <ThemeText>
                File: {resources.fileRef.name}
                <ThemeButton onPress={() => downloadFile(resources.fileRef)}>
                  <ThemeText style={{ color: '#784CFC' }}>Download</ThemeText>
                </ThemeButton>
              </ThemeText>
            )}
            <Spaces height={10}/>

            <ThemeText title={true}>Notes:</ThemeText>
            <Spaces/>
            <ThemeText>{resources.notes}</ThemeText>
        </>
  ) : ( //in edit mode
    <>
      <ThemeText title={true} style={styles.title}>Edit resources</ThemeText>
      <Spaces height={6}/>
      <ThemeTextInput 
        style={styles.input}
        placeholder='Title'
        value={title}
        onChangeText={setTitle}
      />
      <Spaces />
      <ThemeTextInput 
        style={styles.input}
        placeholder='Author/Provider'
        value={authorOrProvider}
        onChangeText={setAuthorOrProvider}
      />
      <Spaces />
      <ThemeTextInput 
        style={styles.input}
        placeholder='Description'
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Spaces/>
      <ThemeText>Status</ThemeText>
      <MultiSelect
        items={STATUS.map(s => ({ id: s, name: s}))}
        uniqueKey="id" //track order changes, update and remove
        single //Single select for Status
        onSelectedItemsChange = {items => setStatus(items[0] || '')} //only one item
        selectedItems={status ? [status] : []} //wrap in array for single select
        selectText="Select Status"
        displayKey="Search Status..." //display placeholder/content
        styleDropdownMenuSubsection={{ paddingLeft: 10, 
          paddingRight: 10, 
          borderRadius: 6, 
          borderWidth: 1, 
          borderColor: '#ccc', 
          height: 50, 
          alignItems: 'center' }}
      />

      <Spaces/>
      <ThemeText>Priority</ThemeText>
      <MultiSelect
        items={PRIORITIES.map(p => ({ id:p, name:p}))}
        uniqueKey="id" //track order changes, update and remove
        single //Single select for Status
        onSelectedItemsChange = {items => setPriority(items[0] || '')} 
        selectedItems={priority ? [priority] : []} 
        selectText="Select Priority"
        displayKey="Search Priority..." 
        styleDropdownMenuSubsection={{ marginVertical: 8 }}

      />
      <Spaces/>
      <ThemeText>Categories</ThemeText>
      <MultiSelect
        items={categoriesOptions.map(cat => ({ id:cat, name:cat}))}
        uniqueKey="id" //track order changes, update and remove
        single //Single select for Status
        onSelectedItemsChange = {setaCategories} 
        selectedItems={categories} 
        selectText="Select Categories"
        displayKey="Search Categories..." 
        styleDropdownMenuSubsection={{ marginVertical: 8 }}
      />
      <Spaces/>
      <ThemeText>Progress Mode</ThemeText>
      <MultiSelect
        items={PROGRESS_MODES.map(m => ({ id:m, name:m}))}
        uniqueKey="id" //track order changes, update and remove
        single //Single select for Status
        onSelectedItemsChange = {setProgressMode} 
        selectedItems={progressMode} 
        selectText="Select Pick Modes"
        displayKey="name" 
        styleDropdownMenuSubsection={{ marginVertical: 8 }}
      />
      <Spaces/>

      {/*Let users select multiple progress modes, ensure accurate tracking and 
      visualization to specify their progress for each selected mode*/}
      {progressMode.map(mode => (
        <View key={mode} stlye={{ marginBottom: 12}}>
          <ThemeText>{mode} Progress:</ThemeText>
          <ThemeTextInput
              placeholder={`Completed ${mode}`}
              value={unitsCompleted[mode]?.completed?.toString() || ''}
              keyboardType='numeric'
              onChangeText={val => 
                setUnitsCompleted(prev => ({
                  ...prev,
                  [mode] : {...prev[mode], completed: Number(val)}
                }))
              }
          />
          <ThemeTextInput
            placeholder={`Total ${mode}`}
            value={unitsCompleted[mode]?.total?.toString() || ''}
            keyboardType='numeric'
            onChangeText={val =>
              setUnitsCompleted(prev => ({
                ...prev,
                  [mode] : {...prev[mode], completed: Number(val)}
              }))
            }
          />
        </View>
      ))}
      
      <Spaces/>
      <ThemeButton onPress={saveEdit}>
          <ThemeText style={{color: '#6B0106',fontWeight:'bold', textAlign: 'center', fontSize: 15}}>Save Changes</ThemeText>
      </ThemeButton>
      <ThemeButton onPress={cancelEdit} style={{ backgroundColor: '#E9B2B4' }}>
          <ThemeText style={{color: '#6B0106',fontWeight:'bold', textAlign: 'center', fontSize: 15}}>Cancel Changes</ThemeText>
      </ThemeButton>
    </>
  )}
      </ThemeCard>

      {!isEditing && ( //conditionally render if in view mode
      <>
        <ThemeButton onPress={startEdit} style={{ width: '90%', alignSelf: 'center' }}>
            <ThemeText style={{color: '#6B0106',fontWeight:'bold', textAlign: 'center', fontSize: 15}}>Edit Resources</ThemeText>
        </ThemeButton>
        <ThemeButton style={styles.delete} onPress={handleDelete}>
          <ThemeText style={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}>Delete Resources</ThemeText>
        </ThemeButton>
      </>
      )}
    </ThemeView>
    )
  }
  

export default resourcesDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    title: {
      fontSize: 24,
      marginVertical: 10,
    },
    card: {
      margin: 20,
    },
    delete: {
      marginTop: 'auto',
      backgroundColor: Colors.warning,
      width: '90%',
      alignSelf: 'center',
    },
    input: {
        padding: 20,
        borderRadius: 6,
        alignSelf: 'stretch',
        marginHorizontal: 40,
    },
    multiline: {
        padding: 20,
        borderRadius: 6,
        minHeight: 100,
        alignSelf: 'stretch',
        marginHorizontal: 40,
    },
})

//link to the page from each individual book inside the book list 