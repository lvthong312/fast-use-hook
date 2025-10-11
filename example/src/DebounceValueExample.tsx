import React from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import { useDebounceValue, makeApi } from 'fast-use-hooks';

export default function DebounceValueExample() {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);

  // 🧠 dùng useDebounceValue để tránh call API liên tục khi gõ
  const { value, setValue, debouncedValue } = useDebounceValue<string>(
    '',
    600,
    async (val: string) => {
      // Call Api Search Here
      if (!val) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // giả lập API search (delay 800ms)
        const res = await makeApi(
          [`${val} result 1`, `${val} result 2`, `${val} result 3`],
          800
        );
        setResults(res);
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 80 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        🔍 Debounced Search Example
      </Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Type to search..."
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : results.length > 0 ? (
        results.map((item, i) => (
          <Text key={i} style={{ marginBottom: 6 }}>
            {item}
          </Text>
        ))
      ) : debouncedValue ? (
        <Text style={{ color: 'gray' }}>No results found.</Text>
      ) : (
        <Text style={{ color: 'gray' }}>Start typing to search...</Text>
      )}
    </View>
  );
}
