const functions = require('firebase-functions')
const admin = require('firebase-admin')
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

admin.initializeApp()

const db = admin.firestore()

const api = new WooCommerceRestApi({
  url: functions.config().woocommerce.site,
  consumerKey: functions.config().woocommerce.key,
  consumerSecret: functions.config().woocommerce.secret,
  version: 'wc/v3'
})

const createWCProduct = async product => {
  try {
    const res = await api.post('products', product)
    console.log(res.data.id)
    return res.data
  } catch (err) {
    console.log(err.response.data.message)
    return err.response.data.message
  }
}

const createProfile = (userRecord, context) => {
  const { email, phoneNumber, uid, displayName, photoURL } = userRecord

  return db
    .collection('users')
    .doc(uid)
    .set({ email, phoneNumber, displayName, photoURL })
    .catch(console.error)
}

exports.authOnCreate = functions.auth.user().onCreate(createProfile)

exports.createWoocommerceBook = functions.firestore
  .document('books/{bookId}')
  .onCreate(async (snapshot, context) => {
    const book = snapshot.data()

    const wcBody = {
      name: book.title,
      attributes: [
        { id: 2, options: [book.author] },
        { id: 1, options: [book.format] }
      ],
      type: 'simple',
      description: book.description,
      short_description: book.description,
      categories: [
        { id: book.genderCategoryId },
        { id: book.ageRangeCategoryId }
      ],
      images: [{ src: book.coverImage }],
      manage_stock: true,
      stock_quantity: book.stockCount,
      sku: book.sku
    }

    createWCProduct(wcBody)

    console.log(wcBody)
  })
