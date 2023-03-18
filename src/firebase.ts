import axios from 'axios'
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'

let app: FirebaseApp

if (getApps().length === 0) {
  app = initializeApp({
    apiKey: 'AIzaSyDbdBu5bwfWgdwmQPTrbwKJHy7mVMAvmyY',
    authDomain: 'bd2011-d9afc.firebaseapp.com',
    databaseURL: 'https://bd2011-d9afc.firebaseio.com',
    projectId: 'bd2011-d9afc',
    storageBucket: 'bd2011-d9afc.appspot.com',
    messagingSenderId: '913342459835',
    appId: '1:913342459835:web:b211636ebb37ba04749e9e',
  })
} else {
  app = getApp()
}

const storage = getStorage()

export type TestamentName = 'old-testament' | 'new-testament'

const getSchema = async (testament: TestamentName) => {
  let sortedRefs = [...(await listAll(ref(storage, testament))).items]
  sortedRefs.sort((r1, r2) => Number(r1.name.split('.')[0]) - Number(r2.name.split('.')[0]))
  return { [testament]: sortedRefs.map((ref) => ref.fullPath) }
}

export const getLatestSchema = async () => ({
  ...(await getSchema('old-testament')),
  ...(await getSchema('new-testament')),
})

// getLatestSchema().then((schema) => console.log(schema))

export const getBook = async (filePath: string) => {
  const downloadUrl = await getDownloadURL(ref(storage, filePath))
  let title: string = ''
  let chapters: Array<Record<string, any>> = []
  for (let [bTitle, bChapters] of Object.entries(
    (await axios.get<Record<string, any[]>>(downloadUrl)).data
  )) {
    title = bTitle
    chapters = bChapters
  }
  return { title, chapters }
}

export default app
