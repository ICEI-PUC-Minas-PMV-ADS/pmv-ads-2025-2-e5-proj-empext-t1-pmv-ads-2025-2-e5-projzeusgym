import { StyleSheet } from 'react-native';

const WeightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32, 
    fontWeight: '900',
    color: '#000',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  inputCard: {
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    minWidth: 250, 
    maxWidth: 300, 
    alignItems: 'center',
  },
  weightInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    height: 45,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyList: {
        width: '100%',
        marginTop: 10,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    historyText: {
        fontSize: 16,
        color: '#333',
    },
    noHistoryText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default WeightStyle;
