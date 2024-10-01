import { apiClient } from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";

export const useMallAll = () => {
  const {data: mails, error: mailError, isValidating, mutate} = useAspidaSWR(apiClient.mail.all);

  return {mails, mailError, isValidating, mutate};
}
