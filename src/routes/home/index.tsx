import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ChevronDown, ChevronUp, Star, Mail, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { apiClient } from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import { Link, useLocation, useNavigate } from "react-router-dom";

type HomeProps = {
  auth: boolean;
  auto: boolean;
  setAuto: (value: boolean) => void;
};

export default function Home({ auth, auto, setAuto }: HomeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stepParam = searchParams.get("step") || "all";
  const [clickedId, setClickedId] = useState<string>("");

  const { data: mails } = useAspidaSWR(apiClient.mail.all, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
    enabled: auth,
  });

  // 追加された状態変数
  const [sortOption, setSortOption] = useState<"importance" | "date">(
    "importance"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");

  type HomeStep = "all" | "trash" | "send" | "unsent";

  const step = useMemo<HomeStep>(() => {
    if (["all", "trash", "send", "unsent"].includes(stepParam)) {
      return stepParam as HomeStep;
    } else {
      return "all";
    }
  }, [stepParam]);

  const emails = useMemo(() => {
    if (mails && Array.isArray(mails)) {
      const trashMails = localStorage.getItem("Trash");
      const trashIds = trashMails ? JSON.parse(trashMails) : [];

      const sendMails = localStorage.getItem("Send");
      const sendIds = sendMails ? JSON.parse(sendMails) : [];

      if (step === "all") {
        return mails.filter((mail) => !trashIds.includes(mail.mail_id));
      } else if (step === "trash") {
        return mails.filter((mail) => trashIds.includes(mail.mail_id));
      } else if (step === "send") {
        return mails.filter(
          (mail) =>
            sendIds.includes(mail.mail_id) && !trashIds.includes(mail.mail_id)
        );
      } else if (step === "unsent") {
        return mails.filter(
          (mail) =>
            !sendIds.includes(mail.mail_id) && !trashIds.includes(mail.mail_id)
        );
      }
    }
    return [];
  }, [mails, step]);

  const filteredEmails = useMemo(() => {
    return emails.filter(
      (email) =>
        email.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [emails, searchQuery]);

  // ソート処理の修正
  const sortedEmails = useMemo(() => {
    return [...filteredEmails].sort((a, b) => {
      let comparison = 0;
      if (sortOption === "importance") {
        comparison =
          sortOrder === "asc"
            ? Number(a.rank) - Number(b.rank)
            : Number(b.rank) - Number(a.rank);
      } else if (sortOption === "date") {
        const dateA = new Date(a.send_time);
        const dateB = new Date(b.send_time);
        comparison =
          sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
      }
      return comparison;
    });
  }, [filteredEmails, sortOption, sortOrder]);

  // 自動返信
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (auto && sortedEmails.length > 0) {
      const mail = sortedEmails[0];
      const url = "/" + mail.mail_id;
      setClickedId(mail.mail_id);
      timeoutId = setTimeout(() => {
        navigate(url);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [auto, sortedEmails, navigate]);

  if (!auth) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">ログインしてください</h1>
      </div>
    );
  }

  return (
    <div className="pt-12 px-10 w-[calc(100%-100px)]">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">受信トレイ({emails.length})</h1>
        <Link
          to="/new"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
        >
          新しいメール
        </Link>
      </div>

      {/* 検索バー */}
      <div className="flex items-center space-x-2 mb-4">
        <Input
          className="flex-grow"
          placeholder="メールを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ソートボタン */}
      <div className="flex items-center space-x-2 mb-4">
        <Button
          onClick={() => {
            if (sortOption === "importance") {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortOption("importance");
              setSortOrder("desc"); // デフォルトのソート順
            }
          }}
          size="default"
          variant={sortOption === "importance" ? "solid" : "outline"}
          className="flex items-center space-x-3 my-4"
        >
          <Mail className="h-4 w-4 font-mono" />
          <span>重要度でソート</span>
          {sortOption === "importance" &&
            (sortOrder === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </Button>
        <Button
          onClick={() => {
            if (sortOption === "date") {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortOption("date");
              setSortOrder("desc"); // デフォルトのソート順
            }
          }}
          size="default"
          variant={sortOption === "date" ? "solid" : "outline"}
          className="flex items-center space-x-3 my-4"
        >
          <Clock className="h-4 w-4 font-mono" />
          <span>日時でソート</span>
          {sortOption === "date" &&
            (sortOrder === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </Button>
        {step === "unsent" && (
          <div>
            <>AIによる自動返信を有効にする</>
            <input
              type="checkbox"
              checked={auto}
              onChange={() => {
                setClickedId("");
                setAuto(!auto);
              }}
              className="ml-2"
            />
          </div>
        )}
      </div>

      {/* メール一覧 */}
      <div className="space-y-2 scroll-m-2 h-[calc(100vh-300px)] overflow-y-auto">
        {sortedEmails.map((email, index) => (
          <motion.div
            key={email.mail_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={"/" + email.mail_id}>
              <Card
                className={`cursor-pointer mt-3 ${
                  clickedId === email.mail_id ? "border border-blue-500" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-[80%]">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{email.your_name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-sm font-semibold">{email.title}</h2>
                        <p className="text-xs text-gray-600">{email.body}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{email.send_time}</p>
                      <div className="mt-1">
                        {Array.from(
                          { length: Number(email.rank) },
                          (_, idx) => (
                            <Star
                              key={idx}
                              className="inline h-5 w-5 text-yellow-400 fill-current stroke-current ml-1"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-1">
                    {email.your_mail_address}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
