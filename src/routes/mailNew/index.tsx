import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Paperclip, Trash, MoreVertical } from "lucide-react";
import { EmailForm } from "@/components/EmailForm";
import { apiClient } from "@/lib/apiClient";

export default function MailNew() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    // const responce = await apiClient.mail.send.post({
    //   body: {
    //     // organization_name: inputOrganizationName.current?.value = '',
    //     mail_id: "string",
    //     your_mail_address: "string",
    //     title: "string",
    //     body: "string"
    //   }
    // }
    // )
    // if (responce.status === 200) {
    //   console.log("success");
    // } else {
    //   console.log("error");
    // }
    // 最初の画面に戻る
    navigate("/");
    // Here you would typically handle sending the email
    console.log("Sending email:", { recipient, subject, body });
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EmailForm
        title="新しいメール"
        recipient={recipient}
        setRecipient={setRecipient}
        subject={subject}
        setSubject={setSubject}
        body={body}
        setBody={setBody}
        onSend={handleSend}
      />
    </div>
  );
}
