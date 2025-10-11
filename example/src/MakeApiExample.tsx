import { useMakeApiExample } from 'fast-use-hooks';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function MakeApiExample() {
  // ✅ Dùng hook
  const { data, loading, error, execute } = useMakeApiExample<User>({
    delay: 1500, // delay giả lập 1.5s
    immediate: true, // tự gọi khi mount
    mockData: {
      id: 1,
      name: 'hello',
      email: 'hello@example.com',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 Make API Example</Text>

      {loading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.error}>❌ Lỗi: {error.message}</Text>}

      {data && (
        <View style={styles.card}>
          <Text>ID: {data.id}</Text>
          <Text>Name: {data.name}</Text>
          <Text>Email: {data.email}</Text>
        </View>
      )}

      <Button title="🔁 Gọi lại API" onPress={execute} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  card: {
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
});
