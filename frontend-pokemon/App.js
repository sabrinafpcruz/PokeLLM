import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const response = await axios.post('http://192.168.1.214:3000/ask', {
        question
      });

      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer('Erro ao buscar resposta. Verifique o servidor.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pergunte sobre Pokémon</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua pergunta..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Perguntar" onPress={askQuestion} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  answerBox: {
    marginTop: 20,
    width: '100%',
    maxHeight: 300,
  },
  answer: {
    fontSize: 16
  }
});
