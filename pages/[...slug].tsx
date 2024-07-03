import Modal from "@/components/Modal";
import useDateStore, { DateStore } from "@/stores/date";
import useModalStore, { ModalStore } from "@/stores/modal";
import { useRouter} from "next/router";
import { useEffect } from "react";
import Home from ".";

export default function Page() {
  const { setDate } = useDateStore(state => state) as DateStore;
  const { openModal } = useModalStore(state => state) as ModalStore;

  const router = useRouter()
  console.log('root', router.asPath);
  const route = router.asPath.split('/');
  const year = route[1];
  const month = route[2];
  const day = route[3];

  // console.log(Number(year), month, day)

  // useEffect(() => {
  //   if (!year || !month || !day) return;

  //   openModal();
  //   setDate(Number(year), Number(month), Number(day))
  // }, [year, month, day])

  return (
    <Modal />
  )
}
