const functions = require('firebase-functions')
const admin = require('firebase-admin')
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default
const sendGridMail = require('@sendgrid/mail')
const MAIL_API_KEY = functions.config().sendgrid.key
const MAIL_TEMPLATE = functions.config().sendgrid.template

sendGridMail.setApiKey(MAIL_API_KEY)

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

const updateWCProduct = async (wcId, updates) => {
  try {
    const res = await api.put(`products/${wcId}`, updates)
    console.log(res.data)
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

const sendEmail = (book, wcLink) => {
  const msg = {
    to: 'tzlukoma@gmail.com',
    from: 'bookstore@brownkidsread.org',
    templateId: MAIL_TEMPLATE,
    dynamic_template_data: {
      name: 'BKR Book Inventory Mgt',
      title: book.title,
      author: book.author,
      amountBought: book.amountBought,
      coverImage: book.coverImage,
      format: book.format,
      regularPrice: book.regularPrice,
      description: book.description,
      productLink: wcLink
    },
    hideWarnings: true // now the warning won't be logged
  }

  return sendGridMail.send(msg)
}

exports.authOnCreate = functions.auth.user().onCreate(createProfile)

exports.createWoocommerceBook = functions.firestore
  .document('books/{bookId}')
  .onCreate(async (snapshot, context) => {
    const book = snapshot.data()
    const bookId = snapshot.id

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
      regular_price: book.regularPrice,
      sku: book.sku
    }

    console.log(wcBody)

    try {
      const wcBookCreated = await createWCProduct(wcBody)
      // const wcBookUpdated = await updateWCProduct(wcBookCreated.id, {
      //   shipping_required: true,
      //   weight: book.weight,
      //   dimensions: {
      //     length: book.length,
      //     width: book.width,
      //     height: book.height
      //   }
      // })

      // console.log(`wcBookUpdated`, wcBookUpdated)
      console.log(`bookId`, bookId)
      console.log(`wcPermaLink`, wcBookCreated.permalink)
      console.log(`wcBookId: `, wcBookCreated.id)

      const bookRef = db.collection('books').doc(bookId)

      bookRef
        .set(
          {
            woocommerceId: wcBookCreated.id,
            woocommercePermaLink: wcBookCreated.permalink,
            coverImage: wcBookCreated.images[0].src
          },
          { merge: true }
        )
        .then(() => {
          if (process.env.NODE_ENV === 'production') {
            return sendEmail(book, wcBookCreated.permalink)
          } else {
            console.log(`data sent to email:`, book)
            console.log(`link to the website entry:`, wcBookCreated.permalink)
            return bookId
          }
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }

    // if (process.env.NODE_ENV === 'production') {
    //   return sendEmail(book, wcBookCreated.permalink)
    // } else {
    //   console.log(`data sent to email`, book)
    // console.log(`link to the website entry`, wcBookCreated.permalink)
    //   return bookId
    // }
  })
