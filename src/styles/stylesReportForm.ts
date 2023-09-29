import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  reportContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  formatButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  formatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  excelButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  excelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
},
section: {
    marginBottom: 16,
},
label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
},
picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
},
generateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    opacity: 1,
},
generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
dateContainer: {
  marginTop: 16,
  alignItems: 'center',
  marginBottom: 20,
},
dateButton: {
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
},
dateText: {
  color: 'blue',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingBottom: 10,
},
dateDisplayContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  gap: 5,
  justifyContent: 'space-between',
  width: '100%',
},
dateLabel: {
  fontSize: 18,
  color: '#333',
  marginRight: 16,
},
});

export default styles;
