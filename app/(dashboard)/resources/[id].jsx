//dynamic routes for book page based on book id
//When access the book details, we need to access the ID of the book from the route(to use bookID to fetch the database)
import { StyleSheet} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { useResources } from '../../../hooks/useResources'
//theme components
import ThemeView from '../../../components/ThemeView'
import ThemeText from '../../../components/ThemeText'
import ThemeCard from '../../../components/ThemeCard'
import ThemeLoader from '../../../components/ThemeLoader'
import Spaces from '../../../components/Spaces'
import ThemeButton from '../../../components/ThemeButton'
import { Colors } from '../../../constants/Colors'
import ThemeTextInput from '../../../components/ThemeTextInput'

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
  const [unitsCompleted, setUnitsCompleted] = useState(0)

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
      setUnitsCompleted(resources.unitsCompleted ?? 0)
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
            <ThemeText> Progress: {resources.unitsCompleted} / {resources.totalUnits} {resources.progressMode}
              {" "}({resources.progressPercent ? `${Math.round(resources.progressPercent)}%` : 'N/A'  })
            </ThemeText>

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
      <ThemeTextInput 
        style={styles.input}
        placeholder='Status'
        value={status}
        onChangeText={setStatus}
      />
      <Spaces/>
      <ThemeTextInput 
        style={styles.input}
        placeholder='[Priority]'
        value={priority}
        onChangeText={setPriority}
      />
      <Spaces/>
      <ThemeTextInput 
        style={styles.input}
        placeholder='Categories'
        value={categories.join(', ')}
        onChangeText={text => setaCategories(text.split(',').map(c => c.trim()).filter(Boolean))} //split by comma and trim spaces
      />
      <Spaces/>
      <ThemeTextInput 
        style={styles.input}
        placeholder={`Units Completed (${resources.progressMode})`}
        value={unitsCompleted?.toString()}
        onChangeText={val => setUnitsCompleted(Number(val))}
        keyboardType='numeric'
      />
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