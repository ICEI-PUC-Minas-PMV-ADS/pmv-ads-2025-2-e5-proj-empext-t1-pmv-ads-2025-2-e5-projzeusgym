import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

// Cores do tema
const COLORS = {
  primary: '#FF8C00',
  error: '#FF4444',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#999999',
    medium: '#666666',
    dark: '#333333'
  }
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5
  },
  card: {
    width: '100%',
    backgroundColor: '#A9A9A9',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '100%'
  },
  fieldLabel: {
    width: '28%',
    fontWeight: '700',
    color: '#000',
    fontSize: 14
  },
  pill: {
    marginLeft: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: '62%'
  },
  pillText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center'
  },
  editButton: {

    width: '50%',
    maxWidth: 300,
    backgroundColor: '#A9A9A9',
    borderRadius: 50,
    paddingVertical: 18,
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  deleteButton: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#A9A9A9',
    borderRadius: 50,
    paddingVertical: 18,
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  deleteButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  errorText: {
    color: '#FF4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: '#A9A9A9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
})