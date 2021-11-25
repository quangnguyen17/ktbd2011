import axios from 'axios'
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import { Book } from './types'

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

export const getBooks = async (testament: string): Promise<Book[]> => {
  let books: Book[] = []
  let data = await listAll(ref(storage, testament))

  // sorting
  let sortedItems = [...data.items]
  sortedItems.sort((ref1, ref2) => {
    let r1 = ref1.name.split('.')[0]
    let r2 = ref2.name.split('.')[0]
    return +r1 - +r2
  })

  // fetching
  for (let book of sortedItems) {
    const downloadUrl = await getDownloadURL(book)
    for (let [book, chapters] of Object.entries((await axios.get(downloadUrl)).data as { [key: string]: any[] })) {
      books.push({ book, chapters })
    }
  }

  return books
}

export default app
