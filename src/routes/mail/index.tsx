import { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Archive,
  Clock,
  MoreVertical,
  Reply,
  Star,
  Trash,
  Send,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/lib/apiClient";
import { MailDetail } from "@/api/@types";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

type MailProps = {
  auto: boolean;
};

export default function Mail({ auto }: MailProps) {
  const navigate = useNavigate();
  const { id: mailId } = useParams();
  const [mail, setMail] = useState<MailDetail>();
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false); // 追加
  const [isMailLoading, setIsMailLoading] = useState<boolean>(true);
  const [isReplyLoading, setIsReplyLoading] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isMailLoading || isReplyLoading);
  const currentIndexRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingSpeed = 80; // タイピングの速度（ミリ秒）

  useEffect(() => {
    setIsLoading(isMailLoading || isReplyLoading);
  }, [isMailLoading, isReplyLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [displayedText]);

  // メールデータの取得
  useEffect(() => {
    const getMail = async () => {
      setIsMailLoading(true); // メールデータのロード開始
      try {
        const res = await apiClient.mail._mail_id(mailId ? mailId : "").get();
        if (res.status === 200) {
          setMail(res.body);
        } else {
          //ダミーデータをセットする
          setMail({
            mail_id: mailId? mailId : "",
            your_name: "Nike Maccha",
            your_mail_address: "nikemaccha.23@gmail.com",
            title: "pcの調子が悪い件について",
            body: "ここ最近pcの調子が悪いです．どうすればいいでしょうか",
            rank: "2",
            send_time: "2024-09-024T00:00:00Z"
          });
          console.error("Failed to fetch mail");
        }
      } catch (error) {
        //ダミーデータをセットする
        setMail({
          mail_id: mailId? mailId : "",
          your_name: "Nike Maccha",
          your_mail_address: "nikemaccha.23@gmail.com",
          title: "pcの調子が悪い件について",
          body: "ここ最近pcの調子が悪いです．どうすればいいでしょうか",
          rank: "2",
          send_time: "2024-09-024T00:00:00Z"
        });
        console.error("Error fetching mail:", error);
      } finally {
        setIsMailLoading(false); // メールデータのロード終了
      }
    };
    getMail();
  }, [mailId]);

  // 返信メッセージの取得
  useEffect(() => {
    const sendMailText = async () => {
      setIsReplyLoading(true); // 返信メッセージのロード開始
      try {
        const res = await apiClient.chatgpt
          ._mail_id(mailId ? mailId : "")
          .get();
        if (res.status === 200) {
          setReplyMessage(res.body.text);
        } else {
          //ダミーメッセージをセットする
          setReplyMessage("お世話になっております。\n\nこの度は、壊れてしまった件についてご連絡いただき、誠にありがとうございます。お手数をおかけし申し訳ございませんが、詳細をお伺いできればと思います。具体的な状況やエラーメッセージなどを教えていただけますでしょうか。\n\n今後ともどうぞよろしくお願い申し上げます。\n\n敬具\n\n");
          console.error("Failed to fetch mail");
        }
      } catch (error) {
        //ダミーメッセージをセットする
        setReplyMessage("お世話になっております。\n\nこの度は、壊れてしまった件についてご連絡いただき、誠にありがとうございます。お手数をおかけし申し訳ございませんが、詳細をお伺いできればと思います。具体的な状況やエラーメッセージなどを教えていただけますでしょうか。\n\n今後ともどうぞよろしくお願い申し上げます。\n\n敬具\n\n");
        console.error("Error fetching mail:", error);
      } finally {
        setIsReplyLoading(false); // 返信メッセージのロード終了
      }
    };
    sendMailText();
  }, [mailId]);

  // タイピングエフェクトの実行
  useEffect(() => {
    if (!isLoading && replyMessage) {
      currentIndexRef.current = 0;
      setDisplayedText("");
      setIsTypingComplete(false);

      const type = () => {
        if (currentIndexRef.current < replyMessage.length) {
          const nextChar = replyMessage[currentIndexRef.current];
          if (nextChar !== undefined) {
            setDisplayedText((prev) => prev + nextChar);
          }
          currentIndexRef.current++;
          timeoutRef.current = setTimeout(type, typingSpeed);
        } else {
          setIsTypingComplete(true);
        }
      };

      type();

      // クリーンアップ関数でタイムアウトをクリア
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isLoading]);

  // 自動送信
  useEffect(() => {
    if (auto && isTypingComplete && !isEmailSent) {
      autoSend();
    }
  }, [auto, isTypingComplete, isEmailSent]);

  const autoSend = useCallback(async () => {
    if (auto && isTypingComplete && !isEmailSent) {
      sendEmail();
    }
  }, [auto, isTypingComplete, isEmailSent]);

  const sendEmail = async () => {
    const replyTitle = "Re: " + mail?.title;
    const mailData = {
      mail_id: mail?.mail_id || "", // 実際の mail_id をセット
      your_mail_address: mail?.your_mail_address || "", // 宛先 (メールアドレス)
      title: replyTitle || "", // 件名
      body: replyMessage || "", // 本文
    };

    try {
      const res = await apiClient.mail.send.post({
        body: mailData,
      });

      if (res.status === 200) {
        toast.success("メッセージの送信に成功しました");
        setLocalStorage(mail?.mail_id || "");
        setIsEmailSent(true); // メール送信成功後に設定
        navigate("/?step=unsent");
      } else {
        navigate("/?step=unsent");
      }
    } catch (error) {
      navigate("/?step=unsent");
    }
  };

  const handleMailSend = async (event: React.FormEvent) => {
    event.preventDefault();
    sendEmail();
  };

  const setLocalStorage = (mailId: string) => {
    const sendList: string[] = JSON.parse(localStorage.getItem("Send") || "[]");
    sendList.push(mailId);
    localStorage.setItem("Send", JSON.stringify(sendList));
  };

  // ロード中はローディング画面を表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen container">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            // localstorageにIDを保存するTrash配列で管理
            onClick={() => {
              const trash: string[] = JSON.parse(
                localStorage.getItem("Trash") || "[]"
              );
              trash.push(mailId ? mailId : "");
              localStorage.setItem("Trash", JSON.stringify(trash));
              navigate(-1);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm"></Button>
        </div>
      </div>

      {/* メール内容 */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage />
                <AvatarFallback>{mail?.your_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold">
                  {mail?.title}
                </CardTitle>
                <p className="text-xs text-gray-600">{mail?.send_time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 text-sm text-gray-800 whitespace-pre-wrap">
            <textarea
              className="w-full p-2 border rounded"
              rows={10}
              value={mail?.body}
              readOnly
            ></textarea>
          </div>
        </CardContent>
      </Card>

      {/* 返信フォーム */}
      <div className="mt-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">返信</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="宛先"
                  value={mail?.your_name ? mail.your_name : "ユーザー名"}
                  readOnly
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="件名"
                  value={`Re: ${mail?.title}`}
                  readOnly
                />
              </div>
              <textarea
                ref={textareaRef}
                className="w-full p-2 border rounded"
                rows={6}
                value={displayedText}
                onChange={(e) => setDisplayedText(e.target.value)}
              />
              {isTypingComplete && (
                <div className="flex justify-between space-x-10 mt-2">
                  <Button
                    onClick={handleMailSend}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    送信
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
