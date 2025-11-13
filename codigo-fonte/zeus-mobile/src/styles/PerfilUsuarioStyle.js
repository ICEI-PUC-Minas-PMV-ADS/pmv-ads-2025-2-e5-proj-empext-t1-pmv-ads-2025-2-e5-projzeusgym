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
    backgroundColor: '#000'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20
  },
  card: {
    width: Math.min(width - 40, 320),
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%'
  },
  fieldLabel: {
    width: '28%',
    fontWeight: '700',
    color: '#333',
    fontSize: 14
  },
  pill: {
    marginLeft: 10,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: '62%'
  },
  pillText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  editButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 12,
    width: Math.min(width - 80, 260),
    alignItems: 'center'
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  deleteButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 22,
    marginTop: 12,
    width: Math.min(width - 120, 200),
    alignItems: 'center'
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700'
  }
})
