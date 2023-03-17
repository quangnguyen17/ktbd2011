import { useState, useEffect } from 'react'
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

export const getBooks = async (testament: TestamentName): Promise<string[]> => {
  const data = await listAll(ref(storage, testament))
  let sortedBooks = [...data.items]
  sortedBooks.sort((r1, r2) => Number(r1.name.split('.')[0]) - Number(r2.name.split('.')[0]))
  return Promise.all(sortedBooks.map((book) => getDownloadURL(book)))
}

export const useTestament = (testament: TestamentName) => {
  const [books, setBooks] = useState<string[]>([])
  useEffect(() => {
    getBooks(testament).then((books) => setBooks(books))
  }, [testament])
  return books
}

export default app
