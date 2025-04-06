import { Suspense } from 'react';
import ChatPage from './ChatPage';

export default function Page() {
  return (
      <Suspense fallback={<div>加载中...</div>}>
        <ChatPage />
      </Suspense>
  );
}
