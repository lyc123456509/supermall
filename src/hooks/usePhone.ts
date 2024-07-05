import { decode } from 'js-base64';
import { useRouter } from 'vue-router';

function usePhone() {
  const router = useRouter();
  let phone = '';
  if (router.currentRoute.value.query.phone) {
    if (router.currentRoute.value.query.phone.length !== 11) {
      phone = decode(router.currentRoute.value.query.phone as string);
    } else {
      phone = router.currentRoute.value.query.phone as string;
    }
  }
  return phone;
}

export default usePhone;
