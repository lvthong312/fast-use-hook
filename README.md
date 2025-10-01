# fast-use-hooks

<p align="center">
  <img src="https://img.shields.io/npm/v/fast-use-hooks?color=green" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/fast-use-hooks" alt="npm downloads" />
  <img src="https://img.shields.io/badge/react--native-0.70+-blue" alt="react-native" />
</p>

Support Hooks

## Installation


```sh
npm install fast-use-hooks
```


## Usage


```js
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  useAsync,
  useDebounceValue,
  usePrevious,
  useThrottle,
  useToggle,
} from 'fast-use-hooks'; // giả sử bạn để tất cả hooks trong ./hooks

export default function App() {
  // 1️⃣ useDebounceValue
  const {
    value,
    debouncedValue: debouncedText,
    setValue: setDebouncedText,
  } = useDebounceValue<string>('', 1000, (val) => {
    // Call After stop typing 1s
    // Call Api Here
    console.log('Debounced Text:', val);
  });

  // 2️⃣ useSearch
  const { value: search, setValue: onChangeSearch } = useDebounceValue<string>(
    '',
    500
  );

  // 3️⃣ useToggle
  const { value: isOn, toggle } = useToggle(false);

  // 4️⃣ usePrevious
  const prevSearch = usePrevious(search);

  // 5️⃣ useAsync (fake API call)
  const {
    execute,
    loading,
    error,
    value: asyncData,
  } = useAsync(async (id: number) => {
    return {
      id,
    };
  });

  // 6️⃣ useThrottle
  const throttledSearch = useThrottle(search, 1000);

  // run async when component mounts
  useEffect(() => {
    execute(1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>1️⃣ useDebounceValue</Text>
      <TextInput
        placeholder="Type debounce text"
        style={styles.input}
        value={value}
        onChangeText={setDebouncedText}
      />
      <Text>Debounced value: {debouncedText}</Text>

      <Text style={styles.heading}>2️⃣ useSearch</Text>
      <TextInput
        placeholder="Type search"
        style={styles.input}
        value={search}
        onChangeText={onChangeSearch}
      />
      <Text>Debounced Search: {search}</Text>
      <Text>Previous Search: {prevSearch}</Text>
      <Text>Throttled Search: {throttledSearch}</Text>

      <Text style={styles.heading}>3️⃣ useToggle</Text>
      <Button title={isOn ? 'Turn Off' : 'Turn On'} onPress={toggle} />
      <Text>Toggle state: {isOn ? 'On' : 'Off'}</Text>

      <Text style={styles.heading}>4️⃣ useAsync (fetch todo)</Text>
      {loading && <ActivityIndicator />}
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      {asyncData && <Text>{`Todo #${asyncData.id}: ${asyncData.title}`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginVertical: 5,
  },
});

```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
