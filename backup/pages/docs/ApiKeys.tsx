import { Key, Plus, Trash2, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export function ApiKeys() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = [
    {
      id: "key1",
      name: "Production Key",
      key: "sk-hashub_live_1234567890abcdef1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      usage: "2,847 calls this month"
    },
    {
      id: "key2", 
      name: "Development Key",
      key: "sk-hashub_test_abcdef1234567890abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      usage: "156 calls this month"
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "••••••••••••••••••••••••••••••••" + key.substring(key.length - 4);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">API Keys</h1>
        <p className="text-lg text-muted-foreground">Manage your API keys and access tokens</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your API Keys</h2>
          <p className="text-sm text-muted-foreground">Use these keys to authenticate your API requests</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Key
        </Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{apiKey.name}</h3>
                  <p className="text-sm text-muted-foreground">Created {apiKey.created}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">API Key</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyKey(apiKey.key, apiKey.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedKey === apiKey.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <code className="text-sm font-mono text-foreground">
                {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
              </code>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Last used:</span>
                <span className="ml-2 text-foreground">{apiKey.lastUsed}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Usage:</span>
                <span className="ml-2 text-foreground">{apiKey.usage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
