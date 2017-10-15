// tslint:disable-next-line:import-name
import { Platform } from 'react-native'
import RatingRequestor from 'react-native-rating-requestor'
import { happyInteractions } from '../actions/index'

const iosStoreId = '1291639493'
const androidStoreId = 'com.example.app'

const storeId = Platform.OS === 'ios' ? iosStoreId : androidStoreId

const ratingTracker = new RatingRequestor(storeId, 'AppName')

const storeReview = () => next => (action) => {
  if (happyInteractions.indexOf(action.type) !== -1) {
    ratingTracker.handlePositiveEvent()
  }

  return next(action)
}

export default storeReview
