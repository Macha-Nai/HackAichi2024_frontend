import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export function EmailForm({
  title,
  recipient,
  setRecipient,
  subject,
  setSubject,
  body,
  setBody,
  onSend,
}: {
  title: string;
  recipient: string;
  setRecipient: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  body: string;
  setBody: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="宛先"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="件名"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="メッセージを入力してください"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={onSend}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              送信
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
