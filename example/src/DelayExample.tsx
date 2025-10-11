import { useDelay } from 'fast-use-hooks'; // giả sử bạn để tất cả hooks trong ./hooks
import { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
export default function DelayExample() {
  const { delay, cancel, isWaiting } = useDelay();
  const [status, setStatus] = useState('⏳ Chưa bắt đầu');

  const handleStart = async () => {
    setStatus('⏳ Đang chờ 3 giây...');
    try {
      await delay(3000);
      setStatus('✅ Hoàn tất sau 3 giây!');
    } catch {
      setStatus('❌ Đã bị huỷ!');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ marginBottom: 10 }}>{status}</Text>

      {isWaiting && (
        <ActivityIndicator
          style={{ marginBottom: 10 }}
          size="small"
          color="blue"
        />
      )}

      <Button
        title="Bắt đầu delay"
        onPress={handleStart}
        disabled={isWaiting}
      />
      <View style={{ height: 10 }} />
      <Button title="Huỷ delay" onPress={cancel} disabled={!isWaiting} />
    </View>
  );
}
