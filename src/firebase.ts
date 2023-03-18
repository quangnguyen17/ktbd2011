import React from 'react'
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
export type Chapter = Record<string, any>

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
  let chapters: Array<Chapter> = []
  const { data } = await axios.get<Chapter>(downloadUrl)
  for (let [bTitle, bChapters] of Object.entries(data)) {
    title = bTitle
    chapters = bChapters
  }
  return { title, chapters }
}

export const useBook = (filePath: string) => {
  const [title, setTitle] = React.useState('')
  const [chapters, setChapters] = React.useState<Array<Chapter>>([])
  React.useEffect(() => {
    getBook(filePath).then((data) => {
      setTitle(data.title)
      setChapters(data.chapters)
    })
  }, [filePath])
  return { title, chapters }
}

export default app
