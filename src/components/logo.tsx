import { Database } from 'lucide-react';
import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Database className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-foreground">DC Base</h1>
    </div>
  );
}
