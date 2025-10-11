import { useMultipleAsync, makeApi } from 'fast-use-hooks';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function MultipleAsyncExample() {
  // ✅ tạo danh sách async function
  const asyncFunctions = [
    makeApi({ name: 'John' }, 1200),
    makeApi({ name: 'Post' }, 800),
    makeApi({ name: 'Hello' }, 1500),
  ];

  // ✅ sử dụng hook
  const { data, errors, loading, execute } = useMultipleAsync<string>(
    asyncFunctions,
    {
      immediate: true,
      onSuccess: (results: any) => console.log('✅ Success:', results),
    }
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Example useMultipleAsync
      </Text>

      {loading && (
        <View style={{ marginVertical: 12 }}>
          <ActivityIndicator />
          <Text>Loading multiple APIs...</Text>
        </View>
      )}

      {!loading && (
        <View style={{ marginVertical: 12 }}>
          {data.map((item: any, index: any) => (
            <Text key={index}>
              ✅ {item?.name ?? `❌ Error: ${errors[index]?.message}`}
            </Text>
          ))}
        </View>
      )}

      <Button title="Refetch All" onPress={execute} />
    </View>
  );
}
