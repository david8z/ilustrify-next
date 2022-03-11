import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyACJs9Pgqcivns46gvR8ncGCxRx1tQfG8Q",
  authDomain: "ilustrify.firebaseapp.com",
  projectId: "ilustrify",
  storageBucket: "ilustrify.appspot.com",
  messagingSenderId: "803813721605",
  appId: "1:803813721605:web:8c573954d60706b9353e6c",
  measurementId: "G-6V49RZKW29",
}
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
db.useEmulator("localhost", 8080)

const auth = firebase.auth()
auth.useEmulator("http://localhost:9099")

/**
 * We return the fist empry name form [ 'New Style', 'New Style 1', 'New Style 2',...]
 */
const getNewStyleName = ({ styles }) => {
  const withoutSlug = styles.filter((s) => s.slug.match(/^new-style(-\d+)?$/g))
  const name = { name: "New Style", slug: "new-style" }
  if (withoutSlug.length > 0) {
    const maxIdWithoutSlug = withoutSlug.reduce((acc, style) => {
      const aux = parseInt(style.slug.replace(/new-style[-]/g, "")) || 0
      return aux > acc ? aux : acc
    }, 0)
    name.name += ` ${maxIdWithoutSlug + 1}`
    name.slug += `-${maxIdWithoutSlug + 1}`
    return name
  }
  return name
}

export const addStyle = ({ styles }) => {
  const { slug, name } = getNewStyleName({ styles })
  const style = {
    uid: auth.currentUser.uid,
    slug,
    name,
    items: [],
    basePrice: 0,
    nextId: 0,
    manufacturingDays: 0,
    images: [],
    publishable: false,
    active: false,
  }
  const batch = db.batch()
  const userDoc = db.collection("users").doc(auth.currentUser.uid)
  const styleRef = userDoc.collection("styles").doc()
  batch.set(styleRef, style)

  batch.update(userDoc, {
    styles: firebase.firestore.FieldValue.arrayUnion(styleRef.id),
  })

  batch.set(userDoc.collection("published_styles").doc(styleRef.id), style)

  batch
    .commit()
    .then(() => {
      // TODO: Notification has been added
    })
    .catch(() => {
      // TODO: Notification has been deleted
    })
}

export const listenUserStyles = ({ setStyles, authUser }) => {
  return db
    .collection("users")
    .doc(authUser.id)
    .collection("styles")
    .onSnapshot(({ docs }) =>
      setStyles(
        docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
      )
    )
}
